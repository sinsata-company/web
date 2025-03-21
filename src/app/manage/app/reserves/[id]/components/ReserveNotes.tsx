'use client'

import { writeNote } from '@/app/manage/api/reserve'
import { Button, BUTTON_TYPE } from '@/components/common/Button'
import GradientTitle from '@/components/common/GradientTitle'
import Input from '@/components/common/Input'
import { TeacherReserveHistoryDto } from '@/types/api'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const ReserveNotes = ({
  detail,
  reload,
}: {
  detail: TeacherReserveHistoryDto | undefined
  reload: () => void
}) => {
  const [value, setValue] = useState(detail?.currentNote ?? '')
  const reserveId = usePathname().split('/').pop() as string

  const saveNote = async () => {
    if (value.trim() === '') {
      return alert('노트를 작성해주세요.');
    }

    await writeNote(reserveId, value)
    alert('노트를 저장하였습니다.');
    reload();
  };

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
        onClick={saveNote}
        buttonType={BUTTON_TYPE.primary}
        label="노트 저장"
      />
    </div>
  )
}

export default ReserveNotes
