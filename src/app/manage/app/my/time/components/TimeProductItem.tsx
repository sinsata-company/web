import { MenuItemProps } from './TimeTabs'

const TimeProductItem = ({ price, label }: MenuItemProps) => {
  return (
    <div className="h-11 bg-white rounded-xl flex items-center gap-4 w-full">
      <div className="grow flex-grow flex flex-col justify-center items-start gap-1">
        <div className="text-zinc-900 text-base font-bold leading-snug">
          {label}
        </div>
      </div>
      <div className="px-4 py-3 bg-red-600/10 rounded-xl flex items-center gap-3 overflow-hidden">
        <div className="text-red-600 text-base font-medium">₩</div>
        <div className="text-red-600 text-base font-bold">{price}</div>
      </div>
    </div>
  )
}

export default TimeProductItem
