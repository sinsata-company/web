'use client'

import { useEffect, useState } from 'react'
import AdvisorList from './AdvisorList'
import AdvisorSort from './AdvisorSort'
import { TeacherListDto } from '@/app/api/data'
import { getTeacherList, SearchType } from '@/app/api/teacher'

export default function AdvisorContainer() {
  const [advisorList, setAdvisorList] = useState<TeacherListDto[]>([])

  useEffect(() => {
    getTeachers(SearchType.NEW)
  }, [])

  const getTeachers = async (query: SearchType) => {
    const response = await getTeacherList(query)
    setAdvisorList(response.content)
  }

  return (
    <div>
      <div className="px-5">
        <AdvisorSort getTeachers={getTeachers} />
      </div>
      <div className="h-6"></div>
      <div className="px-5">
        <AdvisorList advisorList={advisorList} />
      </div>
    </div>
  )
}
