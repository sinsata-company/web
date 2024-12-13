'use client'

import BackAppbar from '@/components/common/BackAppbar'
import ImageCarousel from './components/ImageCarousel'
import TeacherSummary from './components/TeacherSummary'
import { Button, BUTTON_TYPE } from '@/components/common/Button'

export default function TeacherPage() {
  return (
    <div>
      <BackAppbar />
      <div className="px-5">
        <ImageCarousel imageList={['a', 'a']} showImageModal={() => {}} />
        <div className="h-6"></div>
        <TeacherSummary />
        <div className="h-6"></div>
        <Button buttonType={BUTTON_TYPE.primary} label="예약하기" />
        <div className="h-6"></div>
      </div>
      <div className="h-2 bg-zinc-100" />
    </div>
  )
}
