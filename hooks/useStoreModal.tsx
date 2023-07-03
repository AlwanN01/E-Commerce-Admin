import axios from 'axios'
import { toast } from 'react-hot-toast'
import { createStore } from '@/lib/zustand'
import { type FormModal } from '@/components/modals/store-modal'
import { type AppRouterInstance } from 'next/dist/shared/lib/app-router-context'

export const useStoreModal = createStore(
  { isOpen: false, hasStore: false, isLoading: false },
  (set, get) => ({
    onSubmit: (router: AppRouterInstance) => async (values: FormModal) => {
      try {
        set({ isLoading: true })
        const res = await axios.post('/api/stores', values)
        set({ isOpen: false, hasStore: true })
        router.refresh()
        router.push(`/${res.data.id}`)
      } catch (error) {
        toast.error('Something went wrong')
      } finally {
        setTimeout(() => set({ isLoading: false }), 300)
      }
    }
  }),
  { nameStore: 'Store Modal' }
)
