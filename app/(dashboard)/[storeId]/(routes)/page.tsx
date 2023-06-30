import { prisma } from '@/lib/prismadb'
import { type FC } from 'react'

interface Props {
  params: { storeId: string }
}

const DashboardPage: FC<Props> = async ({ params }) => {
  const store = await prisma.store.findFirst({
    where: { id: params.storeId }
  })
  return <div>Active Store: {store?.name}</div>
}

export default DashboardPage
