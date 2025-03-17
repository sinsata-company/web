'use client'

import { useState } from 'react'
import IWCalendar from '@/app/teacher/[id]/reserve/components/Calendar'
import moment, { Moment } from 'moment'
import { useRouter } from 'next/navigation'
import { saveUnavailableTimes } from '@/app/api/teacher'

interface UnavailableTime {
  date: string;
  times: string[];
}

export default function Settings(){
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<Moment | null>(null)
  const [now, setNow] = useState<Moment>(moment())
  const [selectedTimes, setSelectedTimes] = useState<string[]>([])
  const [unavailableTimes, setUnavailableTimes] = useState<UnavailableTime[]>([])
  const [teacherId, setTeacherId] = useState<number>(/* 교사 ID 설정 */)

  const timeSlots = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2)
    const minute = i % 2 === 0 ? '00' : '30'
    return `${hour.toString().padStart(2, '0')}:${minute}`
  })

  const onDateSelect = (date: Moment) => {
    setSelectedDate(date)
    setSelectedTimes([])
  }

  const toggleTimeSelection = (time: string) => {
    setSelectedTimes(prev => 
      prev.includes(time) 
        ? prev.filter(t => t !== time)
        : [...prev, time]
    )
  }

  const isTimeUnavailable = (date: Moment, time: string): boolean => {
    const dateStr = date.format('YYYY-MM-DD')
    const unavailableDate = unavailableTimes.find(ut => ut.date === dateStr)
    return unavailableDate?.times.includes(time) ?? false
  }

  const handleSetUnavailable = async () => {
    if (!selectedDate || selectedTimes.length === 0) return;

    try {
      const response = await saveUnavailableTimes(selectedDate.format('YYYY-MM-DD'), selectedTimes)
      if (!response) {
        throw new Error('Failed to save unavailable times');
      }
   
      // 성공 처리
      alert('상담 불가 시간이 설정되었습니다.');
      setSelectedTimes([]);
    } catch (error) {
      console.error('Error saving unavailable times:', error);
      alert('상담 불가 시간 설정에 실패했습니다.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 p-5">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">상담 시간 설정</h1>
          <button
            onClick={() => router.back()}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
          >
            뒤로가기
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">날짜 선택</h2>
            <IWCalendar
              year={now.year()}
              month={now.month() + 1}
              selectedDate={selectedDate}
              onDateSelect={onDateSelect}
            />
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">시간 선택</h2>
            <div className="h-[400px] overflow-y-auto">
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => toggleTimeSelection(time)}
                    className={`p-2 rounded ${
                      selectedDate && isTimeUnavailable(selectedDate, time)
                        ? 'bg-red-500 text-white cursor-not-allowed'
                        : selectedTimes.includes(time)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                    disabled={selectedDate && isTimeUnavailable(selectedDate, time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border-t border-gray-200 p-4">
          <div className="max-w-7xl mx-auto">
            <button
              onClick={handleSetUnavailable}
              disabled={!selectedDate || selectedTimes.length === 0}
              className={`w-full px-6 py-3 rounded-lg ${
                !selectedDate || selectedTimes.length === 0
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-red-500 hover:bg-red-600 text-white'
              }`}
            >
              상담불가 설정
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
