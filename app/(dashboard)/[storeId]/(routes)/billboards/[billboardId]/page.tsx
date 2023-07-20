import { prisma } from '@/lib/prismadb'
import { type FC } from 'react'
import BillboardForm from './components/billboard-form'

type Props = { params: { billboardId: string } }

const BillboardPage: FC<Props> = async ({ params }) => {
  const billboard = await prisma.billboard.findUnique({
    where: { id: params.billboardId }
  })
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BillboardForm initData={billboard} />
      </div>
    </div>
  )
}

export default BillboardPage
