import React, { useState } from 'react'
import moment, { Moment } from 'moment'
import 'moment/locale/ko' // 한글 로케일을 불러옵니다.
import './Calendar.css'

moment.locale('ko') // moment.js에 한글 로케일을 적용합니다.

interface CalendarProps {
  year: number
  month: number
  selectedDate: Moment | null // 선택된 시작 날짜
  onDateSelect: (date: Moment) => void // 날짜 선택 이벤트
}

export default function IWCalendar({
  month,
  year,
  selectedDate,
  onDateSelect,
}: CalendarProps) {
  // 현재 날짜 상태
  const [currentDate, setCurrentDate] = useState(
    moment(`${year}-${month}`, 'YYYY-MM')
  )

  // 현재 월의 시작 날짜와 끝 날짜
  const startOfMonth = currentDate.clone().startOf('month')
  const endOfMonth = currentDate.clone().endOf('month')

  // 주의 시작 (월요일 기준으로 설정)
  const startOfCalendar = startOfMonth.clone().startOf('week')
  const endOfCalendar = endOfMonth.clone().endOf('week').add(1)

  // 달력 데이터를 만들기
  const calendar = []
  let date = startOfCalendar.clone()

  while (date.isBefore(endOfCalendar, 'day')) {
    calendar.push(date.clone())
    date.add(1, 'day')
  }

  const isPastDate = (date: moment.Moment) => {
    return date.isBefore(moment(), 'day')
  }

  return (
    <div
      className="py-5 w-full"
      style={{ margin: 'auto', textAlign: 'center' }}
    >
      <div className="pb-3.5 text-center text-black text-sm font-semibold font-['Montserrat'] leading-tight">
        {year}년 {month}월
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '5px',
        }}
      >
        {/* 요일 헤더 */}
        {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
          <div
            key={day}
            style={{ fontWeight: 'bold' }}
            className="h-5 text-center text-xs leading-none"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="my-3.5 h-px border-stone-300 border-b"></div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
        }}
      >
        {/* 날짜 렌더링 */}
        {calendar.map((day, index) => (
          <div
            key={index}
            style={{
              margin: '5px 0px',
            }}
            onClick={() => !isPastDate(day) && onDateSelect(day)} // 날짜 선택 이벤트 트리거
            className={`${
              day.isSame(currentDate, 'month')
                ? 'text-black'
                : 'text-neutral-400 '
            }  ${isPastDate(day) && 'line-through '}
            
             h-5 text-center text-xs font-medium font-montserrat leading-none cursor-pointer flex items-center justify-center`}
          >
            <span
              className={`
                ${
                  day.isSame(selectedDate, 'day')
                    ? 'w-5 h-full bg-gradient rounded-full flex items-center justify-center text-white' // 시작일과 종료일 색상
                    : ''
                }`}
            >
              {day.date()}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
