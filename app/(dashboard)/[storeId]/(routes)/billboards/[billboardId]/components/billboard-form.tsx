'use client'
import { useState, type FC } from 'react'
import { Billboard } from '@prisma/client'
import { Trash } from 'lucide-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import { Heading } from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import AlertModal from '@/components/modals/alert-modal'
import { useStoreModal } from '@/hooks/useStoreModal'

import { ImageUpload } from '@/components/ui/image-upload'

const formSchema = z.object({ label: z.string().nonempty(), imageUrl: z.string().nonempty() })
export type BillboardForm = z.infer<typeof formSchema>

type Props = { initData: Billboard | null }

const BillboardForm: FC<Props> = ({ initData }) => {
  const params = useParams() as { storeId: string; billboardId: string }
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const title = initData ? 'Edit Billboard' : 'Create Billboard'
  const description = initData ? 'Edit a Billboard' : 'Add a new Billboard'
  const toastMessage = initData ? 'Billboard updated.' : 'Billboard created'
  const action = initData ? 'Save Changes' : 'Create'
  const { setHasStore } = useStoreModal.use('setHasStore')
  const form = useForm<BillboardForm>({
    resolver: zodResolver(formSchema),
    defaultValues: initData || { label: '', imageUrl: '' }
  })
  const onSubmit = async (data: BillboardForm) => {
    try {
      setLoading(true)
      if (initData) {
        await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data)
      } else {
        await axios.post(`/api/${params.storeId}/billboards`, data)
      }
      router.refresh()
      router.push(`/${params.storeId}/billboards`)
      toast.success(toastMessage)
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }
  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`)
      setHasStore(false)
      router.refresh()
      router.push(`/${params.storeId}/billboards`)
      toast.success('Billboard deleted. ')
    } catch (error) {
      toast.error('Make sure you removed all categgories using this billboard first')
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }
  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading} />
      <div className='flex items-center justify-between'>
        <Heading title={title} description={description} />
        {initData && (
          <Button variant='destructive' size='sm' onClick={() => setOpen(true)} disabled={loading}>
            <Trash className='h-4 w-4' />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-8'>
          <FormField
            control={form.control}
            name='imageUrl'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={url => field.onChange(url)}
                    onRemove={() => field.onChange('')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='grid grid-cols-3 gap-8'>
            <FormField
              control={form.control}
              name='label'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder='Billboard label' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className='ml-auto' type='submit'>
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}

export default BillboardForm
