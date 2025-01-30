'use client'

import IWCalendar from '@/app/teacher/[id]/reserve/components/Calendar'
import ReserveList from './ReserveList'
import { useEffect, useState } from 'react'
import moment, { Moment } from 'moment'

const AdvisorReserves = () => {
  const [selectedDate, setSelectedDate] = useState<Moment | null>(null)
  const [selectedTime, setSelectedTime] = useState<string>('')
  const timeClick = (time: string) => {
    setSelectedTime(time)
  }
  useEffect(() => {
    setSelectedDate(moment())
  }, [])
  return (
    <div className="px-5">
      <IWCalendar
        year={2025}
        month={1}
        selectedDate={selectedDate}
        onDateSelect={(date) => {
          setSelectedDate(date)
        }}
      />
      <ReserveList reserves={['']} />
    </div>
  )
}

export default AdvisorReserves
