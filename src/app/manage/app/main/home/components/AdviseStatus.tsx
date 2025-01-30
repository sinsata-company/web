'use client'

import Switch from '@/components/common/Switch'

const AdviseStatus = () => {
  return (
    <div className="justify-center items-center gap-6 inline-flex">
      {['전화 상담', '채팅 상담'].map((text, index) => (
        <div key={index} className="flex items-center gap-1.5">
          <div className="text-black text-base font-semibold font-['Montserrat'] leading-none">
            {text}
          </div>
          <div className="justify-start items-center gap-1.5 flex">
            <div className="text-neutral-500 text-base text-xs font-medium font-['Pretendard Variable'] leading-none">
              가능
            </div>
            <Switch />
          </div>
        </div>
      ))}
    </div>
  )
}

export default AdviseStatus
