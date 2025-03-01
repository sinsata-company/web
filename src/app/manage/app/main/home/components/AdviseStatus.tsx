'use client'

import { getCanStatus } from '@/app/manage/api/teacher'
import Switch from '@/components/common/Switch'
import { useEffect, useState } from 'react'

const AdviseStatus = () => {
  const [call, setCall] = useState<boolean>(false)
  const [chat, setChat] = useState<boolean>(false)

  useEffect(() => {
    getStatus()
  }, [])

  const getStatus = async () => {
    const result = await getCanStatus()
    console.log(result)
    setCall(result.canCall)
    setChat(result.canChat)
  }
  return (
    <div className=" justify-center items-center gap-6 inline-flex">
      {['전화 상담', '채팅 상담'].map((text, index) => (
        <div key={index} className="flex items-center gap-1.5">
          <div className="text-black text-base font-semibold font-['Montserrat'] leading-none">
            {text}
          </div>
          <div className="justify-start items-center gap-1.5 flex">
            <div className="text-neutral-500 text-base text-xs font-medium  leading-none">
              가능
            </div>
            <Switch
              type={index == 0 ? 'call' : 'chat'}
              value={index == 0 ? call : chat}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default AdviseStatus
