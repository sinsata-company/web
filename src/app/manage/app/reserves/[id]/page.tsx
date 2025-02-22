'use client'

import BackAppbar from '@/components/common/BackAppbar'
import ReserveSummary from './components/ReserveSummary'
import ReserveStats from './components/ReserveStats'
import { GreyDivider } from '@/components/common/Divider'
import ReserveNotes from './components/ReserveNotes'
import ReserveHistory from './components/ReserveHistory'
import ReserveReview from './components/ReserveReview'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getReserveInfo, ReserveDetailDto } from '@/app/manage/api/reserve'

export default function Page() {
  const [detail, setDetail] = useState<ReserveDetailDto | null>(null)
  const reserveId = usePathname().split('/').pop() as string
  console.log(reserveId)

  useEffect(() => {
    reload()
  }, [])
  const reload = async () => {
    const detail = await getReserveInfo(reserveId)
    setDetail(detail)
  }

  return (
    <div>
      <BackAppbar />
      <ReserveSummary detail={detail} />
      <GreyDivider />
      <div className="inline-flex gap-5 flex-col px-5 w-full mb-24">
        <ReserveStats detail={detail} />
        <ReserveNotes detail={detail} reload={reload} />
        <ReserveHistory detail={detail} />
        <ReserveReview detail={detail} />
      </div>
    </div>
  )
}
