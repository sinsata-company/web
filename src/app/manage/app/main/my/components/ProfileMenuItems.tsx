'use client'

import { useRouter } from 'next/navigation'
import { IMenuItem } from './ProfileMenu'

const ProfileMenuItems = ({ route, title }: IMenuItem) => {
  const router = useRouter()
  return (
    <div
      onClick={() => router.push('/manage/app/my/' + route)}
      className="h-16 px-4 py-5 bg-white flex-col justify-center items-start gap-2.5 inline-flex"
    >
      <div className="self-stretch h-5 text-black text-base font-normal font-['Pretendard Variable'] leading-relaxed">
        {title}
      </div>
    </div>
  )
}

export default ProfileMenuItems
