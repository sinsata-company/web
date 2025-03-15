'use client'

import { VaPayDto } from '@/app/api/data'
import { getVasPay } from '@/app/manage/api/mypage'
import { Button, BUTTON_TYPE } from '@/components/common/Button'
import { formatNumberWithCommas } from '@/utils/numberFormatter'
import { useRouter } from 'next/navigation'

import Image from 'next/image'
import { useEffect, useState } from 'react'



export default function Page() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [vas, setVas] = useState<VaPayDto[]>([]);
  const [selectedVa, setSelectedVa] = useState<VaPayDto | null>(null);

  useEffect(() => {
    getVasPay().then((res) => {
      setVas(res)
    })
  }, [])
  return (
    <div className="flex flex-col gap-6">
      {vas.map((va) => {
        return (
          <div 
            key={va.id}
            className="flex w-full justify-between items-center gap-4 p-4 bg-white rounded-md shadow-md"
          >
            <div className="flex gap-4">
              {va.productImage ? (
                <Image
                  src={va.productImage}
                  width={100}
                  height={100}
                  alt={`${va.productImage} 상품 이미지`}
                  className="mr-2 rounded-md"
                />
              ) : (
                <div className="w-[100px] h-[100px] bg-gray-200 mr-2 rounded-md" />
              )}
              <div>
                <div className="font-bold">상품명 : {va.productName}</div>
                <div className="text-sm">
                  가격 : {formatNumberWithCommas(va.price)}원
                </div>
                <div className="text-sm">
                  구매자 닉네임 : {va.nickName}
                </div>
              </div>
            </div>
            <div className="w-24 flex flex-col justify-between items-center">
              <div className="w-24 h-4">
                <Button
                  label="상세보기"
                  onClick={() => {
                    const vaData = encodeURIComponent(JSON.stringify(va));
                    console.log(va);
                    router.push(`/manage/app/my/vapay/detail?vaData=${vaData}`);
                  }}
                  buttonType={BUTTON_TYPE.primarySm}
                />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
