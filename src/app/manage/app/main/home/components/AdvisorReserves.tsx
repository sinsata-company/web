'use client'

import IWCalendar from '@/app/teacher/[id]/reserve/components/Calendar'
import ReserveList from './ReserveList'
import { useEffect, useState } from 'react'
import moment, { Moment } from 'moment'
import { ReserveDto } from '@/app/api/data'
import { getReserveByDate } from '@/app/manage/api/homepage'

const AdvisorReserves = () => {
  const [selectedDate, setSelectedDate] = useState<Moment | null>(null)
  const [now, setNow] = useState<Moment>(moment())
  const [reserves, setReserves] = useState<ReserveDto[]>([])

  useEffect(() => {
    onclickDate(now)
  }, [])

  const onclickDate = async (date: Moment) => {
    setSelectedDate(date)
    const result = await getReserveByDate(date.format('yyyy-MM-DD'))
    setReserves(result)
  }

  return (
    <div className="px-5">
      <IWCalendar
        year={now.year()}
        month={now.month() + 1}
        selectedDate={selectedDate}
        onDateSelect={onclickDate}
      />
      <ReserveList reserves={reserves} />
    </div>
  )
}

export default AdvisorReserves
