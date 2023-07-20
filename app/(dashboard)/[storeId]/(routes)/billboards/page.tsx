import { type FC } from 'react'
import { BillboardClient } from './components/client'
import { format } from 'date-fns'
import { prisma } from '@/lib/prismadb'
import { BillboardColumn } from './components/columns'

type Props = { params: { storeId: string } }

const BillboardsPage: FC<Props> = async ({ params }) => {
  const billboards = await prisma.billboard.findMany({
    where: { storeId: params.storeId },
    orderBy: { createdAt: 'desc' }
  })
  const formattedBillboards: BillboardColumn[] = billboards.map(item => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, 'MMMM do, yyyy')
  }))
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  )
}

export default BillboardsPage
