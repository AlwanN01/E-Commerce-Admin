'use client'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { ComponentProps, type FC } from 'react'
import { cn } from '@/lib/utils'

type Props = ComponentProps<'nav'>
type Routes = {
  href: string
  label: string
  active: boolean
}[]
const MainNav: FC<Props> = ({ className, ...props }) => {
  const pathName = usePathname()
  const params = useParams()
  const routes: Routes = [
    {
      href: `/${params.storeId}`,
      label: 'Overciew',
      active: pathName.startsWith(`/${params.storeId}`)
    },
    {
      href: `/${params.storeId}/billboards`,
      label: 'Billboards',
      active: pathName.startsWith(`/${params.storeId}/billboards`)
    },
    {
      href: `/${params.storeId}/settings`,
      label: 'Settings',
      active: pathName.startsWith(`/${params.storeId}/settings`)
    }
  ]
  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)}>
      {routes.map(route => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
          )}>
          {route.label}
        </Link>
      ))}
    </nav>
  )
}

export default MainNav
