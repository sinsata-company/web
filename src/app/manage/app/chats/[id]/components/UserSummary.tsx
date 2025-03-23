import { ChatDto } from '@/app/api/data'
import { basicTeacherDelete } from '@/app/manage/api/base'
import { endChat } from '@/app/manage/api/homepage'
import { Button, BUTTON_TYPE } from '@/components/common/Button'
import UserLevelIcon from '@/components/common/UserLevelIcon'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const UserSummary = ({ chat, sendEndMessage }: { chat: ChatDto | null; sendEndMessage: Function; }) => {
  const router = useRouter()
  const isReserv = chat?.status === 'RESERVE';
  const canEnded = ['REQUEST', 'PROGRESS'].includes(chat?.status ?? '');
  
  const cacelReserv = async () => {
    if (!chat?.reserveId) return;
    await basicTeacherDelete(`/reserve/teacher/${chat.reserveId}`);
  }

  const cancelReservation = async () => {
    try {
      if (!isReserv) return;
      await cacelReserv();
      alert("예약이 취소되었습니다.");
      router.back();
    } catch (error: any) {
      if (error?.message) {
        alert(error.message);
        return;
      }
      alert("예약 취소가 실패하였습니다.");
    }
  };

  
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
            <div className="flex text-neutral-800 text-lg font-bold ">
              <UserLevelIcon level={chat?.userLevel ?? ''} />
              {chat?.userName}
            </div>
          </div>
          <div className="flex justify-start items-center gap-2 mt-2">
            <div className="w-4 h-4 bg-lime-300 rounded-full"></div>
            <div className="text-center text-neutral-400 text-base font-semibold ">
              온라인
            </div>
          </div>
        </div>
      </div>
      {isReserv && (
          <div className="w-[120px] mr-4">
          <Button
            label="예약 취소"
            onClick={cancelReservation}
            buttonType={BUTTON_TYPE.primary}
          />
        </div>
      )}
      {canEnded && (
        <div className="w-[120px] ">
          <Button
            label="채팅 종료"
            onClick={async () => {
              await endChat(chat.roomId)
              sendEndMessage && sendEndMessage();
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
