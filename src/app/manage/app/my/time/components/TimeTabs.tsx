'use client'

import clsx from 'clsx'
import { useEffect, useState } from 'react'
import TimeProductItem from './TimeProductItem'
import { Button, BUTTON_TYPE } from '@/components/common/Button'
import { InfoItem } from '../../hashtag/page'
import { GreyDivider } from '@/components/common/Divider'
import Modal from '@/components/common/Modal'
import Input from '@/components/common/Input'

export interface MenuItemProps {
  label: string
  type: 'chat' | 'phone'
  minute: number
  method: 'direct' | 'cash'
  price: number
}

export default function TimeTabs() {
  const [tab, setTab] = useState<number>(0)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [unitPrice, setUnitPrice] = useState<number>(1400)
  const [unitTime, setUnitTime] = useState<number>(10)
  const selectTab = (idx: number) => {
    setTab(idx)
  }

  useEffect(() => {}, [])

  return (
    <div>
      <div className=" w-full h-7 flex-col justify-start items-start gap-2.5 inline-flex">
        <div
          className="w-full grid grid-cols-2"
          style={{
            marginLeft: -20,
            marginRight: -20,
            width: 'calc(100% + 40px)',
          }}
        >
          <MyTabItem
            onClick={selectTab}
            label="채팅 상담"
            selected={tab == 0}
            idx={0}
          />
          <MyTabItem
            onClick={selectTab}
            label="전화 상담"
            selected={tab == 1}
            idx={1}
          />
        </div>
      </div>
      <div className="h-4"></div>
      <div className="w-full  flex-col justify-start items-start gap-4 inline-flex mb-12">
        {tab == 0 && (
          <>
            <TimeProductItem
              price={25000}
              label="15분 채팅 상담"
              type="chat"
              minute={10}
              method="cash"
            />
            <TimeProductItem
              price={40000}
              label="30분 채팅 상담"
              type="chat"
              minute={10}
              method="cash"
            />
            <TimeProductItem
              price={90000}
              label="60분 채팅 상담"
              type="chat"
              minute={10}
              method="cash"
            />
          </>
        )}
        {tab == 1 && (
          <>
            <TimeProductItem
              label="10초 당 단위금액"
              type="phone"
              minute={10}
              method="direct"
              price={1400}
            />
            <Button
              buttonType={BUTTON_TYPE.primary}
              label="후불 시간 수정하기"
              onClick={() => setShowModal(true)}
            />
            <GreyDivider />
            <TimeProductItem
              price={25000}
              label="15분 채팅 상담"
              type="chat"
              minute={10}
              method="cash"
            />
            <TimeProductItem
              price={40000}
              label="30분 채팅 상담"
              type="chat"
              minute={10}
              method="cash"
            />
            <TimeProductItem
              price={90000}
              label="60분 채팅 상담"
              type="chat"
              minute={10}
              method="cash"
            />
          </>
        )}
      </div>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="후불 시간 수정"
        content="후불 시간 수정을 10초 당 금액을 수정하신 후 확인을 눌러주세요."
      >
        <Input
          value={unitPrice.toString()}
          onChange={(e) => setUnitPrice(Number(e.target.value))}
          name="10초 당 금액(원)"
        />
        <div className="h-4"></div>
        <Button buttonType={BUTTON_TYPE.primary} label="수정하기" />
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
}) => {
  return (
    <div
      onClick={() => {
        onClick(idx)
      }}
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
