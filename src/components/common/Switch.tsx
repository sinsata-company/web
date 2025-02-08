import { updateCanStatus } from '@/app/manage/api/teacher'
import { Switch as Sd } from '@headlessui/react'
import { useEffect, useState } from 'react'

export default function Switch({
  type,
  value,
}: {
  type: 'call' | 'chat'
  value: boolean
}) {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    console.log(value)
    setEnabled(!value)
  }, [value])

  return (
    <Sd
      checked={enabled}
      onChange={(checked) => {
        setEnabled(checked)
        updateCanStatus(!checked, type)
      }}
      className="group relative flex border w-10 cursor-pointer rounded-full bg-teal-400 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none inline-block size-4 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-3.5"
      />
    </Sd>
  )
}
