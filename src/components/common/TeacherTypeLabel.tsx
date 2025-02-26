import { teacherTypeConverter } from '@/utils/teacherTypeConverter'

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
    <div className="absolute top-2 left-2 px-2 py-1  bg-red-400 rounded-lg justify-center items-center inline-flex">
      <div className="text-white text-xs font-bold font-['Pretendard'] leading-none">
        {teacherTypeConverter(teacherType.toLowerCase())}
      </div>
    </div>
  )
}

export default TeacherTypeLabel
