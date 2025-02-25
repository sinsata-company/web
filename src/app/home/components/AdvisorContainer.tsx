'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import AdvisorList from './AdvisorList'
import AdvisorSort from './AdvisorSort'
import { TeacherListDto } from '@/app/api/data'
import { getTeacherList, SearchType } from '@/app/api/teacher'

export default function AdvisorContainer() {
  const [advisorList, setAdvisorList] = useState<TeacherListDto[]>([])
  const [page, setPage] = useState<number>(0)
  const [sort, setSort] = useState<SearchType>(SearchType.NEW)
  const [hasMore, setHasMore] = useState(true)
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    getTeachers(SearchType.NEW, page)
  }, [page, sort])

  const getTeachers = async (query: SearchType, page: number) => {
    const response = await getTeacherList(query, page)

    setAdvisorList((prev) => [...prev, ...response.content])
    setHasMore(!response.last)
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
      <div className="px-5">
        <AdvisorSort
          getTeachers={async (sort, page) => {
            setPage(0)
            setAdvisorList([])
            setSort(sort)
            await getTeachers(SearchType.NEW, page)
          }}
          page={page}
        />
      </div>
      <div className="h-6"></div>
      <div className="px-5 h-screen">
        <AdvisorList
          advisorList={advisorList}
          lastAdvisorElementRef={lastAdvisorElementRef}
        />
      </div>
    </div>
  )
}
