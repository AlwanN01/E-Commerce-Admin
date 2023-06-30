'use client'

import { useState, type FC, useEffect } from 'react'
import StoreModal from '@/components/modals/store-modal'
interface Props {}

const ModalProvider: FC<Props> = ({}) => {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => setIsMounted(true), [])

  if (!isMounted) return null
  return <StoreModal />
}

export default ModalProvider
