import clsx from 'clsx'

//typescirpt
export const enum BUTTON_TYPE {
  primary,
  secondary,
  inactive,
  inprogress,
  primarySm,
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
  [BUTTON_TYPE.inprogress]: {
    background: 'bg-teal-400/10 px-2 py-4 rounded-xl ',
    text: 'text-teal-400',
  },
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: React.ReactNode
  buttonType: BUTTON_TYPE
}

export function Button({ className, buttonType, label, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'w-full flex-col justify-center items-center gap-1 inline-flex cursor-pointer',
        buttonStyle[buttonType].background
      )}
    >
      <div
        className={clsx(
          'text-base font-bold  leading-tight',
          buttonStyle[buttonType].text
        )}
      >
        {label}
      </div>
    </button>
  )
}
