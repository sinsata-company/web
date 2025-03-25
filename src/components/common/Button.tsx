import clsx from 'clsx'

//typescirpt
export const enum BUTTON_TYPE {
  primary,
  secondary,
  inactive,
  inprogress,
  primarySm,
  abse,
  consulting,
  secondaryV2,
  ghost,
  dangerous = 9,
}

type buttonStyleType = {
  background: string
  text: string
}

const buttonStyle: Record<BUTTON_TYPE, buttonStyleType> = {
  [BUTTON_TYPE.primary]: {
    background: 'bg-gradient px-2 py-4 rounded-xl ',
    text: 'text-white ',
  },
  [BUTTON_TYPE.primarySm]: {
    background: 'bg-gradient py-1 rounded-md ',
    text: 'text-white ',
  },
  [BUTTON_TYPE.secondary]: {
    background: 'border  bg-blue-800/10 px-2 py-4 rounded-xl ',
    text: 'text-black',
  },
  [BUTTON_TYPE.inactive]: {
    background: 'bg-gray-200 px-2 py-4 rounded-xl ',
    text: 'text-white',
  },
  [BUTTON_TYPE.ghost]: {
    background: 'bg-transparent px-2 py-4 rounded-xl border border-slate-200',
    text: 'text-black',
  },
  [BUTTON_TYPE.inprogress]: {
    background: 'bg-teal-400/10 px-2 py-4 rounded-xl ',
    text: 'text-teal-400',
  },
  [BUTTON_TYPE.dangerous]: {
    background: 'bg-red-400 px-2 py-4 rounded-xl ',
    text: 'text-white ',
  },
  [BUTTON_TYPE.abse]: {
    background: 'bg-[#CCCCCC] px-2 py-4 rounded-xl ',
    text: 'text-white',
  },
  [BUTTON_TYPE.secondaryV2]: {
    background: 'border bg-white border-sinsata-blue text-sinsata-blue px-2 py-4 rounded-xl ',
    text: 'text-black',
  },
  [BUTTON_TYPE.consulting]: {
    background: 'bg-[#EAEAEA] px-2 py-4 rounded-xl ',
    text: 'text-white',
  },
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: React.ReactNode
  leftIcon?: React.ReactNode
  buttonType: BUTTON_TYPE
}

export function Button({ className, buttonType, label, leftIcon, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'w-full flex-col justify-center items-center gap-1 inline-flex cursor-pointer ',
        className,
        buttonStyle[buttonType].background
      )}
    >
      <div
        className={clsx(
          'text-base font-bold  leading-tight flex gap-x-2 items-center',
          buttonStyle[buttonType].text
        )}
      >
        {leftIcon}
        {label}
      </div>
    </button>
  )
}
