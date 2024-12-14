import { IMessage } from '../page'
import MyChat from './MyChat'
import OthersChat from './OthersChat'

export default function ChatScreen({
  messages,
  myId,
}: {
  messages: IMessage[]
  myId: string
}) {
  return (
    <div
      style={{
        marginTop: 15,
        height: 'calc(100% - 120px)',
      }}
      className="inline-flex flex-col py-5 px-5 gap-2.5 w-full overflow-y-auto"
    >
      {messages.map((item, idx) => {
        return item.authorId == myId ? (
          <MyChat key={idx} {...item} />
        ) : (
          <OthersChat key={idx} {...item} />
        )
      })}
    </div>
  )
}
