'use client'

import { getPayHistory, PayHistoryDto } from '@/app/api/user'
import { useEffect, useState } from 'react'
import ReserveItem from '../../components/ReserveItem'
import Image from 'next/image'
import moment from 'moment'
import { formatNumberWithCommas } from '@/utils/numberFormatter'

export default function Page() {
  const [payHistory, setPayHistory] = useState<PayHistoryDto[]>([])

  useEffect(() => {
    getPayHistory().then((res) => {
      setPayHistory(res)
    })
  }, [])
  return (
    <div className="flex flex-col gap-4 w-full">
      {payHistory.map((history, idx) => (
        <PayHistoryItem {...history} key={'history-' + idx} />
      ))}
    </div>
  )
}

const PayHistoryItem = (history: PayHistoryDto) => {
  const { teacherName, payDttm, payAmt, payType } = history
  return (
    <div className="w-full grow h-28 p-4 bg-neutral-50 rounded-2xl border border-zinc-100 justify-start items-center gap-3 inline-flex">
      <div className="grow flex-col justify-center items-start gap-2 inline-flex overflow-hidden">
        <div className=" text-zinc-900 text-base font-bold ">{teacherName}</div>
        <div className=" text-zinc-900 text-base text-xs ">
          {moment(payDttm).format('YYYY-MM-DD HH:mm')}
        </div>
      </div>
      <div className=" text-gradient text-base font-bold ">
        {formatNumberWithCommas(payAmt)}원 사용 (
        {payType == 'RESERVE' ? '예약' : '실시간 상담'})
      </div>
    </div>
  )
}
