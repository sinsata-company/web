import { withdraw } from '@/app/api/user'
import { Button, BUTTON_TYPE } from '@/components/common/Button'
import Modal from '@/components/common/Modal'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export interface MenuProps {
  label: string
  onClick: () => void
}

const MenuOptions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const menus: MenuProps[] = [
    {
      label: '회원정보',
      onClick: () => {
        router.push('/my/menus/profile')
      },
    },
    {
      label: '결제내역',
      onClick: () => {
        router.push('/my/menus/billing')
      },
    },
    {
      label: '상담내역',
      onClick: () => {
        router.push('/my/menus/reserves')
      },
    },
    {
      label: '상품구매내역',
      onClick: () => {
        router.push('/my/menus/purchases')
      },
    },
    {
      label: '코인충전',
      onClick: () => {
        router.push('/my/cash')
      },
    },
    {
      label: '나의 등급',
      onClick: () => {
        router.push('/my/menus/membership')
      },
    },
    {
      label: '채팅상담',
      onClick: () => {
        router.push('/chats')
      },
    },
    {
      label: '나의 후기',
      onClick: () => {
        router.push('/my/menus/reviews')
      },
    },
    {
      label: '부가상품',
      onClick: () => {
        router.push('/my/menus/valueAdded')
      },
    },
    {
      label: '쿠폰함',
      onClick: () => {
        router.push('/my/menus/coupon')
      },
    },
    {
      label: '고객센터',
      onClick: () => {
        router.push('/my/menus/cs')
      },
    },
    {
      label: '회원탈퇴',
      onClick: () => {
        setIsModalOpen(true)
      },
    },
  ]

  const router = useRouter()

  return (
    <div className="w-full flex-col justify-start items-start inline-flex">
      <div className="grid grid-cols-4 gap-4 w-full my-6">
        {menus.map((item, index) => (
          <div
            onClick={item.onClick}
            key={index}
            className="cursor-pointer flex flex-col items-center"
          >
            <Image
              src={`/images/Property 1=${index + 1}.svg`}
              alt={`Property ${index}`}
              className="w-12 h-12"
              width={24}
              height={24}
            />
            <div className="text-center text-neutral-800 text-lg font-semibold font-['Pretendard']">
              {item.label}
            </div>
          </div>
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="회원탈퇴"
        content="회원탈퇴를 하시겠습니까? 한 번 탈퇴한 계정은 영구 삭제되며, 다시 복구되지 않습니다."
      >
        <div className="flex justify-end gap-4">
          <Button
            label="취소"
            onClick={() => {
              // Handle 회원탈퇴 logic here
              setIsModalOpen(false)
            }}
            buttonType={BUTTON_TYPE.primary}
          />
          <Button
            label="회원탈퇴"
            onClick={async () => {
              // Handle 회원탈퇴 logic here
              await withdraw()
              setIsModalOpen(false)
              localStorage.clear()
              router.push('/register')
            }}
            buttonType={BUTTON_TYPE.secondary}
          />
        </div>
      </Modal>
    </div>
  )
}

export default MenuOptions
