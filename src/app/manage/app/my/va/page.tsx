'use client'

import { VaDto } from '@/app/api/data'
import { getVas, deleteVas } from '@/app/manage/api/mypage'
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

  const handleEdit = (va: VaDto) => {
    const editData = encodeURIComponent(JSON.stringify(va))
    router.push(`/manage/app/my/va/input?editData=${editData}`)
  }

  const handleDelete = (id: number) => {
    console.log('id', id)
    deleteVas(id).then((res) => {
      setVa(va.filter((v) => v.id !== id))
    })
  }

  return (
    <div className="h-screen relative flex flex-col gap-4 ">
      <div className="flex flex-col h-screen overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          {va.map((v, i) => (
            <div key={i} className="flex justify-between items-center p-4 bg-white rounded-lg">
              <div className="flex gap-1 items-center flex-1">
                <div className="w-20 h-20 rounded-md relative">
                  {v.productImage ? (
                    <Image 
                      src={v.productImage}
                      alt={`${v.productName} 이미지`}
                      layout="fill"
                      className="object-cover rounded-md" 
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">
                      <span className="text-gray-400 text-xs">이미지 없음</span>
                    </div>
                  )}
                </div>
                <div>
                  <div>상품명 : {v.productName}</div>
                  <div>상품 상세 : {v.productDetails}</div>
                  <div>가격 : {v.price}</div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  label="수정"
                  buttonType={BUTTON_TYPE.secondary}
                  onClick={() => handleEdit(v)}
                  className="min-w-[60px] px-2 text-xs"
                />
                <Button
                  label="삭제"
                  buttonType={BUTTON_TYPE.secondary}
                  onClick={() => {
                    if (confirm('정말 삭제하시겠습니까?')) {
                      handleDelete(v?.id || 0)
                    }
                  }}
                  className="min-w-[60px] px-2 text-xs"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 p-4 bg-white border-t">
          <Button
            label="구매요청"
            buttonType={BUTTON_TYPE.primary}
            className="text-sm px-3 py-1"
            onClick={() => {
              router.push('/manage/app/my/vapay/')
            }}
          />
          <Button
            label="부가서비스 추가"
            buttonType={BUTTON_TYPE.primary}
            className="text-sm px-3 py-1"
            onClick={() => {
              router.push(`/manage/app/my/va/input`)
            }}
          />
        </div>
      </div>
    </div>
  )
}
