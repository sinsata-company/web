'use client';

import ReserveList from '../home/components/ReserveList'
import { useQuery } from '@tanstack/react-query'
import { getTeacherReservations } from './api'

export default function Page() {
  const { data } = useQuery({
    queryKey: ['reserves'],
    queryFn: getTeacherReservations,
  });

  const reserves = data ?? [];
  return (
    <div className="inline-flex flex-col gap-5 px-5 w-full">
      <ReserveList reserves={reserves} />
    </div>
  )
}
