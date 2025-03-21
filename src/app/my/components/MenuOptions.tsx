import { withdraw } from '@/app/api/user'
import { Button, BUTTON_TYPE } from '@/components/common/Button'
import Modal from '@/components/common/Modal'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAppContext } from '@/context/AppContext'

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
      label: '1:1문의',
      onClick: () => {
        router.push('/chats/inquiry/list')
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
  const { fontFamily, fontSize } = useAppContext() || {}

  return (
    <div className={`${fontFamily} [&_*]:${fontSize} w-full px-2.5 py-1.5`}>
      <div className="grid grid-cols-4 gap-1.5 w-full">
        {menus.map((item, index) => (
          <div
            onClick={item.onClick}
            key={index}
            className="cursor-pointer flex flex-col items-center py-1.5 hover:bg-gray-50 rounded transition-colors"
          >
            <Image
              src={`/images/Property 1=${index + 1}.svg`}
              alt={`Property ${index}`}
              className="w-6 h-6 mb-0.5"
              width={24}
              height={24}
            />
            <div className="text-center text-neutral-900 text-sm">
              {item.label}
            </div>
          </div>
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="회원탈퇴"
        content={<p>회원탈퇴를 하시겠습니까? 한 번 탈퇴한 계정은 영구 삭제되며, <br />다시 복구되지 않습니다 (탈퇴시 7일간 회원가입이 불가능 합니다.)</p>}
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
