import { ChatDto, IMessage } from '@/app/api/data'
import { endChat } from '@/app/manage/api/homepage'
import { Button, BUTTON_TYPE } from '@/components/common/Button'
import UserLevelIcon from '@/components/common/UserLevelIcon'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const UserSummary = ({ chat }: { chat: ChatDto | null }) => {
  const router = useRouter()
  return (
    <div className="px-4  flex justify-between items-center border-b-2 border-neutral-200">
      <div className="flex  items-start w-full ">
        <div className="mt-5 justify-start items-center gap-1 flex">
          <Image
            onClick={() => {
              router.back()
            }}
            src={'/images/ic_back.svg'}
            width={8}
            height={16}
            alt="back"
          />
        </div>
        <div className="flex flex-col justify-between items-start p-4 ">
          <div className="w-full flex justify-start items-center gap-4">
            <div className="flex text-neutral-800 text-lg font-bold font-['Pretendard']">
              <UserLevelIcon level={chat?.userLevel ?? ''} />
              {chat?.userName}
            </div>
          </div>
          <div className="flex justify-start items-center gap-2 mt-2">
            <div className="w-4 h-4 bg-lime-300 rounded-full"></div>
            <div className="text-center text-neutral-400 text-base font-semibold font-['Pretendard']">
              온라인
            </div>
          </div>
        </div>
      </div>
      {chat?.status == 'PROGRESS' && (
        <div className="w-[120px] ">
          <Button
            label="채팅 종료"
            onClick={async () => {
              await endChat(chat.roomId)
              router.push('/manage/app/main/home')
            }}
            buttonType={BUTTON_TYPE.primary}
          />
        </div>
      )}
    </div>
  )
}

export default UserSummary
