import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { rateLimit } from '@/lib/rate-limit';
import { notifyNewOrder } from '@/lib/order-notifications';

const fallback:Record<number,number>={1:149999,2:294999,3:442999,5:739999};
const phone=/^(?:\+?234|0)[789][01]\d{8}$/;
const schema=z.object({fullName:z.string().trim().min(2).max(100),phone:z.string().trim().transform(v=>v.replace(/\s|-/g,'')).refine(v=>phone.test(v),'Enter a valid Nigerian phone number'),secondPhone:z.string().trim().max(20).optional(),state:z.string().trim().min(2).max(30),city:z.string().trim().min(2).max(80),address:z.string().trim().min(5).max(300),landmark:z.string().trim().max(150).optional(),quantity:z.union([z.literal(1),z.literal(2),z.literal(3),z.literal(5)]),website:z.string().max(0).optional(),renderedAt:z.number().int().positive()});

export async function POST(req:Request){
  const ip=req.headers.get('cf-connecting-ip')||req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()||'unknown';
  const rate=rateLimit(ip);const headers={'X-RateLimit-Remaining':String(rate.remaining),'X-RateLimit-Reset':String(Math.ceil(rate.reset/1000))};
  if(!rate.allowed)return NextResponse.json({error:'Too many order attempts. Please try again later.'},{status:429,headers:{...headers,'Retry-After':String(Math.ceil((rate.reset-Date.now())/1000))}});
  if(Number(req.headers.get('content-length')||0)>10_000)return NextResponse.json({error:'Request is too large.'},{status:413,headers});
  try{const data=schema.parse(await req.json());if(Date.now()-data.renderedAt<1500||Date.now()-data.renderedAt>24*60*60*1000)return NextResponse.json({error:'Please refresh the page and try again.'},{status:400,headers});const product=await prisma.product.findUnique({where:{id:'foot-massager'}});if(product&&!product.active)return NextResponse.json({error:'This product is temporarily unavailable.'},{status:409,headers});const prices=product?{1:product.price1,2:product.price2,3:product.price3,5:product.price5}:fallback;const {website:_,renderedAt:__,...orderData}=data;const order=await prisma.order.create({data:{...orderData,total:prices[data.quantity]}});await notifyNewOrder(order);return NextResponse.json({ok:true,id:order.id},{status:201,headers});}catch(e){if(e instanceof z.ZodError)return NextResponse.json({error:e.issues[0]?.message||'Please check the form and try again.'},{status:400,headers});console.error('Order submission failed',e);return NextResponse.json({error:'Unable to place your order right now. Please try again.'},{status:500,headers});}
}
