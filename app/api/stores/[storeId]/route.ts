import { prisma } from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

type Props = { params: { storeId: string } }
export async function PATCH(req: Request, { params }: Props) {
  try {
    const { userId } = auth()
    const { name } = await req.json()
    if (!userId) return new NextResponse('Unauthorized', { status: 401 })
    if (!name) return new NextResponse('Name is required', { status: 400 })
    if (!params.storeId) return new NextResponse('Store is required', { status: 400 })
    const store = await prisma.store.updateMany({
      where: {
        id: params.storeId,
        userId
      },
      data: { name }
    })
    return NextResponse.json(store)
  } catch (error) {
    console.log('[STORE_PATCH]', error)
    return new NextResponse('internal Error', { status: 500 })
  }
}
export async function DELETE(req: Request, { params }: Props) {
  try {
    const { userId } = auth()
    if (!userId) return new NextResponse('Unauthorized', { status: 401 })
    if (!params.storeId) return new NextResponse('Store is required', { status: 400 })
    const store = await prisma.store.deleteMany({
      where: {
        id: params.storeId,
        userId
      }
    })
    return NextResponse.json(store)
  } catch (error) {
    console.log('[STORE_DELETE]', error)
    return new NextResponse('internal Error', { status: 500 })
  }
}
