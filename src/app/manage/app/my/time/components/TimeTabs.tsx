'use client'

import clsx from 'clsx'
import { useEffect, useState } from 'react'
import TimeProductItem from './TimeProductItem'
import { Button, BUTTON_TYPE } from '@/components/common/Button'
import { InfoItem } from '../../hashtag/page'
import { GreyDivider } from '@/components/common/Divider'
import Modal from '@/components/common/Modal'
import Input from '@/components/common/Input'
import { getMenu, updateMenu } from '@/app/manage/api/mypage'

export interface MenuItemProps {
  id: number

  type: 'chat' | 'phone'
  minute: number
  method: 'direct' | 'cash'
  price: number
}

const initialMenu: MenuItemProps[] = [
  {
    id: 1,

    type: 'chat',
    minute: 15,
    method: 'cash',
    price: 25000,
  },
  {
    id: 2,

    type: 'chat',
    minute: 30,
    method: 'cash',
    price: 40000,
  },
  {
    id: 3,

    type: 'chat',
    minute: 60,
    method: 'cash',
    price: 90000,
  },
  {
    id: 4,

    type: 'phone',
    minute: 15,
    method: 'cash',
    price: 25000,
  },
  {
    id: 5,

    type: 'phone',
    minute: 30,
    method: 'cash',
    price: 40000,
  },
  {
    id: 6,

    type: 'phone',
    minute: 60,
    method: 'cash',
    price: 90000,
  },
]

export default function TimeTabs() {
  const [tab, setTab] = useState<number>(0)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [menu, setMenu] = useState<MenuItemProps[]>(initialMenu)
  const [selectedMenu, setSelectedMenu] = useState<MenuItemProps | null>(null)

  const selectTab = (idx: number) => {
    setTab(idx)
  }

  const updateMenuList = () => {
    if (!selectedMenu) return
    const newMenu = menu.map((m) =>
      m.id == selectedMenu.id
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
      console.log(typeof res == 'object')
      if (res.length != 6) {
        return
      } else {
        setMenu(res)
      }
    })
  }, [])

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
            {menu.map((m, idx) => {
              if (m.type == 'chat') {
                return (
                  <TimeProductItem onClick={onClickMenu} key={m.id} {...m} />
                )
              }
            })}
          </>
        )}
        {tab == 1 && (
          <>
            <TimeProductItem
              type="phone"
              minute={30}
              method="direct"
              price={1400}
              id={9}
              onClick={(t) => console.log(t)}
            />
            <GreyDivider />
            {menu.map((m, idx) => {
              if (m.type == 'phone') {
                return (
                  <TimeProductItem {...m} key={m.id} onClick={onClickMenu} />
                )
              }
            })}
          </>
        )}
      </div>
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
              prev ? { ...prev, minute: Number(e.target.value) ?? 0 } : null
            )
          }}
          name="단위 시간(분)"
        />
        <Input
          type="number"
          value={selectedMenu?.price.toString() ?? ''}
          onChange={(e) => {
            setSelectedMenu((prev) =>
              prev ? { ...prev, price: Number(e.target.value) ?? 0 } : null
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
