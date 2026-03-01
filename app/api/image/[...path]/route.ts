import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(
  request: Request,
  context: { params: Promise<{ path: string[] }> }
) {
  try {
    // Await the params Promise
    const resolvedParams = await context.params;
    
    // Reconstruct the full Vercel Blob URL from the path segments
    const blobUrl = `https://5kq8ihd6swlctvk2.private.blob.vercel-storage.com/${resolvedParams.path.join('/')}`;
    
    // Fetch the image from Vercel Blob with the token
    const response = await fetch(blobUrl, {
      headers: {
        'Authorization': `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch image' },
        { status: response.status }
      );
    }

    // Get the image data
    const imageBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/jpeg';

    // Return the image with appropriate headers
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to proxy image', details: error?.message },
      { status: 500 }
    );
  }
}
