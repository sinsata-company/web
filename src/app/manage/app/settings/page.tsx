'use client'

import { useState, useEffect } from 'react'
import IWCalendar from '@/app/teacher/[id]/reserve/components/Calendar'
import moment, { Moment } from 'moment'
import { useRouter } from 'next/navigation'
import { saveUnavailableTimes, getUnavailableTimes } from '@/app/api/teacher'
import { UnavailableTime } from '@/app/api/data'

export default function Settings(){
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<Moment | null>(moment())
  const [now, setNow] = useState<Moment>(moment())
  const [selectedTimes, setSelectedTimes] = useState<string[]>([])
  const [unavailableTimes, setUnavailableTimes] = useState<UnavailableTime[]>([])
  const [teacherId, setTeacherId] = useState<number>(/* 교사 ID 설정 */)

  // 컴포넌트 마운트 시 오늘 날짜의 예약 불가 시간 로드
  useEffect(() => {
    const fetchUnavailableTimes = async () => {
      try {
        const times = await getUnavailableTimes(moment().format('YYYY-MM-DD'));
        console.log(times)
        setUnavailableTimes(times);
      } catch (error) {
        console.error('Error fetching unavailable times:', error);
      }
    };
    
    fetchUnavailableTimes();
  }, []);

  const timeSlots = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2)
    const minute = i % 2 === 0 ? '00' : '30'
    return `${hour.toString().padStart(2, '0')}:${minute}`
  })

  const onDateSelect = async (date: Moment) => {
    setSelectedDate(date);
    setSelectedTimes([]);
    
    try {
      const times = await getUnavailableTimes(date.format('YYYY-MM-DD'));
      setUnavailableTimes(times); // 직접 API 응답을 저장
    } catch (error) {
      console.error('Error fetching unavailable times:', error);
      alert('예약 정보를 불러오는데 실패했습니다.');
    }
  }

  const toggleTimeSelection = (time: string) => {
    if (selectedDate && isTimeUnavailable(selectedDate, time)) {
      // 불가능한 시간을 선택한 경우, unavailableTimes에서도 제거
      setUnavailableTimes(prev => 
        prev.filter(ut => !(ut.date === selectedDate.format('YYYY-MM-DD') && ut.time === time))
      );
      return;
    }

    // 새로운 시간 토글
    setSelectedTimes(prev => 
      prev.includes(time) 
        ? prev.filter(t => t !== time)
        : [...prev, time]
    );
  };

  const handleRemoveUnavailableTime = async (time: string) => {
    if (!selectedDate) return;

    try {
      const response = await saveUnavailableTimes(selectedDate.format('YYYY-MM-DD'), [time], 'remove');
      if (!response) {
        throw new Error('Failed to remove unavailable time');
      }

      // 성공 시 목록 다시 불러오기
      const updatedTimes = await getUnavailableTimes(selectedDate.format('YYYY-MM-DD'));
      setUnavailableTimes(updatedTimes);
      setSelectedTimes(prev => prev.filter(t => t !== time)); // 선택된 시간에서도 제거
    } catch (error) {
      console.error('Error removing unavailable time:', error);
      alert('상담 불가 시간 해제에 실패했습니다.');
    }
  };

  const isTimeUnavailable = (date: Moment, time: string): boolean => {
    const dateStr = date.format('YYYY-MM-DD')
    return unavailableTimes.some(ut => ut.date === dateStr && ut.time === time)
  }

  const isPastTime = (time: string): boolean => {
    if (!selectedDate) return false;
    
    // 오늘 날짜가 아니면 과거 시간 체크 불필요
    if (!selectedDate.isSame(moment(), 'day')) return false;

    const [hours, minutes] = time.split(':').map(Number)
    const timeToCheck = moment().set({
      hours,
      minutes,
      seconds: 0,
      milliseconds: 0
    })
    return timeToCheck.isBefore(moment())
  }

  const handleSetUnavailable = async () => {
    if (!selectedDate) return;

    try {
      // 현재 선택된 날짜의 모든 불가능 시간
      const currentDateUnavailableTimes = unavailableTimes
        .filter(ut => ut.date === selectedDate.format('YYYY-MM-DD'))
        .map(ut => ut.time);
      
      // 현재 불가능한 시간들과 새로 선택된 시간들을 합침
      const finalTimes = [...new Set([
        ...currentDateUnavailableTimes,
        ...selectedTimes
      ])];

      const response = await saveUnavailableTimes(
        selectedDate.format('YYYY-MM-DD'), finalTimes
      );

      if (!response) {
        throw new Error('Failed to save unavailable times');
      }

      // 저장 후 해당 날짜의 불가능 시간 다시 불러오기
      const updatedTimes = await getUnavailableTimes(selectedDate.format('YYYY-MM-DD'));
      setUnavailableTimes(updatedTimes);
      
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

        <div className="grid grid-cols-1 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">날짜 선택</h2>
            <div className="[&_button]:text-xl [&_td]:text-xl [&_th]:text-xl">
              <IWCalendar
                year={now.year()}
                month={now.month() + 1}
                selectedDate={selectedDate}
                onDateSelect={onDateSelect}
              />
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">시간 선택</h2>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 max-h-[400px] overflow-y-auto p-2">
              {timeSlots.map((time) => {
                const isUnavailable = selectedDate && isTimeUnavailable(selectedDate, time);
                const isPast = isPastTime(time);
                
                return (
                  <button
                    key={time}
                    onClick={() => toggleTimeSelection(time)}
                    disabled={isPast}
                    className={`
                      p-2 rounded-lg text-sm font-medium transition-colors
                      ${isPast 
                        ? 'line-through opacity-50 cursor-not-allowed bg-gray-100 text-gray-400' 
                        : isUnavailable
                          ? 'bg-red-500 text-white hover:bg-red-600'
                          : selectedTimes.includes(time)
                            ? 'bg-blue-500 text-white hover:bg-blue-600'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                      }
                    `}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bg-white border-t border-gray-200 p-4">
          <div className="max-w-7xl mx-auto">
            <button
              onClick={handleSetUnavailable}
              disabled={!selectedDate}
              className={`w-full px-6 py-3 rounded-lg ${
                !selectedDate
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
