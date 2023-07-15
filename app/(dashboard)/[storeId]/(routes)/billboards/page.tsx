import { type FC } from 'react'
import { BillboardClient } from './components/client'

type Props = {}

const BillboardsPage: FC<Props> = ({}) => {
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BillboardClient />
      </div>
    </div>
  )
}

export default BillboardsPage
