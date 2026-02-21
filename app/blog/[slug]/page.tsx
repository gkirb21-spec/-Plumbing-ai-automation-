import { prisma } from "@/lib/prisma";
export default async function Post({params}:{params:{slug:string}}){const p=await prisma.blogPost.findUnique({where:{slug:params.slug}}).catch(()=>null);if(!p)return <div className="container py-10">Not found</div>;return <div className="container py-10"><h1 className="text-3xl font-bold">{p.title}</h1><article>{p.content}</article></div>}
