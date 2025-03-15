'use client'

import { VaDto, VaPayDto } from '@/app/api/data'
import { updateVas } from '@/app/manage/api/mypage'
import { Button, BUTTON_TYPE } from '@/components/common/Button'
import ImageInput from '@/components/common/ImageInput'
import Input from '@/components/common/Input'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'

const INITIAL_STATE: VaPayDto = {
  address: '',
  productInfo: '',
  userName: '',
  productName: '',
  productImage: '',
  price: 0,
  nickName: ''
}

function VaInputForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState<VaPayDto>(INITIAL_STATE)
  const [images, setImages] = useState<string[]>([])

  useEffect(() => {
    const vaData = searchParams.get('vaData')
    if (vaData) {
      const parsedData = JSON.parse(decodeURIComponent(vaData))
      setFormData(parsedData)
    }
  }, [searchParams])


  return (
    <div className="flex flex-col gap-3">
      {/* 상품 상세 정보 */}
      <div className="bg-white p-2 rounded-lg">
          <table className="w-full">
            <tbody>
              <tr className="border-b">
                <th className="py-2 text-left w-1/4">구매자 성함 : </th>
                <td className="py-2">{formData?.userName}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 신청 정보 */}
        <div className="bg-white p-2 rounded-lg">
          <h3 className="font-bold mb-2">신청정보</h3>
          <p className="text-sm text-gray-600 mb-2">서비스 진행에 필요한 아래 정보를 입력해주세요.</p>
          <textarea
            className="w-full h-32 border rounded-lg p-2"
            placeholder=" 본관(ex.김해김씨), 이름, 생년월일, 현재 거주 중인 집주소, 고민 내용"
            value={formData?.productInfo || ''}
            readOnly
          />
        </div>

        {/* 배송 정보 */}
        <div className="bg-white p-2 rounded-lg">
          <h3 className="font-bold mb-2">배송정보</h3>
          <p className="text-sm text-gray-600 mb-2">서비스 진행에 필요한 아래 정보를 입력해주세요.</p>
          <textarea
            className="w-full h-32 border rounded-lg p-2"
            placeholder=" 본관(ex.김해김씨), 이름, 생년월일, 현재 거주 중인 집주소, 고민 내용"
            value={formData?.address || ''}
            readOnly
          />
        </div>
        <hr className="border-gray-200" />
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VaInputForm />
    </Suspense>
  )
}
