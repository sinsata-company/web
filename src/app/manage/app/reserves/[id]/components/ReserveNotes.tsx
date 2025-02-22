'use client'

import { ReserveDetailDto, writeNote } from '@/app/manage/api/reserve'
import { Button, BUTTON_TYPE } from '@/components/common/Button'
import GradientTitle from '@/components/common/GradientTitle'
import Input from '@/components/common/Input'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const ReserveNotes = ({
  detail,
  reload,
}: {
  detail: ReserveDetailDto | null
  reload: () => void
}) => {
  const [value, setValue] = useState('')
  const reserveId = usePathname().split('/').pop() as string

  useEffect(() => {
    setValue(detail?.reserveNote ?? '')
  }, [detail])
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
      <Button
        onClick={async () => {
          await writeNote(reserveId, value)
          reload()
        }}
        buttonType={BUTTON_TYPE.primary}
        label="노트 저장"
      />
    </div>
  )
}

export default ReserveNotes
