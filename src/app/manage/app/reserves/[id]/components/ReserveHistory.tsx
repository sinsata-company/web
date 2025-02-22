'use client'

import { ReserveDto } from '@/app/api/data'
import { ReserveDetailDto } from '@/app/manage/api/reserve'
import GradientTitle from '@/components/common/GradientTitle'
import moment from 'moment'
import { useEffect, useState } from 'react'

const ReserveHistory = ({ detail }: { detail: ReserveDetailDto | null }) => {
  const [histories, setHistory] = useState<ReserveDto[]>([])
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    setHistory(detail?.reserveDtos ?? [])
  }, [detail])

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }
  return (
    <div className="inline-flex flex-col gap-2 w-full">
      <GradientTitle title="이전 상담 내역" />
      <div className="self-stretch flex-col justify-start items-start gap-3 flex">
        {histories.map((history, index) => (
          <div
            key={index}
            className="self-stretch p-4 bg-neutral-50 rounded-xl flex-col justify-start items-start gap-3 flex cursor-pointer"
            onClick={() => toggleFAQ(index)}
          >
            <div className="self-stretch justify-between items-center inline-flex">
              <div className="text-zinc-900 text-base font-bold font-['Pretendard Variable'] leading-snug">
                {moment(history.startAt).format('YYYY년 MM월 DD일 HH:mm')}
              </div>
              <div className="w-4 h-4 flex-col justify-center items-center gap-2.5 inline-flex">
                <img
                  src="/images/ic_arrow_up.svg"
                  alt="arrow"
                  className={`transition-transform duration-300 ease-in-out ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </div>
            <div
              className={`self-stretch text-neutral-500 text-base font-normal font-['Pretendard'] leading-snug transition-max-height duration-300 ease-in-out overflow-hidden ${
                openIndex === index ? 'max-h-40' : 'max-h-0'
              }`}
            >
              {history.note ?? '상담 내용이 없습니다.'}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReserveHistory
