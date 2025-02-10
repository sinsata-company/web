'use client'

import IWCalendar from '@/app/teacher/[id]/reserve/components/Calendar'
import ReserveList from './ReserveList'
import { useEffect, useState } from 'react'
import moment, { Moment } from 'moment'

const AdvisorReserves = () => {
  const [selectedDate, setSelectedDate] = useState<Moment | null>(null)
  const [now, setNow] = useState<Moment>(moment())

  useEffect(() => {
    setSelectedDate(moment())
  }, [])
  return (
    <div className="px-5">
      <IWCalendar
        year={now.year()}
        month={now.month() + 1}
        selectedDate={selectedDate}
        onDateSelect={(date) => {
          setSelectedDate(date)
        }}
      />
      <ReserveList reserves={[]} />
    </div>
  )
}

export default AdvisorReserves
