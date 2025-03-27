'use client';

import BackAppbar from '@/components/common/BackAppbar'
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isQna = pathname.includes('qna');

  return (
    <div>
      {!isQna && <BackAppbar />}
      <section className={cn(["px-5 h-screen", !isQna && "py-2"])}>{children}</section>
    </div>
  )
}
