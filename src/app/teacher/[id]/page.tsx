'use client'

import BackAppbar from '@/components/common/BackAppbar'
import ImageCarousel from './components/ImageCarousel'
import TeacherSummary from './components/TeacherSummary'
import { Button, BUTTON_TYPE } from '@/components/common/Button'
import TeacherAdvance from './components/TeacherAdvance'
import TeacherReview from './components/TeacherReview'
import TeacherIntroduciton from './components/TeacherIntroduction'
import AdviceQnA from './components/AdviceQnA'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { IAdvisor } from '@/dummy/dummyTeacher'
import { getAdvisorInfo } from '@/services/advisor'

export default function TeacherPage() {
  const [advisor, setAdvisor] = useState<IAdvisor | null>(null)
  const router = useRouter()
  const param = useParams()

  useEffect(() => {
    console.log(param.id)
    const advisor = getAdvisorInfo(Number(param.id))
    setAdvisor(advisor ?? null)
    // const advisor =
  }, [])
  return (
    <div>
      <BackAppbar />
      <div className="px-5">
        <ImageCarousel
          imageList={advisor?.profileImage}
          showImageModal={() => {}}
        />
        <div className="h-6"></div>
        <TeacherSummary advisor={advisor} />
        <div className="h-6"></div>
        <Button
          onClick={() => {
            router.push('/teacher/' + 1 + '/reserve')
          }}
          buttonType={BUTTON_TYPE.primary}
          label="예약하기"
        />
        <div className="h-6"></div>
      </div>
      <div className="h-2 bg-zinc-100" />
      <div className="px-5 py-6">
        <TeacherAdvance />
      </div>
      <div className="px-5 py-6">
        <TeacherReview />
      </div>
      <div className="px-5 py-6">
        <TeacherIntroduciton introduction={advisor?.introduction} />
      </div>
      <div className="px-5 py-6">
        <AdviceQnA />
      </div>
    </div>
  )
}
