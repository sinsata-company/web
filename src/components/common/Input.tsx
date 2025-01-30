interface InputProps {
  placeholder?: string
  name: string
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
}: InputProps) {
  return (
    <div className="w-full flex-col justify-start items-start gap-4 inline-flex ">
      <div className="self-stretch text-zinc-900 text-xl font-bold font-['Pretendard Variable']">
        {name}
      </div>
      <div className="self-stretch justify-start items-start gap-3 inline-flex">
        <div className="grow p-4 rounded-xl border border-zinc-400 justify-start items-center gap-3 flex">
          {textarea ? (
            <textarea
              className="grow self-stretch text-base  font-['Pretendard Variable'] no-underline bg-transparent"
              style={{
                border: 'none',
                outline: 'none',
                resize: 'none',
                height: `${(lines ?? 1) * 1.5}rem`,
              }}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
            />
          ) : (
            <input
              className="grow self-stretch text-base  font-['Pretendard Variable'] no-underline bg-transparent"
              style={{
                border: 'none',
                outline: 'none',
              }}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
            />
          )}
        </div>
        {useSuffix && (
          <div
            onClick={onClickSuffix}
            className="h-14 px-8 py-5 bg-gradient-to-br from-yellow-400 via-red-600 to-blue-800 rounded-xl justify-center items-center gap-2 inline-flex"
          >
            <div className="text-center text-white text-base font-bold font-['Pretendard Variable'] capitalize">
              등록
            </div>
          </div>
        )}
      </div>
      {useCounter && (
        <div className="text-zinc-400 text-sm font-['Pretendard Variable']">
          {value.length} / {maxLength}
        </div>
      )}
    </div>
  )
}
