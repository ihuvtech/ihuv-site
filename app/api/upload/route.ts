import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import sharp from 'sharp';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string; // 'profile' or 'project'
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 });
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size must be less than 5MB' }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Resize image based on type
    let resizedBuffer: Buffer;
    if (type === 'profile') {
      // Profile photos: 400x400 square
      resizedBuffer = await sharp(buffer)
        .resize(400, 400, {
          fit: 'cover',
          position: 'center'
        })
        .jpeg({ quality: 90 })
        .toBuffer();
    } else {
      // Project images: max 1200px width, maintain aspect ratio
      resizedBuffer = await sharp(buffer)
        .resize(1200, null, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .jpeg({ quality: 85 })
        .toBuffer();
    }

    // Generate unique filename
    const filename = `${session.user.email}-${type}-${Date.now()}.jpg`;

    // Upload to Vercel Blob (using private access as per store configuration)
    const blob = await put(filename, resizedBuffer, {
      access: 'private',
      contentType: 'image/jpeg',
      addRandomSuffix: false,
    });

    // Convert the Vercel Blob URL to our proxy URL
    // Extract the path from the blob URL
    const blobPath = blob.url.replace('https://5kq8ihd6swlctvk2.private.blob.vercel-storage.com/', '');
    const proxyUrl = `/api/image/${blobPath}`;

    return NextResponse.json({
      ok: true,
      url: proxyUrl, // Return proxy URL instead of direct blob URL
      filename: filename,
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    console.error('Error stack:', error?.stack);
    return NextResponse.json(
      { error: 'Failed to upload image', details: error?.message },
      { status: 500 }
    );
  }
}
