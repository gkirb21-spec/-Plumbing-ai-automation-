import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/auth";
export async function POST(req: Request,{params}:{params:{id:string}}){if(!isAdmin()) return NextResponse.json({error:'Unauthorized'},{status:401});const f=await req.formData();await prisma.lead.update({where:{id:params.id},data:{status:String(f.get('status')) as any}});return NextResponse.redirect(new URL('/admin', req.url));}
