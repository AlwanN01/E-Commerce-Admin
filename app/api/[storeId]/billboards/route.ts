import type { BillboardForm } from '@/app/(dashboard)/[storeId]/(routes)/billboards/[billboardId]/components/billboard-form'
import { prisma } from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
type Ctx = { params: { storeId: string } }
export async function POST(req: Request, { params }: Ctx) {
  try {
    const { userId } = auth()
    const { label, imageUrl } = (await req.json()) as BillboardForm
    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })
    if (!label) return new NextResponse('Label is required', { status: 400 })
    if (!imageUrl) return new NextResponse('ImageUrl is required', { status: 400 })
    if (!params.storeId) return new NextResponse('storeId is required', { status: 400 })
    const storeByUserid = await prisma.store.findFirst({
      where: { id: params.storeId, userId }
    })
    if (!storeByUserid) return new NextResponse('Unauthorized', { status: 403 })

    const billboard = await prisma.billboard.create({
      data: { label, imageUrl, storeId: params.storeId }
    })
    return NextResponse.json(billboard)
  } catch (error) {
    console.log('[BILLBOARDS_POST]', error)
    return new NextResponse('internal Error', { status: 500 })
  }
}

export async function GET(req: Request, { params }: Ctx) {
  try {
    if (!params.storeId) return new NextResponse('storeId is required', { status: 400 })

    const billboards = await prisma.billboard.findMany({
      where: { storeId: params.storeId }
    })
    return NextResponse.json(billboards)
  } catch (error) {
    console.log('[BILLBOARDS_GET]', error)
    return new NextResponse('internal Error', { status: 500 })
  }
}
