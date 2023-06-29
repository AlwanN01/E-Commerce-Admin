'use client'
import { FC } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

interface Props {
  title: string
  description: string
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const Modal: FC<Props> = ({ title, description, isOpen, onClose, children }) => {
  const onChange = (open: boolean) => !open && onClose()
  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <section>{children}</section>
      </DialogContent>
    </Dialog>
  )
}

export default Modal
