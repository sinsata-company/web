'use client'

import { UserDto } from '@/types/user'
import { IMessage } from '@/app/api/data'
import GroupChat from '@/app/chats/components/GroupChat'

export default function ChatScreen({
  messages,
  myId,
  user,
}: {
  messages: IMessage[]
  myId: string
  user: UserDto | null
}) {
  return (
    <div
      style={{
        marginTop: 15,
        height: 'calc(100vh - 120px)',
      }}
      className="inline-flex flex-col py-5 px-5 gap-2.5 w-full overflow-y-auto "
    >
      <div className="text-center px-5 py-4 text-neutral-500 text-sm font-normal space-y-1.5">
        <p>안녕하세요 신사타입니다.</p>
        <p>여기는 고객들이 실시간으로 대화를 나누는 소통공간입니다.</p>
        <p>욕설 및 비방, 상대에게 상처를 주는 대화는 삼가해 주세요.</p>
        <p>서로에게 공감과 위로가 되어주시길 바랍니다.</p>
      </div>
      {messages.map((item, idx) => {
        return item.authorId == myId ? (
          <GroupChat
            key={idx}
            {...item}
            user={user}
            isContinued={idx > 0 && messages[idx - 1].authorId == myId}
          />
        ) : (
          <OthersChat
            key={idx}
            {...item}
            isContinued={idx > 0 && messages[idx - 1].authorId != myId}
          />
        )
      })}
    </div>
  )
}
