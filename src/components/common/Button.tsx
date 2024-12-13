import clsx from 'clsx'

//typescirpt
export const enum BUTTON_TYPE {
  primary,
  secondary,
  inactive,
  inprogress,
}

type buttonStyleType = {
  background: string
  text: string
}

const buttonStyle: Record<BUTTON_TYPE, buttonStyleType> = {
  [BUTTON_TYPE.primary]: {
    background: 'bg-teal-400',
    text: 'text-white ',
  },
  [BUTTON_TYPE.secondary]: {
    background: 'border border-teal-400',
    text: 'text-teal-400',
  },
  [BUTTON_TYPE.inactive]: {
    background: 'bg-gray-200',
    text: 'text-white',
  },
  [BUTTON_TYPE.inprogress]: {
    background: 'bg-teal-400/10',
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
        'w-full px-2 py-4 bg-red-600/10 rounded-xl flex-col justify-center items-center gap-1 inline-flex'
      )}
      style={{
        borderRadius: 12,
        background:
          'var(--Gradient-1, linear-gradient(121deg, #F9C00F 3.88%, #E62419 59.99%, #21499C 115.85%))',
      }}
    >
      <div
        className={clsx(
          "text-base text-white font-bold font-['Pretendard Variable'] leading-tight"
        )}
      >
        {label}
      </div>
    </button>
  )
}
