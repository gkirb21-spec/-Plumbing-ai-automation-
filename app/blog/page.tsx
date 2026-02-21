import Link from "next/link";
import { prisma } from "@/lib/prisma";
export default async function Blog(){const posts=await prisma.blogPost.findMany({where:{published:true}}).catch(()=>[]);return <div className="container py-10"><h1 className="text-3xl font-bold">Blog</h1>{posts.map(p=><article key={p.id}><Link href={`/blog/${p.slug}`} className="font-semibold">{p.title}</Link><p>{p.excerpt}</p></article>)}</div>}
