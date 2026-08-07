'use server';
import { OrderStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

export async function updateOrderStatus(form:FormData){const data=z.object({id:z.string().min(1),status:z.nativeEnum(OrderStatus)}).parse(Object.fromEntries(form));await prisma.$transaction([prisma.order.update({where:{id:data.id},data:{status:data.status}}),prisma.orderEvent.create({data:{orderId:data.id,status:data.status,note:`Status changed to ${data.status}`,actor:process.env.ADMIN_EMAIL||'admin'}})]);revalidatePath('/admin');revalidatePath(`/admin/orders/${data.id}`);}

export async function saveOrderDetails(form:FormData){const data=z.object({id:z.string().min(1),trackingRef:z.string().trim().max(100),adminNotes:z.string().trim().max(2000),eventNote:z.string().trim().max(500)}).parse(Object.fromEntries(form));await prisma.$transaction(async tx=>{await tx.order.update({where:{id:data.id},data:{trackingRef:data.trackingRef||null,adminNotes:data.adminNotes||null}});if(data.eventNote)await tx.orderEvent.create({data:{orderId:data.id,note:data.eventNote,actor:process.env.ADMIN_EMAIL||'admin'}})});revalidatePath('/admin');revalidatePath(`/admin/orders/${data.id}`);}

export async function saveProduct(form:FormData){const raw=Object.fromEntries(form);const data=z.object({name:z.string().min(2).max(100),description:z.string().min(10).max(500),price1:z.coerce.number().int().positive(),price2:z.coerce.number().int().positive(),price3:z.coerce.number().int().positive(),price5:z.coerce.number().int().positive()}).parse(raw);await prisma.product.upsert({where:{id:'foot-massager'},create:{id:'foot-massager',...data,active:form.has('active')},update:{...data,active:form.has('active')}});revalidatePath('/admin');revalidatePath('/');}

export async function savePromotion(form:FormData){const raw=Object.fromEntries(form);const data=z.object({name:z.string().min(2).max(100),startsAt:z.coerce.date(),endsAt:z.coerce.date()}).refine(value=>value.endsAt>value.startsAt,{message:'End date must be after start date'}).parse(raw);await prisma.promotion.upsert({where:{id:'main-promotion'},create:{id:'main-promotion',...data,active:form.has('active')},update:{...data,active:form.has('active')}});revalidatePath('/admin');revalidatePath('/');}
