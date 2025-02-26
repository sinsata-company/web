'use client'

import { useRouter } from 'next/navigation'
import { IMenuItem } from './ProfileMenu'
import Modal from '@/components/common/Modal'
import { useState } from 'react'
import { Button, BUTTON_TYPE } from '@/components/common/Button'

const ProfileMenuItems = ({ route, title }: IMenuItem) => {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  return (
    <div
      onClick={() => {
        if (route == 'withdraw') {
          console.log('탈퇴하기')
          setShowModal(true)
        } else {
          router.push('/manage/app/my/' + route)
        }
      }}
      className="cursor-pointer h-16 px-4 py-5 bg-white flex-col justify-center items-start gap-2.5 inline-flex"
    >
      <div className="self-stretch h-5 text-black text-base font-normal font-['Pretendard Variable'] leading-relaxed">
        {title}
      </div>
      <Modal
        isOpen={showModal}
        onClose={(e) => {
          e.stopPropagation()

          setShowModal(false)
          console.log(showModal)
        }}
        title="회원탈퇴"
        content="탈퇴 후에는 복구되지 않습니다. 하단 버튼을 눌러 카카오톡 상담을 이용하신 후 절차에 따라 회원탈퇴를 안내해드리겠습니다."
      >
        <Button
          buttonType={BUTTON_TYPE.primary}
          onClick={() => {
            window.open('http://pf.kakao.com/_rMFxbn', '_blank')
            // 탈퇴 API 호출
            setShowModal(false)
          }}
          label="탈퇴하기"
        />
      </Modal>
    </div>
  )
}

export default ProfileMenuItems
