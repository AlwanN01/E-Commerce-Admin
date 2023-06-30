import { prisma } from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { type FC } from 'react'

interface Props {
  children: React.ReactNode
}

const SetupLayout: FC<Props> = async ({ children }) => {
  const { userId } = auth()
  if (!userId) redirect('/sign-in')
  const store = await prisma.store.findFirst({ where: { userId } })
  if (store) redirect(`/${store.id}`)

  return <>{children}</>
}

export default SetupLayout
