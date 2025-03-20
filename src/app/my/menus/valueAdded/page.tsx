'use client'

import { getVaList, VaCustomerDto } from '@/app/api/cash'
import { VaDto } from '@/app/api/data'
import { Button, BUTTON_TYPE } from '@/components/common/Button'
import Modal from '@/components/common/Modal'
import { formatNumberWithCommas } from '@/utils/numberFormatter'
import { useRouter } from 'next/navigation'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { createInquiryChat, startInstantChat } from '@/app/api/chat'



export default function Page() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [vas, setVas] = useState<VaCustomerDto[]>([]);
  const [selectedVa, setSelectedVa] = useState<VaCustomerDto | null>(null);

  useEffect(() => {
    getVaList(0).then((res) => {
      setVas(res.content)
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
                  alt={`${va.name} 상품 이미지`}
                  className="mr-2 rounded-md"
                />
              ) : (
                <div className="w-[100px] h-[100px] bg-gray-200 mr-2 rounded-md" />
              )}
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
              {va.teacherThumbnail ? (
                <Image
                  src={va.teacherThumbnail}
                  width={120}
                  height={80}
                  alt={`${va.teacherName} 프로필 이미지`}
                />
              ) : (
                <div className="w-[120px] h-[80px] bg-gray-200 rounded-md" />
              )}
              <div className="w-24 h-4">
                <Button
                  label="구매하기"
                  onClick={() => {
                    setSelectedVa({
                      ...va,
                      teacherId: va.teacherId // teacher 객체에서 id를 가져옴
                    });
                    setIsOpen(true);
                  }}
                  buttonType={BUTTON_TYPE.primarySm}
                />
              </div>
            </div>
          </div>
        )
      })}

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={
          <div className="grid grid-cols-2 w-full">
            <span>상품 상세 (VAT 별도)</span>
            <span className="text-right">{formatNumberWithCommas(selectedVa?.price || 0)}원</span>
          </div>
        }
        content="상품을 구매하시겠습니까?"
      >
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <Button
              label="채팅문의"
              onClick={async () => {
                setIsOpen(false);
                const result = await createInquiryChat(selectedVa?.teacherId ?? '', selectedVa?.id.toString() ?? '')
                router.push(`/chats/inquiry/${result?.roomId}`)
              }}
              buttonType={BUTTON_TYPE.primary}
              className="flex-1"
            />
            <Button
              label="구매하기"
              onClick={() => {
                if (selectedVa) {
                  console.log('selectedVa :' + selectedVa);
                  router.push(`/my/menus/valueAdded/billing?vaId=${encodeURIComponent(JSON.stringify(selectedVa))}`);
                }
                setIsOpen(false);
              }}
              buttonType={BUTTON_TYPE.primary}
              className="flex-1"
            />
          </div>
          <Button
            label="취소"
            onClick={() => {
              setIsOpen(false);
            }}
            buttonType={BUTTON_TYPE.secondary}
            className="w-full"
          />
        </div>
      </Modal>
    </div>
  )
}
