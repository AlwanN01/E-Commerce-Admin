'use client'
import { Toaster } from 'react-hot-toast'
import { type FC } from 'react'

interface Props {}

const ToastProvider: FC<Props> = ({}) => {
  return <Toaster />
}

export default ToastProvider
