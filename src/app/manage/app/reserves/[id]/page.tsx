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
import { basicGet } from '@/api/base'
import { useQuery } from '@tanstack/react-query'
import { TeacherReserveHistoryDto } from '@/types/api'

const api = (reserveId: string): Promise<TeacherReserveHistoryDto> => basicGet(`/reserve/history/${reserveId}`) as any;

export default function Page() {
  const reserveId = usePathname().split('/').pop() as string

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['reserve', reserveId],
    queryFn: () => api(reserveId),
  });

  const reload = () => refetch();

  console.log(data);

  return (
    <div>
      <BackAppbar />
      <ReserveSummary detail={data} />
      <GreyDivider />
      <div className="inline-flex gap-5 flex-col px-5 w-full mb-24">
        <ReserveStats detail={data} />
        <ReserveNotes detail={data} reload={refetch} />
        <ReserveHistory detail={data} />
        <ReserveReview detail={data} />
      </div>
    </div>
  )
}
