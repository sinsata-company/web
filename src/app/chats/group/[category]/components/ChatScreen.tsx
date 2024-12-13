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
    <div className="inline-flex flex-col py-5 px-5 gap-2.5 w-full">
      {messages.map((item, idx) => {
        console.log(myId)
        console.log(item.authorId)
        console.log(item.authorId == myId)
        return item.authorId == myId ? (
          <MyChat key={idx} {...item} />
        ) : (
          <OthersChat key={idx} {...item} />
        )
      })}
    </div>
  )
}
