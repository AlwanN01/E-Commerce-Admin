'use client'

import { useEffect } from 'react'
import { useStoreModal } from '@/hooks/useStoreModal'

const SetupPage = () => {
  const { setIsOpen, isOpen } = useStoreModal()

  useEffect(() => void (!isOpen && setIsOpen(true)), [isOpen, setIsOpen])
  return <main className='p-4'>Root Page</main>
}

export default SetupPage
