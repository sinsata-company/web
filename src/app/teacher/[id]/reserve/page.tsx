'use client'

import BackAppbar from '@/components/common/BackAppbar'
import ReserveTime from './components/ReserveTimeSelector'
import { GreyDivider } from '@/components/common/Divider'
import RserveHourSelector from './components/ReserveHourSelector'
import ReserveCashSummary from './components/ReserveCashSummary'
import { Button, BUTTON_TYPE } from '@/components/common/Button'
import { useEffect, useState } from 'react'
import { Moment } from 'moment'
import { getMyCash } from '@/app/api/cash'
import { useParams, useRouter } from 'next/navigation'
import { makeReserve } from '@/app/api/reserve'
import Modal from '@/components/common/Modal'
import ReserveTypeSelector from './components/ReserveTypeSelector'
import IWCalendar from '@/app/teacher/[id]/reserve/components/Calendar'
import { getTeacherDetail, getUnavailableTimesForUser } from '@/app/api/teacher'
import moment from 'moment'
import { UnavailableTime } from '@/app/api/data'
import TimeSelect from './components/TimeSelect'
import Agreement from './components/Agreement'
import { useQuery } from '@tanstack/react-query'

export default function TeacherReservePage() {
  const router = useRouter()
  const params = useParams()
  const teacherId = params.id as string
  const { data: teacher } = useQuery({
    queryKey: ['teacher', teacherId],
    queryFn: () => getTeacherDetail(teacherId),
    enabled: !!teacherId,
  });

  const chatable = teacher?.canChat || false;

  const [selectedDate, setSelectedDate] = useState<Moment | null>(null)
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [selectedHour, setSelectedHour] = useState<number>(15)
  const [myCash, setMyCash] = useState<number>(0)
  const [type, setType] = useState<string>('')
  const [reserveComplete, setReserveComplete] = useState<boolean>(false)
  const [unavailableTimes, setUnavailableTimes] = useState<UnavailableTime[]>([])
  const [now, setNow] = useState<Moment>(moment())
  const [agreementChecked, setAgreementChecked] = useState<boolean>(false)

  useEffect(() => {
    getMyCash().then(setMyCash)
  }, [])

  const onDateSelect = async (date: Moment) => {
    setSelectedDate(date)
    setSelectedTime('')
    
    try {
      const times = await getUnavailableTimesForUser(teacherId, date.format('YYYY-MM-DD'))
      console.log('times : ' + times);
      setUnavailableTimes(times)
    } catch (error) {
      console.error('Error fetching unavailable times:', error)
    }
  }

  const isTimeUnavailable = (date: Moment | null, time: string): boolean => {
    if (!date) return false;
    const dateStr = date.format('YYYY-MM-DD')
    
    return unavailableTimes.some(ut => ut.date === dateStr && ut.time === time)
  }

  const timeSlots = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2)
    const minute = i % 2 === 0 ? '00' : '30'
    return `${hour.toString().padStart(2, '0')}:${minute}`
  })

  const handleReserve = async () => {
    if (!agreementChecked) {
      alert('예약 취소 정책에 동의해주세요.')
      return
    }

    if (!selectedDate || !selectedTime) return

    const payamt = selectedHour === 15 ? 25000 : selectedHour === 30 ? 40000 : 90000
    if (payamt > myCash) {
      router.push('/my/cash')
      return
    }

    try {
      await makeReserve({
        reserveDate: selectedDate.format('YYYY-MM-DD'),
        reserveTime: `${selectedDate.format('YYYY-MM-DD')} ${selectedTime}:00`,
        reserveMinutes: selectedHour,
        reserveType: type === '전화' ? 'CALL' : 'CHAT',
      }, teacherId)
      
      setReserveComplete(true)
    } catch (error) {
      console.error('Error making reservation:', error)
      alert('예약에 실패했습니다.')
    }
  }

  return (
    <div>
      <BackAppbar />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">날짜 선택</h2>
          <div className="[&_button]:text-2xl [&_td]:text-2xl [&_th]:text-2xl">
            <IWCalendar
              year={now.year()}
              month={now.month() + 1}
              selectedDate={selectedDate}
              onDateSelect={onDateSelect}
              disablePastDates={true}
              minDate={now.startOf('day')}
            />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">시간 선택</h2>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-[400px] overflow-y-auto p-2">
            {timeSlots.map((time) => {
              const isUnavailable = selectedDate && isTimeUnavailable(selectedDate, time);
              const isPastTime = selectedDate?.isSame(moment(), 'day') && 
                moment(time, 'HH:mm').isBefore(moment());
              const isDisabled = isUnavailable || isPastTime;
              
              return (
                <button
                  key={time}
                  onClick={() => !isDisabled && setSelectedTime(time)}
                  disabled={isDisabled}
                  className={`
                    p-3 rounded-lg text-sm font-medium transition-colors
                    ${isDisabled
                      ? 'line-through opacity-50 bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : time === selectedTime
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
          {selectedDate && (
            <div className="mt-4 text-sm text-gray-500">
              <p>• 취소선이 있는 시간은 선택할 수 없는 시간입니다.</p>
              <p>• 오늘 날짜의 경우 현재 시간 이전은 선택할 수 없습니다.</p>
            </div>
          )}
        </div>
      </div>

      <GreyDivider />
      <RserveHourSelector
        selectedHour={selectedHour}
        setSelectedHour={setSelectedHour}
      />
      <GreyDivider />
      <ReserveTypeSelector selectedType={type} setSelectedType={setType} chatable={chatable} />
      {!chatable && (
        <div className="mt-1 w-full flex justify-end px-5">
          <span className="text-gray-400 text-sm">* 해당 선생님은 전화 상담만 진행하실 수 있습니다.</span>
        </div>
      )}
      <GreyDivider />
      <ReserveCashSummary
        selectedHour={selectedHour}
        myCash={myCash}
        selectedTime={selectedTime}
      />
      <GreyDivider />
      <Agreement 
        isChecked={agreementChecked}
        onCheckedChange={setAgreementChecked}
      />
      <GreyDivider />
      <div className="px-4 py-4">
        <Button
          onClick={handleReserve}
          buttonType={BUTTON_TYPE.primary}
          label={
            (selectedHour === 15 ? 25000 : selectedHour === 30 ? 40000 : 90000) > myCash
              ? '캐시 충전하러 가기'
              : '예약하기'
          }
        />
      </div>
      <Modal
        isOpen={reserveComplete}
        onClose={() => {
          setReserveComplete(false)
          router.push('/my')
        }}
        title="예약 완료"
        content="예약이 완료되었습니다."
      >
        <div className="flex justify-end items-center gap-4">
          <Button
            onClick={() => {
              setReserveComplete(false)
              router.push('/my')
            }}
            buttonType={BUTTON_TYPE.primary}
            label="확인"
          />
        </div>
      </Modal>
    </div>
  )
}
