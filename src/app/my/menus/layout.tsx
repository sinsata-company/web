'use client';

import BackAppbar from '@/components/common/BackAppbar'
import useUserMenuStore from '@/components/user-menu/user-menu.store'
import { usePathname } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hide = pathname.includes('reviews');

  const { hideAppBar } = useUserMenuStore();
  return (
    <section>
      {!hideAppBar && !hide && <BackAppbar />}
      <div>{children}</div>
    </section>
  )
}
