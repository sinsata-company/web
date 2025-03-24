'use client';

import { ReactNode } from 'react';

import QueryProvider from '@/components/providers/QueryProvider'
import LayoutChild from './layout-comp'
import KakaoScript from '@/components/common/KakaoScript'

export default function Main({ children }: { children: ReactNode }) {
    return (
        <div className="w-full h-screen">
        <QueryProvider>
          <LayoutChild>{children}</LayoutChild>
          <KakaoScript />
        </QueryProvider>
      </div>
    )
}