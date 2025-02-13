'use client'

import clsx from 'clsx'
import { useEffect, useState } from 'react'
import Input from '@/components/common/Input'
import Modal from '@/components/common/Modal'
import { Button, BUTTON_TYPE } from '@/components/common/Button'
import { getChargeHistory } from '@/app/api/cash'
import { CashHistoryDto, ReserveDto, TeacherListDto } from '@/app/api/data'
import ChargeHistoryItem from './ChargeHistoryItem'
import { myReserves } from '@/app/api/reserve'
import ReserveItem from './ReserveItem'
import moment from 'moment'

export default function MyTabContainer() {
  const [tab, setTab] = useState<number>(0)
  const [coupon, setCoupon] = useState<string>('')
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [histories, setHistories] = useState<CashHistoryDto[]>([])
  const [myPayHistory, setMyPayHistory] = useState<ReserveDto[]>([])
  const [showReserveModal, setShowReserveModal] = useState<boolean>(false)
  const [selectedReserve, setSelectedReserve] = useState<ReserveDto | null>(
    null
  )

  const selectTab = (idx: number) => {
    setTab(idx)
  }

  const onClickReservation = (teachers: ReserveDto) => {
    console.log('예약하기')
    setSelectedReserve(teachers)
    setShowReserveModal(true)
  }

  useEffect(() => {
    getChargeHistory().then((res) => {
      if (Array.isArray(res)) {
        setHistories(res)
      } else {
        console.error('Expected an array of CashHistoryDto')
      }
    })
    myReserves().then((res) => {
      if (Array.isArray(res)) {
        setMyPayHistory(res)
      } else {
        console.error('Expected an array of ReserveDto')
      }
    })
  }, [])

  return (
    <div>
      <div className=" w-full h-7 flex-col justify-start items-start gap-2.5 inline-flex">
        <div className="w-full grid grid-cols-3">
          <MyTabItem
            onClick={selectTab}
            label="캐시 내역"
            selected={tab == 0}
            idx={0}
          />
          <MyTabItem
            onClick={selectTab}
            label="나의 이용권 내역"
            selected={tab == 1}
            idx={1}
          />
          <MyTabItem
            onClick={selectTab}
            label="쿠폰 등록"
            selected={tab == 2}
            idx={2}
          />
        </div>
      </div>
      <div className="h-4"></div>
      <div className="w-full h-96 px-5 flex-col justify-start items-start gap-4 inline-flex">
        <div className="text-zinc-900 text-xl font-bold font-['Pretendard Variable']">
          {tab == 0 ? '캐시내역' : tab == 1 ? '나의 예약' : '쿠폰 등록'}
        </div>
        {tab == 0 && (
          <>
            {histories.map((history, idx) => {
              if (history.createdAt) {
                return <ChargeHistoryItem key={idx} {...history} />
              }
            })}
          </>
        )}
        {tab == 1 && (
          <>
            {myPayHistory.map((history, idx) => {
              return (
                <ReserveItem
                  {...history}
                  onClick={onClickReservation}
                  key={idx}
                />
              )
            })}
          </>
        )}
        {tab == 2 && (
          <Input
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            useSuffix
            placeholder="쿠폰 코드를 입력해주세요."
            onClickSuffix={() => {
              setCoupon('')
              setOpenModal(true)
            }}
          />
        )}
      </div>
      <Modal
        isOpen={openModal}
        title="등록 실패"
        content="쿠폰 등록에 실패하였습니다. 유효한 쿠폰 번호인지 확인해주세요."
        onClose={() => setOpenModal(false)}
      >
        <Button
          buttonType={BUTTON_TYPE.primary}
          label="확인"
          onClick={() => setOpenModal(false)}
        />
      </Modal>
      <Modal
        isOpen={showReserveModal ?? false}
        onClose={() => {
          setShowReserveModal && setShowReserveModal(false)
        }}
        title="선불 상담 안내"
        content={`${moment(selectedReserve?.startAt).format(
          'yyyy-MM-DD hh:mm'
        )}부터 상담이 시작됩니다. 30분 전부터 상담 버튼이 팝업에 생성됩니다.`}
      >
        <div className="inline-flex flex-col gap-2 w-full">
          {moment(selectedReserve?.startAt)
            .subtract(30, 'minutes')
            .isBefore(moment()) && (
            <Button
              label="상담 시작"
              buttonType={BUTTON_TYPE.primary}
              onClick={() => {
                // 상담 시작 로직을 여기에 추가하세요
              }}
            />
          )}
          <Button
            label="닫기"
            buttonType={BUTTON_TYPE.secondary}
            onClick={() => {
              setShowReserveModal(false)
              setSelectedReserve(null)
            }}
          />
        </div>
      </Modal>
    </div>
  )
}

const MyTabItem = ({
  label,
  selected,
  onClick,
  idx,
}: {
  label: string
  selected: boolean
  onClick: Function
  idx: number

  showReserveModal?: boolean
  setShowReserveModal?: Function
}) => {
  return (
    <div
      onClick={() => {
        onClick(idx)
      }}
      className="cursor-pointer"
    >
      <div
        className={clsx(
          "grow shrink basis-0 text-center  text-sm font-bold font-['Pretendard Variable']",
          selected ? 'text-yellow-400' : 'text-zinc-400'
        )}
      >
        {label}
      </div>
      <div
        className="self-stretch h-0.5"
        style={{
          marginTop: 10,
        }}
      >
        <div
          className={clsx(
            'w-full h-px  rounded-full',
            selected ? 'bg-gradient' : 'bg-zinc-100'
          )}
        />
      </div>
    </div>
  )
}
