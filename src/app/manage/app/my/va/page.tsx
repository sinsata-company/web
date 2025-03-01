'use client'

import { VaDto } from '@/app/api/data'
import { getVas } from '@/app/manage/api/mypage'
import BackAppbar from '@/components/common/BackAppbar'
import { Button, BUTTON_TYPE } from '@/components/common/Button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Page() {
  const router = useRouter()

  const [va, setVa] = useState<VaDto[]>([])

  useEffect(() => {
    getVas().then((res) => {
      setVa(res)
    })
  }, [])
  return (
    <div className="h-screen relative flex flex-col gap-4 ">
      {va.map((v, i) => (
        <div key={i} className="flex gap-4 items-center">
          <div className="w-20 h-20  rounded-md relative">
            <Image src={v.productImage} alt="image" layout="fill" />
          </div>
          <div>
            <div>상품명 : {v.productName}</div>
            <div>상품 상세 : {v.productDetails}</div>
            <div>가격 : {v.price}</div>
          </div>
        </div>
      ))}
      <div
        className="fixed"
        style={{
          bottom: 50,
          right: 50,
        }}
      >
        <Button
          label="부가서비스 추가"
          buttonType={BUTTON_TYPE.primary}
          onClick={() => {
            router.push('/manage/app/my/va/input')
          }}
        />
      </div>
    </div>
  )
}
