'use client'
import { type FC } from 'react'
import Modal from '../ui/modal'
import { useStoreModal } from '@/hooks/useStoreModal'

interface Props {}

const StoreModal: FC<Props> = ({}) => {
  const { isOpen, setIsOpen } = useStoreModal()
  return (
    <Modal
      title='Create Store'
      description='Add a new store to manage products and categories'
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}>
      Future Create Store Form
    </Modal>
  )
}

export default StoreModal
