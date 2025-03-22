'use client'

import BtbChatAlarm from "../ui/BtbChatAlarm"
import BTBItem from "./BtbItem"

const Btb = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center w-full">
      <div className="w-[550px] w-max-[550px]">
        <div className="h-16 px-5 py-2.5 bg-white shadow flex justify-between items-center">
          <BTBItem name="홈" image="home" />
          <BTBItem name="찜목록" image="heart" />
          <BtbChatAlarm />
          <BTBItem name="My" image="my" />
        </div>
      </div>
    </div>
  )
}


export default Btb
