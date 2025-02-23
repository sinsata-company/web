'use client'

import { getHomeCash } from '@/app/manage/api/homepage'
import { formatNumberWithCommas } from '@/utils/numberFormatter'
import { useEffect, useState } from 'react'

const AdvisorSummary = () => {
  const [cash, setCash] = useState<number>(0)

  useEffect(() => {
    getHomeCash().then((val) => {
      console.log(val)
      setCash(val)
    })
  }, [])

  return (
    <div className="w-full h-auto px-4   flex-col justify-start items-start gap-2.5 inline-flex">
      <div className=" bg-amber-50 px-6 py-4 rounded-2xl   w-full flex-col justify-start items-start gap-6 flex">
        <div className="text-black text-lg font-bold font-['Pretendard']">
          이달의 상담 금액
        </div>
        <div className="w-full relative">
          <div className="w-full px-4 py-2 bg-white rounded-full border-2 border-gray-200 flex">
            <div className="w-6 h-6  bg-orange-300 rounded-full flex items-center justify-center">
              <div className=" text-center text-neutral-800 text-md font-semibold font-['Pretendard'] ">
                ₩
              </div>
            </div>
            <div className=" w-full text-center text-neutral-800 text-lg font-bold font-['Pretendard']">
              {formatNumberWithCommas(cash)} 코인
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdvisorSummary
