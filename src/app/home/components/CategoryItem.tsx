import { clsx } from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface CategoryItemProps {
  label: string
  image: string
  color: string
  textColor: string
  onClick?: Function
}

export default function CategoryItem({
  label,
  image,
  color,
  textColor,
  onClick,
}: CategoryItemProps) {
  return (
    <div
      onClick={() => {
        onClick && onClick(image)
      }}
      className={clsx(
        'grow  px-2 py-3 bg-red-600/10 rounded-xl flex-col justify-center items-center gap-1 inline-flex',
        color
      )}
    >
      <Image
        src={`/images/category_${image}.svg`}
        width={24}
        height={24}
        alt="category"
      />

      <div
        className={clsx(
          "text-base font-bold font-['Pretendard Variable'] leading-tight",
          textColor
        )}
      >
        {label}
      </div>
    </div>
  )
}
