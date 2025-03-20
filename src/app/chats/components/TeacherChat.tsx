import { IMessage } from '@/app/api/data'
import Image from 'next/image'

interface TeacherChatProps extends IMessage {
  isContinued?: boolean
}

export default function TeacherChat({ message, createdAt, isContinued }: TeacherChatProps) {
  return (
    <div className="flex gap-2">
      {!isContinued && (
        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
          <Image src="/images/ic_profile.svg" width={32} height={32} alt="profile" />
        </div>
      )}
      <div className={`flex flex-col ${isContinued ? 'ml-10' : ''}`}>
        <div className="bg-gray-100 rounded-lg p-3 max-w-[70%]">
          {message}
        </div>
        {!isContinued && (
          <span className="text-xs text-gray-500 mt-1">
            {new Date(createdAt).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </div>
    </div>
  )
} 