'use client'

import { useState } from 'react'
import IWCalendar from './Calendar'
import { Moment } from 'moment'
import clsx from 'clsx'

export default function ReserveTime() {
  const [selectedDate, setSelectedDate] = useState<Moment | null>(null)
  const [selectedTime, setSelectedTime] = useState<string>('')
  const timeClick = (time: string) => {
    setSelectedTime(time)
  }
  return (
    <div className="w-full px-5 flex-col justify-start items-start gap-4 inline-flex">
      <div className="text-zinc-900 text-xl font-bold font-['Pretendard Variable']">
        상담 예약
      </div>
      <IWCalendar
        year={2024}
        month={12}
        selectedDate={selectedDate}
        onDateSelect={(date) => {
          setSelectedDate(date)
        }}
      />
      <div className="self-stretch h-72 flex-col justify-start items-start gap-4 flex">
        <div className="w-full h-20 ">
          <div className="  text-zinc-900 text-base font-bold font-['Pretendard Variable']">
            오전
          </div>
          <div className="mt-4 grid grid-cols-4 h-11 justify-start items-start gap-2 inline-flex">
            {['10:00', '10:30', '11:00', '11:30'].map((item) => (
              <TimeItem
                onClick={timeClick}
                time={item}
                selected={item == selectedTime}
              />
            ))}
          </div>
        </div>
        <div className="w-full ">
          <div className="  text-zinc-900 text-base font-bold font-['Pretendard Variable']">
            오후
          </div>
          <div className="mt-4 grid grid-cols-4 h-11 justify-start items-start gap-2 inline-flex">
            {[
              '12:00',
              '12:30',
              '1:00',
              '1:30',
              '2:00',
              '2:30',
              '3:00',
              '3:30',
              '4:00',
              '4:30',
            ].map((item) => (
              <TimeItem
                onClick={timeClick}
                time={item}
                selected={item == selectedTime}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const TimeItem = ({
  time,
  selected,
  onClick,
}: {
  time: string
  selected: boolean
  onClick: Function
}) => {
  return (
    <div
      onClick={() => {
        onClick(time)
      }}
      className={clsx(
        'h-11 p-5  rounded-lg justify-center items-center gap-2.5 inline-flex',
        selected ? 'bg-gradient' : 'bg-neutral-50'
      )}
    >
      <div
        className={clsx(
          " text-base font-medium font-['Pretendard Variable']",
          selected ? 'text-white' : 'text-zinc-900'
        )}
      >
        {time}
      </div>
    </div>
  )
}
