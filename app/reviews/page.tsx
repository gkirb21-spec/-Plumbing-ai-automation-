import { prisma } from "@/lib/prisma";
export default async function Reviews(){const reviews=await prisma.review.findMany().catch(()=>[]);return <div className="container py-10"><h1 className="text-3xl font-bold">Reviews</h1>{reviews.map(r=><article key={r.id}><h2>{r.author} {r.isSample?"(Sample)":""}</h2><p>{r.content}</p></article>)}</div>}
