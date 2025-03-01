'use client'

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import clsx from 'clsx'
import { useState } from 'react'

interface SelectorProps {
  placeholder?: string
  name: string
  value: string
  onChange: (e: string) => void
  useSuffix?: boolean
  onClickSuffix?: () => void
  lists: string[]
}

export default function Selector({
  placeholder,
  name,
  lists,
  value,
  onChange,
}: SelectorProps) {
  return (
    <div className="w-full flex-col justify-start items-start gap-4 inline-flex ">
      <div className="self-stretch text-zinc-900 text-xl font-bold ">
        {name}
      </div>
      <Menu>
        <MenuButton className="w-full grow h-14 text-zinc-400 p-4 rounded-xl border border-zinc-400 justify-start items-center gap-3 flex">
          <p
            className={clsx(
              'grow text-start',
              value ? 'text-black' : 'text-zinc-400'
            )}
          >
            {value == '' ? placeholder : value}
          </p>
          <img
            src="/images/ic_arrow_up.svg"
            alt="arrow-down"
            className="w-4 h-4 transform rotate-180"
          />
        </MenuButton>
        <MenuItems
          anchor="bottom"
          transition
          style={{
            width: 'calc(100% - 20px * 2)',
          }}
          className="grow origin-top-right rounded-xl border border-black/5 bg-white p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          {lists.map((item) => (
            <MenuItem key={item}>
              <div
                onClick={() => onChange(item)}
                className=" block text-center   data-[focus]:bg-black/5 w-full py-4 text-black bg-white rounded-xl "
              >
                {item}
              </div>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  )
}
