'use client'
import { useState, type FC } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import axios from 'axios'
import { Modal } from '@/components/ui/modal'
import { useStoreModal } from '@/hooks/useStoreModal'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'react-hot-toast'

const formSchema = z.object({
  name: z.string().min(1)
})
type Form = z.infer<typeof formSchema>
interface Props {}

const StoreModal: FC<Props> = ({}) => {
  const { isOpen, setIsOpen } = useStoreModal()
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<Form>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '' }
  })
  const onSubmit = async (values: Form) => {
    try {
      setIsLoading(true)
      const res = await axios.post('/api/stores', values)
      window.location.assign(`/${res.data.id}`)
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Modal
      title='Create Store'
      description='Add a new store to manage products and categories'
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}>
      <div>
        <div className='space-y-4 py-2 pb-4'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} placeholder='E-Commerce' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex w-full items-center justify-end space-x-2 pt-6'>
                <Button disabled={isLoading} variant='outline' onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button disabled={isLoading} type='submit'>
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  )
}

export default StoreModal
