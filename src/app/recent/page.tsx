'use client'

import { useEffect, useState, Suspense } from 'react'
import BTB from '@/components/common/Btb'
import MainAppbar from '@/components/common/MainAppbar'
import { SearchProvider } from '@/components/common/SearchContext'
import dynamic from 'next/dynamic'
import { getMyLikeTeachers } from '@/app/api/teacher'
import { TeacherListDto } from '@/app/api/data'
import RecentAdvisorContainer from './components/RecentAdvisorContainer'
import { useSearchParams } from 'next/navigation'
const AdvisorContainer = dynamic(
  () => import('@/app/heart/components/AdvisorContainer'),
  {
    ssr: false,
  }
)

function RecentPageContent() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('q') || ''
  
  useEffect(() => {
    if (searchQuery) {
      // 검색 로직 실행
      // 예: handleSearch(searchQuery)
    }
  }, [searchQuery])

  return (
    <div>
      <MainAppbar />
      <div className="p-4">
        <p>검색어: {searchQuery}</p>
      </div>
      <RecentAdvisorContainer />
      <BTB />
    </div>
  )
}

export default function HeartPage() {
  return (
    <SearchProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <RecentPageContent />
      </Suspense>
    </SearchProvider>
  )
} 