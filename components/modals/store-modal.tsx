'use client'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Modal } from '@/components/ui/modal'
import { useStoreModal } from '@/hooks/useStoreModal'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const formSchema = z.object({ name: z.string().min(1) })
export type FormModal = z.infer<typeof formSchema>

interface Props {}
const StoreModal: React.FC<Props> = ({}) => {
  const { isOpen, isLoading, setIsOpen, onSubmit } = useStoreModal()
  const router = useRouter()
  const form = useForm<FormModal>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '' },
    mode: 'onTouched'
  })
  return (
    <Modal
      title='Create Store'
      description='Add a new store to manage products and categories'
      isOpen={isOpen}
      onClose={() => setIsOpen(state => false)}>
      <div>
        <div className='space-y-4 py-2 pb-4'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit(router))}>
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
