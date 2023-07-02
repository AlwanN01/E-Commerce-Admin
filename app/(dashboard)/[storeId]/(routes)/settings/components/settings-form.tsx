'use client'
import { useState, type FC } from 'react'
import { Store } from '@prisma/client'
import { Trash } from 'lucide-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Separator } from '@/components/ui/separator'
import { Heading } from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

const formSchema = z.object({ name: z.string().nonempty() })
type Settings = z.infer<typeof formSchema>

type Props = { initData: Store }

const SettingsForm: FC<Props> = ({ initData }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const form = useForm<Settings>({
    resolver: zodResolver(formSchema),
    defaultValues: initData
  })
  const onSubmit = async (data: Settings) => {
    console.log(data)
  }
  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading title='Settings' description='Manage store preference' />
        <Button variant='destructive' size='sm' onClick={() => setOpen(true)} disabled={loading}>
          <Trash className='h-4 w-4' />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-8'>
          <div className='grid grid-cols-3 gap-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder='Store Name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className='ml-auto' type='submit'>
            Save changes
          </Button>
        </form>
      </Form>
    </>
  )
}

export default SettingsForm
