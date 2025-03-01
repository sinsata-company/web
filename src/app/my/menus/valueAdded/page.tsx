'use client'

import { getVaList, VaCustomerDto } from '@/app/api/cash'
import { VaDto } from '@/app/api/data'
import { Button, BUTTON_TYPE } from '@/components/common/Button'
import Modal from '@/components/common/Modal'
import { formatNumberWithCommas } from '@/utils/numberFormatter'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Page() {
  const [isOpen, setIsOpen] = useState(false)
  const [vas, setVas] = useState<VaCustomerDto[]>([])
  useEffect(() => {
    getVaList(0).then((res) => {
      setVas(res.content)
    })
  }, [])
  return (
    <div className="flex flex-col gap-6">
      {vas.map((va) => {
        return (
          <div className="flex w-full justify-between items-center gap-4 p-4 bg-white rounded-md shadow-md">
            <div className="flex gap-4">
              <Image
                src={va.productImage}
                width={100}
                height={100}
                alt="asdf`"
                className="mr-2 rounded-md"
              />
              <div>
                <div className="font-bold">{va.name}</div>
                <div className="text-sm">
                  {formatNumberWithCommas(va.price)}원
                </div>
                <div className="text-sm">
                  판매자 : {va.teacherName.replace('선생님', '')}
                </div>
              </div>
            </div>
            <div className="w-24 flex flex-col justify-between items-center">
              <Image
                src={va.teacherThumbnail}
                width={120}
                height={80}
                alt="asdf`"
              />
              <div className="w-24 h-4">
                <Button
                  label="구매하기"
                  onClick={() => {
                    setIsOpen(true)
                  }}
                  buttonType={BUTTON_TYPE.primarySm}
                />
              </div>
            </div>
            <Modal
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              title="상품 상세"
              content="상품을 구매하시겠습니까? 선생님이 연락 드릴 예정입니다."
            >
              <div className="flex flex-col gap-4">
                <Button
                  label="구매하기"
                  onClick={() => {
                    console.log('구매하기')
                    setIsOpen(false)
                  }}
                  buttonType={BUTTON_TYPE.primary}
                />
                <Button
                  label="취소"
                  onClick={() => {
                    setIsOpen(false)
                  }}
                  buttonType={BUTTON_TYPE.secondary}
                />
              </div>
            </Modal>
          </div>
        )
        {
          /* return <div key={va.id}>{va.price}</div> */
        }
      })}
    </div>
  )
}
