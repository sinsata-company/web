'use client'

import { TeacherListDto } from '@/app/api/data'
import { AdvisorItem } from '@/app/home/components/AdvisorList'
import { getMySummary } from '@/app/manage/api/mypage'
import { useEffect, useState } from 'react'

const ProfileSummary = () => {
  const [my, setMy] = useState<TeacherListDto | null>(null)

  useEffect(() => {
    getMySummary().then((res) => {
      setMy(res)
    })
  }, [])

  return (
    <div className="w-full px-4 inline-flex flex-col gap-4">
      <p className="font-bold text-xl">내 프로필 간략보기</p>
      <AdvisorItem {...my} />
    </div>
  )
}

export default ProfileSummary
