import { type FC } from 'react'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs'
import { prisma } from '@/lib/prismadb'
import Navbar from '@/components/navbar'

interface Props {
  children: React.ReactNode
  params: { storeId: string }
}

const DashboardLayout: FC<Props> = async ({ children, params }) => {
  const { userId } = auth()
  if (!userId) redirect('/sign-in')
  const store = await prisma.store.findFirst({
    where: { id: params.storeId, userId }
  })
  if (!store) redirect('/')
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}

export default DashboardLayout
