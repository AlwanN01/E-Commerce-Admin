'use client'
import { ComponentPropsWithoutRef, useState, type FC } from 'react'
import { Check, ChevronsUpDown, PlusCircle, StoreIcon, Store as StoreItem } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { Store } from '@prisma/client'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/components/ui/command'
import { useStoreModal } from '@/hooks/useStoreModal'

type PopoverTriggerProps = ComponentPropsWithoutRef<typeof PopoverTrigger>
interface Props extends PopoverTriggerProps {
  items: Store[]
}

const StoreSwitcher: FC<Props> = ({ className, items = [] }) => {
  const { isOpen, setIsOpen } = useStoreModal()
  const params = useParams()
  const router = useRouter()
  const formattedItems = items.map(item => ({
    label: item.name,
    value: item.id
  }))
  const currentStore = formattedItems.find(item => item.value === params.storeId)
  const [open, setOpen] = useState(false)
  const onStoreSelect = (store: { value: string; label: string }) => {
    setOpen(false)
    router.push(`/${store.value}`)
  }
  const onStoreHover = (store: { value: string; label: string }) => router.prefetch(`/${store.value}`)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          role='combobox'
          aria-expanded={open}
          aria-label='Select a store'
          className={cn('w-[200px] justify-between', className)}>
          <StoreItem className='mr-2 h-4 w-4' />
          {currentStore?.label}
          <ChevronsUpDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandList>
            <CommandInput placeholder='Search Store...' />
            <CommandEmpty>No Store Found.</CommandEmpty>
            <CommandGroup heading='Stores'>
              {formattedItems.map(store => (
                <CommandItem
                  key={store.value}
                  className='cursor-pointer'
                  onSelect={() => onStoreSelect(store)}
                  onMouseOver={() => onStoreHover(store)}>
                  <StoreIcon className='mr-2 h-4 w-4' />
                  {store.label}
                  <Check
                    className={cn('ml-auto h-4 w-4', currentStore?.value === store.value ? 'opacity-100' : 'opacity-0')}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem className='cursor-pointer' onSelect={() => (setOpen(false), setIsOpen(true))}>
                <PlusCircle className='mr-3 h-5 w-5 ' />
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default StoreSwitcher
