'use client'

import BackAppbar from '@/components/common/BackAppbar'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AdvisorItem } from '../components/AdvisorList'
import { useParams } from 'next/navigation'
import { getTeachersByCategory, SearchType } from '@/app/api/teacher'
import { TeacherListDto } from '@/app/api/data'

export default function CategoryAdvisorList() {
  const [advisors, setAdvisors] = useState<TeacherListDto[]>([])
  const [page, setPage] = useState<number>(0)
  const [hasMore, setHasMore] = useState(true)
  const observer = useRef<IntersectionObserver | null>(null)

  const param = useParams()
  const type = param.category?.toString().toUpperCase() ?? ''

  useEffect(() => {
    setAdvisors([])

    getTeachers(SearchType.RECENT, page)
  }, [])

  useEffect(() => {
    getTeachers(SearchType.RECENT, page)
  }, [page])

  const getTeachers = async (query: SearchType, page: number) => {
    const response = await getTeachersByCategory(query, page, type)
    if (response.content.length === 0) {
      setHasMore(false)
      return
    }
    setHasMore(!response.last)
    setAdvisors((prev) => [...prev, ...response.content])
  }

  const lastAdvisorElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [hasMore]
  )

  return (
    <div>
      <BackAppbar />
      <div className="px-5 inline-flex gap-2.5 w-full flex-col">
        {advisors.map((item, index) => (
          <AdvisorItem
            key={type + index}
            {...item}
            ref={lastAdvisorElementRef}
          />
        ))}
      </div>
    </div>
  )
}
