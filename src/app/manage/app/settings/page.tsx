'use client'

import { useState, useEffect } from 'react'
import IWCalendar from '@/app/teacher/[id]/reserve/components/Calendar'
import moment, { Moment } from 'moment'
import { useRouter } from 'next/navigation'
import { saveUnavailableTimes, getUnavailableTimes } from '@/app/api/teacher'
import { UnavailableTimeResponse } from '@/app/api/data'
import { toast } from 'react-hot-toast'

interface UnavailableTime {
  id: number;
  teacherId: number;
  date: string;
  time: string;
}

export default function Settings(){
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<Moment | null>(moment())
  const [now, setNow] = useState<Moment>(moment())
  const [selectedTimes, setSelectedTimes] = useState<string[]>([])
  const [unavailableTimes, setUnavailableTimes] = useState<{ [key: string]: string[] }>({})
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
    if (!selectedDate) return;

    // 이미 불가능한 시간인 경우, 해당 시간을 제거
    if (isTimeUnavailable(selectedDate, time)) {
      const dateKey = selectedDate.format('YYYY-MM-DD');
      const updatedTimes = unavailableTimes[dateKey]?.filter(t => t !== time) || [];
      
      setUnavailableTimes(prev => ({
        ...prev,
        [dateKey]: updatedTimes
      }));
      return;
    }

    // 새로운 시간 토글
    setSelectedTimes(prev => 
      prev.includes(time) 
        ? prev.filter(t => t !== time)
        : [...prev, time]
    );
  };

  const handleSetUnavailableTimes = async () => {
    if (!selectedDate) return;

    const dateKey = selectedDate.format('YYYY-MM-DD');
    
    try {
      // 현재 UI에서 선택된 시간만 전송
      const response = await fetch('/api/unavailable-times', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: dateKey,
          times: selectedTimes,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to set unavailable times');
      }

      // 성공적으로 설정되면 unavailableTimes 상태 업데이트
      setUnavailableTimes(prev => ({
        ...prev,
        [dateKey]: selectedTimes
      }));
      
      // 선택된 시간 초기화
      setSelectedTimes([]);
      
      toast.success('상담불가 시간이 설정되었습니다.');
    } catch (error) {
      console.error('Error setting unavailable times:', error);
      toast.error('상담불가 시간 설정에 실패했습니다.');
    }
  };

  const isTimeUnavailable = (date: Moment, time: string) => {
    const dateKey = date.format('YYYY-MM-DD');
    return unavailableTimes[dateKey]?.includes(time) || false;
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
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : selectedTimes.includes(time)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
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
              onClick={handleSetUnavailableTimes}
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
