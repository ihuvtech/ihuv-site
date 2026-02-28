"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {

  const [username,setUsername]=useState("rvalluri")

  const router=useRouter()

  return(

<main className="min-h-screen bg-slate-50">

<div className="mx-auto max-w-5xl px-6 py-12">


<header className="flex justify-between">

<div className="text-xl font-semibold">
IHUV Technologies
</div>


<nav className="flex gap-6 text-sm">

<a href="/pricing">Pricing</a>

<a href="/about">About</a>

<a href="/contact">Contact</a>

<a href="/u/rvalluri">Demo</a>

</nav>

</header>



<section className="mt-12 bg-white p-10 rounded-2xl shadow">


<h1 className="text-4xl font-semibold">
AI Powered Developer Portfolios
</h1>


<p className="mt-3 text-gray-600">
Build a professional developer portfolio in minutes.
</p>



<div className="mt-6 flex gap-3">

<a
href="/u/rvalluri"
className="bg-black text-white px-5 py-2 rounded-xl"
>
View Demo
</a>


<a
href="/pricing"
className="border px-5 py-2 rounded-xl"
>
Pricing
</a>


</div>



<div className="mt-10 bg-gray-50 p-6 rounded-2xl">


<div className="text-sm">
Try Portfolio
</div>


<div className="mt-3 flex gap-3">


<input
value={username}
onChange={(e)=>setUsername(e.target.value)}
placeholder="Enter username"
className="border px-4 py-2 rounded-xl w-full"
/>


<button
onClick={()=>router.push(`/u/${username}`)}
className="bg-black text-white px-5 py-2 rounded-xl"
>
View
</button>


</div>


</div>


</section>



<footer className="mt-10 text-center text-sm text-gray-500">

© 2026 IHUV Technologies

</footer>


</div>

</main>

)

}