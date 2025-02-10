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

export default function TeacherReservePage() {
  const [selectedDate, setSelectedDate] = useState<Moment | null>(null)
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [selectedHour, setSelectedHour] = useState<number>(15)
  const [myCash, setMyCash] = useState<number>(0)
  const [reserveComplete, setReserveComplete] = useState<boolean>(false)

  useEffect(() => {
    getMyCash().then((res) => {
      setMyCash(res)
    })
  }, [])

  const router = useRouter()
  const param = useParams()

  return (
    <div>
      <BackAppbar />
      <div className="py-4">
        <ReserveTime
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
      </div>
      <GreyDivider />
      <RserveHourSelector
        selectedHour={selectedHour}
        setSelectedHour={setSelectedHour}
      />
      <GreyDivider />
      <ReserveCashSummary
        selectedHour={selectedHour}
        myCash={myCash}
        selectedTime={selectedTime}
      />
      <div className="h-6"></div>
      <div className="px-4 py-12">
        <Button
          onClick={async () => {
            const payamt =
              selectedHour == 15 ? 25000 : selectedHour == 30 ? 40000 : 90000
            // if (payamt > myCash) {
            //   router.push('/my/cash')
            //   return
            // }
            const path = param.id
            await makeReserve(
              {
                reserveDate: selectedDate?.format('YYYY-MM-DD') ?? '',
                reserveTime: `${selectedDate?.format(
                  'YYYY-MM-DD'
                )} ${selectedTime.padStart(5, '0')}:00`,
                reserveMinutes: selectedHour,
                reserveType: 'CALL',
              },
              path as string
            )
            setReserveComplete(true)
          }}
          buttonType={BUTTON_TYPE.primary}
          label="예약하기"
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
