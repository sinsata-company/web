'use client'

import { VaDto } from '@/app/api/data'
import { updateVas } from '@/app/manage/api/mypage'
import { Button, BUTTON_TYPE } from '@/components/common/Button'
import ImageInput from '@/components/common/ImageInput'
import Input from '@/components/common/Input'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { basicTeacherPut } from '@/app/manage/api/base'

const INITIAL_STATE: VaDto = {
  id: 0,
  productName: '',
  productDetails: '',
  price: 0,
  productDate: '',
  productWay: '',
  productInfo: '',
  productNote: '',
  productImage: ''
}

function VaInputForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState<VaDto>(INITIAL_STATE)

  useEffect(() => {
    const editData = searchParams.get('editData')
    if (editData) {
      const parsedData = JSON.parse(decodeURIComponent(editData))
      setFormData(parsedData)
    }
  }, [searchParams])

  const handleSubmit = async () => {
    try {
      const formPayload = {
        id:formData.id,
        name: formData.productName,
        details: formData.productDetails,
        dt: formData.productDate,
        way: formData.productWay,
        info: formData.productInfo,
        note: formData.productNote,
        price: formData.price.toString(),
        image: formData.productImage
      }

      if (formData.id) {
        // 수정: PUT /va/{vaId}
        await basicTeacherPut(`/manage/my/va/${formData.id}`, formPayload)
      } else {
        // 신규 등록
        await updateVas(formPayload)
      }
      
      router.back()
    } catch (error) {
      console.error('Failed to save VA:', error)
    }
  }

  const handleInputChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? Number(e.target.value) : e.target.value
    }))
  }

  return (
    <div className="flex flex-col gap-3">
      <Input
        name="상품명"
        placeholder="상품명을 입력해주세요"
        value={formData.productName || ''}
        maxLength={20}
        useCounter
        onChange={handleInputChange('productName')}
      />
      <Input
        name="상품 설명"
        placeholder="상품 설명을 입력해주세요"
        value={formData.productDetails || ''}
        lines={3}
        textarea
        maxLength={500}
        useCounter
        onChange={handleInputChange('productDetails')}
      />
      <Input
        name="작업 시간"
        placeholder="작업 시간을 입력해주세요"
        value={formData.productDate || ''}
        maxLength={20}
        useCounter
        onChange={handleInputChange('productDate')}
      />
      <Input
        name="제공 방법"
        placeholder="제공 방법을 입력해주세요"
        value={formData.productWay || ''}
        maxLength={20}
        useCounter
        onChange={handleInputChange('productWay')}
      />
      <Input
        name="신청 정보"
        placeholder="신청 정보를 입력해주세요"
        value={formData.productInfo || ''}
        lines={3}
        textarea
        maxLength={500}
        useCounter
        onChange={handleInputChange('productInfo')}
      />
      <Input
        name="기본유의사항"
        placeholder="기본유의사항을 입력해주세요"
        value={formData.productNote || ''}
        lines={3}
        textarea
        maxLength={500}
        useCounter
        onChange={handleInputChange('productNote')}
      />
      <Input
        name="가격"
        type="number"
        placeholder="가격을 입력해주세요"
        value={formData.price?.toString() || ''}
        onChange={handleInputChange('price')}
      />
      <ImageInput
        count={1}
        onDelete={() => setFormData(prev => ({ ...prev, productImage: '' }))}
        onUploadedImage={(images) => setFormData(prev => ({ ...prev, productImage: images[0] }))}
        images={formData.productImage ? [formData.productImage] : []}
      />
      <Button
        buttonType={BUTTON_TYPE.primary}
        label={searchParams.get('editData') ? "수정" : "등록"}
        onClick={handleSubmit}
      />
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
