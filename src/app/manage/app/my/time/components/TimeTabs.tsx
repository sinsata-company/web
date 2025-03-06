'use client'

import clsx from 'clsx'
import { useEffect, useState } from 'react'
import TimeProductItem from './TimeProductItem'
import { Button, BUTTON_TYPE } from '@/components/common/Button'
import { InfoItem } from '../../hashtag/page'
import { GreyDivider } from '@/components/common/Divider'
import Modal from '@/components/common/Modal'
import Input from '@/components/common/Input'
import {
  getMenu,
  updateMenu,
} from '@/app/manage/api/mypage'

// 임시 스텁
const getMenuPrepay = async () => {
  return Promise.resolve({ chatPrepay: 1400, callPrePay: 1000 })
}
const updatePrepay = async (data: { chatPrepay: number; callPrePay: number }) => {
  console.log('updatePrepay called with', data)
  return Promise.resolve(data)
}

export interface MenuItemProps {
  id: number;
  type: 'chat' | 'phone';
  minute: number;
  method: 'direct' | 'cash';
  price: number;
  unit?: 'minute' | 'second'; // 추가!
}


const initialMenu: MenuItemProps[] = [
  { id: 1, type: 'chat',  minute: 15, method: 'cash',   price: 25000 },
  { id: 2, type: 'chat',  minute: 30, method: 'cash',   price: 40000 },
  { id: 3, type: 'chat',  minute: 60, method: 'cash',   price: 90000 },
  { id: 4, type: 'phone', minute: 15, method: 'cash',   price: 25000 },
  { id: 5, type: 'phone', minute: 30, method: 'cash',   price: 40000 },
  { id: 6, type: 'phone', minute: 60, method: 'cash',   price: 90000 },
]

export default function TimeTabs() {
  const [tab, setTab] = useState<number>(0)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showPrepay, setShowPrepay] = useState<boolean>(false)
  const [menu, setMenu] = useState<MenuItemProps[]>(initialMenu)
  const [selectedMenu, setSelectedMenu] = useState<MenuItemProps | null>(null)
  const [prepay, setPrepay] = useState<{ chat: number; phone: number }>({
    chat: 1400,
    phone: 1000,
  })

  const selectTab = (idx: number) => {
    setTab(idx)
  }

  const updateMenuList = () => {
    if (!selectedMenu) return
    const newMenu = menu.map((m) =>
      m.id === selectedMenu.id
        ? { ...m, price: selectedMenu.price, minute: selectedMenu.minute }
        : m
    )
    setMenu(newMenu)
    updateMenu(JSON.stringify(newMenu))
  }

  const onClickMenu = (menu: MenuItemProps) => {
    setSelectedMenu(menu)
    setShowModal(true)
  }

  useEffect(() => {
    getMenu('menu').then((res) => {
      // 예시: res가 배열 형태로 넘어온다고 가정
      if (Array.isArray(res) && res.length === 6) {
        setMenu(res)
      }
    })
    getMenuPrepay().then((res) => {
      if (res.chatPrepay && res.callPrePay) {
        setPrepay({
          chat: res.chatPrepay,
          phone: res.callPrePay,
        })
      }
    })
  }, [])

  return (
    <div>
      {/* 상단 탭 */}
      <div className="w-full h-7 flex-col justify-start items-start gap-2.5 inline-flex">
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
            selected={tab === 0}
            idx={0}
          />
          <MyTabItem
            onClick={selectTab}
            label="전화 상담"
            selected={tab === 1}
            idx={1}
          />
        </div>
      </div>
      <div className="h-4"></div>

      {/* 실제 내용 */}
      <div className="w-full flex-col justify-start items-start gap-4 inline-flex mb-12">
        {tab === 0 && (
          <>
<TimeProductItem
  type="chat"
  minute={30}
  method="cash"
  price={prepay.chat}
  id={11}
  unit="second"  // 명확히 초 단위로 지정!
  onClick={() => setShowPrepay(true)}
/>
            <GreyDivider />

            {/* 나머지 채팅 상담 메뉴 (기존) */}
            {menu.map((m) => {
              if (m.type === 'chat') {
                return (
                  <TimeProductItem key={m.id} {...m} onClick={onClickMenu} />
                )
              }
            })}
          </>
        )}

{tab === 1 && (
  <>
    {/* 전화 상담 탭 - 첫 번째 항목: 30초 전화 상담 [후불] */}
    <TimeProductItem
      type="phone"
      minute={30}
      method="direct"
      price={1400}
      id={9}
      unit="second" // 정확히 초 단위로 명시
      onClick={(t) => console.log(t)}
    />

    {/* 전화 상담 탭 - 두 번째 항목: 30초 전화 상담 [선불] */}
    <TimeProductItem
      type="phone"
      minute={30}
      method="cash"
      price={prepay.phone}
      id={10}
      unit="second" // 정확히 초 단위로 명시
      onClick={() => setShowPrepay(true)}
    />

    <GreyDivider />

            {/* 나머지 전화 상담 메뉴 (기존) */}
            {menu.map((m) => {
              if (m.type === 'phone') {
                return (
                  <TimeProductItem key={m.id} {...m} onClick={onClickMenu} />
                )
              }
            })}
          </>
        )}
      </div>

      {/* 아래는 모달 관련 로직 (상품 수정, 선불결제 수정 등) */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="상품 목록 수정"
        content="선택하신 상품의 가격을 수정하시고 수정하기 버튼을 눌러주세요."
      >
        <Input
          type="number"
          value={selectedMenu?.minute.toString() ?? ''}
          onChange={(e) => {
            setSelectedMenu((prev) =>
              prev ? { ...prev, minute: Number(e.target.value) || 0 } : null
            )
          }}
          name="단위 시간(분)"
        />
        <Input
          type="number"
          value={selectedMenu?.price.toString() ?? ''}
          onChange={(e) => {
            setSelectedMenu((prev) =>
              prev ? { ...prev, price: Number(e.target.value) || 0 } : null
            )
          }}
          name="단위 금액(원)"
        />
        <div className="h-4"></div>
        <div className="flex flex-col gap-2">
          <Button
            buttonType={BUTTON_TYPE.primary}
            label="수정하기"
            onClick={() => {
              updateMenuList()
              setSelectedMenu(null)
              setShowModal(false)
            }}
          />
          <Button
            buttonType={BUTTON_TYPE.secondary}
            label="닫기"
            onClick={() => {
              setSelectedMenu(null)
              setShowModal(false)
            }}
          />
        </div>
      </Modal>

      <Modal
        isOpen={showPrepay}
        onClose={() => setShowPrepay(false)}
        title="선불 결제 금액 수정"
        content="선불 결제 금액을 수정하시고 수정하기 버튼을 눌러주세요."
      >
        <Input
          type="number"
          value={prepay.chat.toString()}
          onChange={(e) => {
            setPrepay((prev) => ({ ...prev, chat: Number(e.target.value) }))
          }}
          name="채팅 상담 선불 결제 금액(원)"
        />
        <Input
          type="number"
          value={prepay.phone.toString()}
          onChange={(e) => {
            setPrepay((prev) => ({ ...prev, phone: Number(e.target.value) }))
          }}
          name="전화 상담 선불 결제 금액(원)"
        />
        <div className="h-4"></div>
        <div className="flex flex-col gap-2">
          <Button
            buttonType={BUTTON_TYPE.primary}
            label="수정하기"
            onClick={() => {
              updatePrepay({
                chatPrepay: prepay.chat,
                callPrePay: prepay.phone,
              })
              setSelectedMenu(null)
              setShowPrepay(false)
            }}
          />
          <Button
            buttonType={BUTTON_TYPE.secondary}
            label="닫기"
            onClick={() => {
              setSelectedMenu(null)
              setShowPrepay(false)
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
}) => {
  return (
    <div
      onClick={() => {
        onClick(idx)
      }}
    >
      <div
        className={clsx(
          'cursor-pointer grow shrink basis-0 text-center text-sm font-bold',
          selected ? 'text-black' : 'text-zinc-400'
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
            'w-full h-px rounded-full',
            selected ? 'bg-gradient' : 'bg-zinc-100'
          )}
        />
      </div>
    </div>
  )
}
