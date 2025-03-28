import React, { ChangeEvent } from 'react'
import clsx from 'clsx'

export interface InputProps {
  placeholder?: string
  name?: string
  value: string
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  useSuffix?: boolean
  onClickSuffix?: () => void
  textarea?: boolean
  lines?: number
  useCounter?: boolean
  maxLength?: number
  type?: string
  error?: string
  onKeyDown?: (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  className?: string
  onBlur?: (e: any) => void
  min?: number
  max?: number
  step?: number
}

export default function Input({
  placeholder,
  name,
  value,
  onChange,
  useSuffix,
  onClickSuffix,
  textarea,
  lines,
  useCounter,
  maxLength,
  onKeyDown,
  type,
  error,
  className,
  onBlur,
  min,
  max,
  step,
}: InputProps) {
  const props = {
    placeholder,
    name,
    value,
    onChange,
    onKeyDown,
    type,
    onBlur,
    min,
    max,
    step,
  }

  return (
    <div className="w-full flex-col justify-start items-start gap-4 inline-flex ">
      {name && (
        <div className="self-stretch text-zinc-900 text-xl font-bold ">
          {name}
        </div>
      )}
      <div className="self-stretch flex flex-col sm:flex-row gap-3">
        <div className="w-full p-4 rounded-xl border border-zinc-400 justify-start items-center gap-3 flex">
          {textarea ? (
            <textarea
              {...props}
              className={clsx(
                'w-full outline-none placeholder:text-zinc-400',
                className
              )}
            />
          ) : (
            <input
              {...props}
              className={clsx(
                'w-full outline-none placeholder:text-zinc-400',
                '[&::-webkit-inner-spin-button]:w-6',
                '[&::-webkit-inner-spin-button]:h-6',
                '[&::-webkit-inner-spin-button]:opacity-100',
                '[&::-webkit-inner-spin-button]:m-0',
                '[&::-webkit-inner-spin-button]:cursor-pointer',
                className
              )}
              style={{
                WebkitAppearance: props.type === 'number' ? 'inner-spin-button' : 'none'
              }}
            />
          )}
        </div>
        {useSuffix && (
          <div
            onClick={onClickSuffix}
            className="h-14 px-8 py-5 bg-gradient rounded-xl justify-center items-center gap-2 inline-flex"
          >
            <div className="text-center text-white text-base font-bold  capitalize">
              등록
            </div>
          </div>
        )}
      </div>
      {useCounter && (
        <div className="text-zinc-400 text-sm ">
          {value.length} / {maxLength}
        </div>
      )}

      {error && <div className="text-red-600 text-sm ">{error}</div>}
    </div>
  )
}
