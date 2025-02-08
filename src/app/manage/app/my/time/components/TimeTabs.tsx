'use client'

import clsx from 'clsx'
import { useState } from 'react'
import TimeProductItem from './TimeProductItem'
import { Button, BUTTON_TYPE } from '@/components/common/Button'

export interface MenuItemProps {
  label: string
  type: 'chat' | 'phone'
  minute: number
  method: 'direct' | 'cash'
  price: number
}

export default function TimeTabs() {
  const [tab, setTab] = useState<number>(0)
  const selectTab = (idx: number) => {
    setTab(idx)
  }

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
            <TimeProductItem />
            <TimeProductItem />
          </>
        )}
        {tab == 1 && (
          <>
            <TimeProductItem />
            <TimeProductItem />
          </>
        )}
      </div>
      <Button buttonType={BUTTON_TYPE.primary} label="추가하기" />
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
