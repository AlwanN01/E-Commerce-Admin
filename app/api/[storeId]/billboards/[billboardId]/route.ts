import { prisma } from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

type Props = { params: { storeId: string; billboardId: string } }
export async function GET(req: Request, { params }: Props) {
  try {
    if (!params.billboardId) return new NextResponse('Billboard id is required', { status: 400 })

    const store = await prisma.billboard.findUnique({
      where: {
        id: params.billboardId
      }
    })
    return NextResponse.json(store)
  } catch (error) {
    console.log('[BILLBOARD_GET]', error)
    return new NextResponse('internal Error', { status: 500 })
  }
}
export async function PATCH(req: Request, { params }: Props) {
  try {
    const { userId } = auth()
    const { label, imageUrl } = await req.json()
    if (!userId) return new NextResponse('Unauthorized', { status: 401 })
    if (!label) return new NextResponse('Label is required', { status: 400 })
    if (!imageUrl) return new NextResponse('Image Url is required', { status: 400 })
    if (!params.billboardId) return new NextResponse('Billboard id is required', { status: 400 })
    const storeByUserid = await prisma.store.findFirst({
      where: { id: params.storeId, userId }
    })
    if (!storeByUserid) return new NextResponse('Unauthorized', { status: 403 })

    const store = await prisma.billboard.updateMany({
      where: {
        id: params.billboardId
      },
      data: { label, imageUrl }
    })
    return NextResponse.json(store)
  } catch (error) {
    console.log('[BILLBOARD_PATCH]', error)
    return new NextResponse('internal Error', { status: 500 })
  }
}
export async function DELETE(req: Request, { params }: Props) {
  try {
    const { userId } = auth()
    if (!userId) return new NextResponse('Unauthorized', { status: 401 })
    if (!params.billboardId) return new NextResponse('Billboard id is required', { status: 400 })
    const storeByUserid = await prisma.store.findFirst({
      where: { id: params.storeId, userId }
    })
    if (!storeByUserid) return new NextResponse('Unauthorized', { status: 403 })
    const store = await prisma.billboard.deleteMany({
      where: {
        id: params.billboardId
      }
    })
    return NextResponse.json(store)
  } catch (error) {
    console.log('[BILLBOARD_DELETE]', error)
    return new NextResponse('internal Error', { status: 500 })
  }
}
