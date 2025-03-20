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
        'cursor-pointer grow bg-white rounded-md flex-col justify-center items-center gap-0.5 inline-flex p-1',
        // color
      )}
    >
      <div className="flex-col justify-start items-center gap-1 inline-flex">
        <div className="justify-center items-center inline-flex overflow-hidden">
          <Image
            src={`/images/category_${image}.svg`}
            width={70}
            height={50}
            alt="category"
            className="w-[70px] h-[55px]"
          />
        </div>
        <span className="text-xs font-medium"></span>
      </div>
    </div>
  )
}
