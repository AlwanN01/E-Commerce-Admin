import { FC } from 'react'

interface layoutProps {
  children: React.ReactNode
}

const AuthLayout: FC<layoutProps> = ({ children }) => {
  return <main className='flex h-full w-full items-center justify-center'>{children}</main>
}

export default AuthLayout
