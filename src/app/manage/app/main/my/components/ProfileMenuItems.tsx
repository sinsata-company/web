'use client'

import {useRouter} from 'next/navigation'
import {IMenuItem} from './ProfileMenu'
import Modal from '@/components/common/Modal'
import {useState} from 'react'
import {Button, BUTTON_TYPE} from '@/components/common/Button'

const ProfileMenuItems = ({route, title, icon}: IMenuItem) => {
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
            className="cursor-pointer bg-white flex-col justify-center items-center gap-2.5 inline-flex mb-5"
        >
            <div className="rounded-lg flex justify-center items-center bg-gray-200 p-3">
                {icon}
            </div>
            <div className="self-stretch h-full text-black text-base font-normal  leading-relaxed text-center break-keep">
                <p>{title}</p>
            </div>
        </div>
    )
}

export default ProfileMenuItems
