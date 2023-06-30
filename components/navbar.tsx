import { UserButton } from '@clerk/nextjs'
import { type FC } from 'react'
import MainNav from '@/components/main-nav'

interface Props {}

const Navbar: FC<Props> = ({}) => {
  return (
    <header className='border-b'>
      <div className='flex h-16 items-center px-4'>
        <div>This will be a store switcher</div>
        <MainNav className='mx-6' />
        <div className='ml-auto flex items-center space-x-4'>
          <UserButton afterSignOutUrl='/' />
        </div>
      </div>
    </header>
  )
}

export default Navbar
