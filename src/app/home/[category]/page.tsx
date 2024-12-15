'use client'

import BackAppbar from '@/components/common/BackAppbar'
import { IAdvisor } from '@/dummy/dummyTeacher'
import { useEffect, useState } from 'react'
import { AdvisorItem } from '../components/AdvisorList'
import { getCategoryAdvisor } from '@/services/advisor'
import { useParams } from 'next/navigation'

export default function CategoryAdvisorList() {
  const [advisors, setAdvisors] = useState<IAdvisor[]>([])

  const param = useParams()

  useEffect(() => {
    const adv = getCategoryAdvisor(param.category?.toString() ?? '')
    setAdvisors(adv)
  }, [])
  return (
    <div>
      <BackAppbar />
      <div className="px-5 inline-flex gap-2.5 w-full flex-col">
        {advisors.map((item) => (
          <AdvisorItem {...item} />
        ))}
      </div>
    </div>
  )
}
