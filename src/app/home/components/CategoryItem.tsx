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
        'cursor-pointer grow  bg-white rounded-xl flex-col justify-center items-center gap-1 inline-flex'
        // color
      )}
    >
      <div className=" flex-col justify-start items-center gap-2.5 inline-flex">
        <div className=" justify-center items-center inline-flex overflow-hidden">
          <Image
            src={`/images/category_${image}.svg`}
            width={100}
            height={100}
            alt="category"
          />
        </div>
      </div>
    </div>
  )
}
