import { basicDelete } from '@/api/base'
import { ChatDto } from '@/app/api/data'
import ChatStatus from '@/app/chats/components/ChatStatus'
import { endChatByUser } from '@/app/manage/api/homepage'
import { Button, BUTTON_TYPE } from '@/components/common/Button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const ChatSummary = ({ chat, sendEndMessage }: { chat: ChatDto | null; sendEndMessage:Function }) => {
  if (!chat) return null
  const { teacherName, teacherProfile, startAt, endAt, status } = chat
  const router = useRouter()
  const isReserv = status === 'RESERVE';
  const canEnded = ['REQUEST', 'PROGRESS'].includes(status);

  const cacelReserv = async () => {
    await basicDelete(`/reserve/${chat.reserveId}`);
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
    <div className="flex justify-between items-center w-full border-b-2 border-neutral-200">
      <div className="flex flex-col justify-between items-start p-4 ">
        <div className="w-full flex justify-start items-center gap-4">
          <div className="text-neutral-800 text-lg font-bold ">
            {teacherName?.replace('선생님', '')}
          </div>
          <ChatStatus status={status} />
        </div>
        <div className="flex justify-start items-center gap-2 mt-2">
          <div className="w-4 h-4 bg-lime-300 rounded-full"></div>
          <div className="text-center text-neutral-400 text-base font-semibold ">
            온라인
          </div>
        </div>
      </div>
      <div>
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
          <div className="w-[120px] mr-4">
          <Button
            label="채팅 종료"
            onClick={async () => {
              await endChatByUser(chat.roomId);
              sendEndMessage && sendEndMessage();
              router.back()
            }}
            buttonType={BUTTON_TYPE.primary}
          />
        </div>
        )}
        
        <Image
          src={teacherProfile ?? '/logo.jpg'}
          width={120}
          height={80}
          alt="profile"
          className="rounded-xl w-30 h-20 object-contain"
        />
      </div>
    </div>
  )
}

export default ChatSummary
