import Image from 'next/image'
import { TimeItem } from './ReserveTimeSelector'

const ReserveTypeSelector = ({
  selectedType,
  setSelectedType,
}: {
  selectedType: string
  setSelectedType: (type: string) => void
}) => {
  return (
    <div className="w-full px-5 justify-between items-center inline-flex">
      <div className="text-zinc-900 text-base font-bold font-['Pretendard Variable']">
        상담 방식
      </div>
      <div className="justify-end items-center gap-3 flex">
        <TimeItem
          onClick={setSelectedType}
          time={'채팅'}
          selected={selectedType == '채팅'}
        />
        <TimeItem
          onClick={setSelectedType}
          time={'전화'}
          selected={selectedType == '전화'}
        />
      </div>
    </div>
  )
}

export default ReserveTypeSelector
