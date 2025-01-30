import { Switch as Sd } from '@headlessui/react'
import { useState } from 'react'

export default function Switch() {
  const [enabled, setEnabled] = useState(false)

  return (
    <Sd
      checked={enabled}
      onChange={setEnabled}
      className="group relative flex border w-10 cursor-pointer rounded-full bg-teal-400 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none inline-block size-4 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-3.5"
      />
    </Sd>
  )
}
