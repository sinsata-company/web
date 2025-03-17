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
import { getUnavailableTimes } from '@/app/api/teacher'
import moment from 'moment'
import { UnavailableTime } from '@/app/api/data'

export default function TeacherReservePage() {
  const router = useRouter()
  const param = useParams()
  const [selectedDate, setSelectedDate] = useState<Moment | null>(null)
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [selectedHour, setSelectedHour] = useState<number>(15)
  const [myCash, setMyCash] = useState<number>(0)
  const [type, setType] = useState<string>('')
  const [reserveComplete, setReserveComplete] = useState<boolean>(false)
  const [unavailableTimes, setUnavailableTimes] = useState<UnavailableTime[]>([])
  const [now, setNow] = useState<Moment>(moment())

  useEffect(() => {
    getMyCash().then(setMyCash)
  }, [])

  const onDateSelect = async (date: Moment) => {
    setSelectedDate(date)
    setSelectedTime('')
    
    try {
      const times = await getUnavailableTimes(date.format('YYYY-MM-DD'))
      setUnavailableTimes(times)
    } catch (error) {
      console.error('Error fetching unavailable times:', error)
    }
  }

  const isTimeUnavailable = (date: Moment, time: string): boolean => {
    const dateStr = date.format('YYYY-MM-DD')
    return unavailableTimes.some(ut => ut.date === dateStr && ut.time === time)
  }

  const timeSlots = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2)
    const minute = i % 2 === 0 ? '00' : '30'
    return `${hour.toString().padStart(2, '0')}:${minute}`
  })

  const handleReserve = async () => {
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
      }, param.id as string)
      
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
            />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">시간 선택</h2>
          <div className="h-[400px] overflow-y-auto">
            <div className="grid grid-cols-4 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  disabled={selectedDate && isTimeUnavailable(selectedDate, time)}
                  className={`p-2 rounded ${
                    selectedDate && isTimeUnavailable(selectedDate, time)
                      ? 'bg-gray-300 cursor-not-allowed'
                      : selectedTime === time
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

      <GreyDivider />
      <RserveHourSelector
        selectedHour={selectedHour}
        setSelectedHour={setSelectedHour}
      />
      <GreyDivider />
      <ReserveTypeSelector selectedType={type} setSelectedType={setType} />
      <GreyDivider />

      <ReserveCashSummary
        selectedHour={selectedHour}
        myCash={myCash}
        selectedTime={selectedTime}
      />
      <div className="h-6"></div>
      <div className="px-4 py-12">
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
