'use client'

import { useState } from 'react'
import IWCalendar from './Calendar'
import moment, { Moment } from 'moment'
import clsx from 'clsx'

export default function ReserveTime({
  setSelectedDate,
  setSelectedTime,
  selectedDate,
  selectedTime,
}: {
  selectedTime: string
  setSelectedTime: (hour: string) => void
  selectedDate: Moment | null
  setSelectedDate: (date: Moment) => void
}) {
  const timeClick = (time: string) => {
    setSelectedTime(time)
  }
  const now = moment()
  return (
    <div className="w-full px-5 flex-col justify-start items-start gap-4 inline-flex">
      <div className="text-zinc-900 text-xl font-bold ">상담 예약</div>
      <IWCalendar
        year={now.year()}
        month={now.month() + 1}
        selectedDate={selectedDate}
        onDateSelect={(date) => {
          setSelectedDate(date)
        }}
      />
      <div className="self-stretch h-72 flex-col justify-start items-start gap-4 flex">
        <div className="w-full h-20 ">
          <div className="  text-zinc-900 text-base font-bold ">오전</div>
          <div className="mt-4 grid grid-cols-4 h-11 justify-start items-start gap-2 inline-flex">
            {['10:00', '10:30', '11:00', '11:30'].map((item) => (
              <TimeItem
                key={item}
                onClick={timeClick}
                time={item}
                selected={item == selectedTime}
              />
            ))}
          </div>
        </div>
        <div className="w-full ">
          <div className="  text-zinc-900 text-base font-bold ">오후</div>
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
                key={item}
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

export const TimeItem = ({
  time,
  selected,
  onClick,
  disabled = false,
}: {
  time: string
  selected: boolean
  onClick: Function,
  disabled?: boolean,
}) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) {
      event.stopPropagation()
      event.preventDefault()
    } else {
      onClick(time)
    }
  }
  return (
    <div
      onClick={handleClick}
      className={clsx(
        'cursor-pointer h-11 p-5  rounded-lg justify-center items-center gap-2.5 inline-flex',
        selected ? 'bg-gradient' : disabled ? 'bg-gray-200' : 'bg-neutral-50'
      )}
    >
      <div
        className={clsx(
          ' text-base font-medium ',
          selected ? 'text-white' : disabled ? 'text-gray-400' : 'text-zinc-900'
        )}
      >
        {time}
      </div>
    </div>
  )
}
