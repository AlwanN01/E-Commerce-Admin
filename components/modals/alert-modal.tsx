'use client'
import { useState, type FC, useEffect } from 'react'
import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'

type Props = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  loading: boolean
}

const AlertModal: FC<Props> = ({ isOpen, onClose, onConfirm, loading }) => {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => setIsMounted(true), [])
  if (!isMounted) return null
  return (
    <Modal title='Are you sure?' description='This action cannot be undone.' isOpen={isOpen} onClose={onClose}>
      <div className='flex w-full items-center justify-end space-x-2 pt-6'>
        <Button disabled={loading} variant='outline' onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} variant='destructive' onClick={onConfirm}>
          continue
        </Button>
      </div>
    </Modal>
  )
}

export default AlertModal
