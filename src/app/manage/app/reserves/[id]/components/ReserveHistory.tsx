'use client'

import GradientTitle from '@/components/common/GradientTitle'
import { useState } from 'react'

const ReserveHistory = () => {
  const [histories, setHistory] = useState(['', ''])
  const [openIndex, setOpenIndex] = useState<number | null>(null)

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
                2025년 1월 7일
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
              상담 메모 샘플
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReserveHistory
