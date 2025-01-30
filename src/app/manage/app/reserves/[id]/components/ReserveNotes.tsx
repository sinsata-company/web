'use client'

import { Button, BUTTON_TYPE } from '@/components/common/Button'
import GradientTitle from '@/components/common/GradientTitle'
import Input from '@/components/common/Input'
import { useState } from 'react'

const ReserveNotes = () => {
  const [value, setValue] = useState('')
  return (
    <div className="w-full inline-flex flex-col gap-2">
      <GradientTitle title="고객과의 상담 노트" />
      <Input
        placeholder="고객과의 상담 노트를 기록해주세요."
        textarea
        lines={5}
        useCounter
        maxLength={1000}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button buttonType={BUTTON_TYPE.primary} label="노트 저장" />
    </div>
  )
}

export default ReserveNotes
