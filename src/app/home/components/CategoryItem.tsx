import { clsx } from 'clsx'

interface CategoryItemProps {
  label: string
  image: string
  color: string
}

export default function CategoryItem({
  label,
  image,
  color,
}: CategoryItemProps) {
  return (
    <div
      className={clsx(
        'h-16 px-2 py-3  rounded-xl flex-col justify-center items-center gap-1 inline-flex',
        color
      )}
    >
      <div className="w-6 h-6 relative">
        <div className="h-5 left-[1.39px] top-[4px] absolute"></div>
      </div>
      <div className="text-red-600 text-base font-bold font-['Pretendard Variable'] leading-tight">
        신점
      </div>
    </div>
  )
}
