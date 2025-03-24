import { teacherTypeConverter } from '@/utils/teacherTypeConverter'
import clsx from 'clsx'

type TeacherType = 'TARO' | 'MIND' | 'SINJEOM' | 'SAJU'

// 타입별 스타일 매핑
const TEACHER_TYPE_STYLES: Record<TeacherType, { bg: string; text: string }> = {
  TARO: { bg: 'bg-indigo-400', text: 'text-white' },
  MIND: { bg: 'bg-white', text: 'text-black' },
  SINJEOM: { bg: 'bg-red-400', text: 'text-white' },
  SAJU: { bg: 'bg-orange-300', text: 'text-white' }
}

const TeacherTypeLabel = ({ teacherType }: { teacherType: TeacherType }) => {
  const { bg, text } = TEACHER_TYPE_STYLES[teacherType] || TEACHER_TYPE_STYLES.SINJEOM

  return (
    <div
      className={clsx(
        'absolute top-1 left-1 w-[40px] h-[20px] flex justify-center items-center rounded-lg overflow-hidden',
        bg,
        text
      )}
    >
      <div className="text-xs font-bold w-[40px] h-[20px] flex justify-center items-center leading-none">
        {teacherTypeConverter(teacherType?.toLowerCase())}
      </div>
    </div>
  )
}

export default TeacherTypeLabel
