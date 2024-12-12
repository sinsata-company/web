import BTB from '@/components/common/Btb'
import MainAppbar from '@/components/common/MainAppbar'
import ChatItem from './components/ChatItem'

export default function Chats() {
  return (
    <div>
      <MainAppbar />
      <div className="px-5">
        <ChatItem />
      </div>
      <BTB />
    </div>
  )
}
