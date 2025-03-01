import { ChatDto } from '@/app/api/data'
import ChatStatus from '@/app/chats/components/ChatStatus'
import { endChat } from '@/app/manage/api/homepage'
import { Button, BUTTON_TYPE } from '@/components/common/Button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const ChatSummary = ({ chat }: { chat: ChatDto | null }) => {
  if (!chat) return null
  const { teacherName, teacherProfile, startAt, endAt, status } = chat
  const router = useRouter()

  return (
    <div className="flex justify-between items-center w-full border-b-2 border-neutral-200">
      <div className="flex flex-col justify-between items-start p-4 ">
        <div className="w-full flex justify-start items-center gap-4">
          <div className="text-neutral-800 text-lg font-bold font-['Pretendard']">
            {teacherName?.replace('선생님', '')}
          </div>
          <ChatStatus status={status} />
        </div>
        <div className="flex justify-start items-center gap-2 mt-2">
          <div className="w-4 h-4 bg-lime-300 rounded-full"></div>
          <div className="text-center text-neutral-400 text-base font-semibold font-['Pretendard']">
            온라인
          </div>
        </div>
      </div>
      <div>
        {status === 'PROGRESS' ? (
          <div className="w-[120px] mr-4">
            <Button
              label="채팅 종료"
              onClick={async () => {
                await endChat(chat.roomId)
                router.back()
              }}
              buttonType={BUTTON_TYPE.primary}
            />
          </div>
        ) : (
          <Image
            src={teacherProfile ?? '/logo.jpg'}
            width={120}
            height={80}
            alt="profile"
            className="rounded-xl w-30 h-20 object-contain"
          />
        )}
      </div>
    </div>
  )
}

export default ChatSummary
