'use client'

import { useEffect } from 'react'
import { useStoreModal } from '@/hooks/useStoreModal'

const SetupPage = () => {
  const { setIsOpen, hasStore, isOpen } = useStoreModal()

  useEffect(() => void (!hasStore && setIsOpen(true)), [hasStore, isOpen, setIsOpen])
  return <main className='p-4'>Root Page</main>
}

export default SetupPage
