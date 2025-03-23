import { Switch as Sd } from '@headlessui/react'
import { useEffect, useState } from 'react'

export default function Switch({
  type,
  value,
  updateCanStatus
}: {
  type: 'call' | 'chat'
  value: boolean,
  updateCanStatus: (checked: boolean, type: 'call' | 'chat') => void
}) {
  // The enabled state should reflect the actual availability state
  const [enabled, setEnabled] = useState(value)

  // Update local state when props change
  useEffect(() => {
    setEnabled(value)
  }, [value])

  // Handle toggle change
  const handleChange = (checked: boolean) => {
    // Update local state first
    setEnabled(checked)
    // Then call the parent's update function with the new value
    updateCanStatus(!checked, type)
  }

  return (
    <Sd
      defaultChecked={!enabled}
      onChange={handleChange}
      className="group relative flex border w-10 cursor-pointer rounded-full bg-indigo-400 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none inline-block size-4 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-3.5"
      />
    </Sd>
  )
}
