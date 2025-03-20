'use client'

import { useEffect, useState } from 'react'
import BTB from '@/components/common/Btb'
import MainAppbar from '@/components/common/MainAppbar'
import { SearchProvider } from '@/components/common/SearchContext'
import dynamic from 'next/dynamic'
import { getMyLikeTeachers } from '@/app/api/teacher'
import { TeacherListDto } from '@/app/api/data'
const AdvisorContainer = dynamic(
  () => import('@/app/heart/components/AdvisorContainer'),
  {
    ssr: false,
  }
)

export default function HeartPage() {

  return (
    <SearchProvider>
      <div>
        <MainAppbar />
        <div className="p-4">
        </div>
        <AdvisorContainer />
        <BTB />
      </div>
    </SearchProvider>
  )
} 