'use client';

import BackAppbar from '@/components/common/BackAppbar'
import useUserMenuStore from '@/components/user-menu/user-menu.store'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { hideAppBar } = useUserMenuStore();
  return (
    <section>
      {!hideAppBar && <BackAppbar />}
      <div>{children}</div>
    </section>
  )
}
