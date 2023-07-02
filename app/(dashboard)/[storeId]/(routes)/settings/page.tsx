import { prisma } from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { type FC } from 'react'
import SettingsForm from './components/settings-form'

type Props = {
  params: { storeId: string }
}
const SettingsPage: FC<Props> = async ({ params }) => {
  const { userId } = auth()
  if (!userId) redirect('/sign-in')
  const store = await prisma.store.findFirst({
    where: { id: params.storeId, userId }
  })
  if (!store) redirect('/')
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <SettingsForm initData={store} />
      </div>
    </div>
  )
}

export default SettingsPage
