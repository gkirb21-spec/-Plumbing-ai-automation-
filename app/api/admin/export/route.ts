import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/auth";
import { stringify } from "csv-stringify/sync";

export async function GET(){
  if(!isAdmin()) return NextResponse.json({error:'Unauthorized'},{status:401});
  const leads = await prisma.lead.findMany({orderBy:{createdAt:'desc'}});
  const csv = stringify(leads, { header: true });
  return new NextResponse(csv, { headers: {"Content-Type":"text/csv","Content-Disposition":"attachment; filename=leads.csv"} });
}
