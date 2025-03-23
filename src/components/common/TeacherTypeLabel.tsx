import { teacherTypeConverter } from '@/utils/teacherTypeConverter'
import clsx from 'clsx'

const TeacherTypeLabel = ({
  teacherType,
}: {
  teacherType: 'TARO' | 'MIND' | 'SINJEOM' | 'SAJU'
}) => {
  let color
  let textColor
  switch (teacherType) {
    case 'TARO':
      color = 'bg-indigo-400'
      textColor = 'text-white'
      break
    case 'MIND':
      color = 'bg-white'
      textColor = 'text-black'
      break
    case 'SINJEOM':
      color = 'bg-red-400'
      textColor = 'text-white'
      break
    case 'SAJU':
      color = 'bg-orange-300'
      textColor = 'text-white'
      break
  }
  return (
    <div
      className={clsx(
        'absolute top-1 left-1 w-[40px] h-[20px] flex justify-center items-center rounded-lg overflow-hidden',
        color,
        textColor
      )}
    >
      <div className=" text-xs font-bold w-[40px] h-[20px] flex justify-center items-center leading-none">
        {teacherTypeConverter(teacherType?.toLowerCase())}
      </div>
    </div>
  )
}

export default TeacherTypeLabel
