// TimeProductItem.tsx
'use client'

import { formatNumberWithCommas } from '@/utils/numberFormatter'
import { MenuItemProps } from './TimeTabs'
import { InfoItem } from '../../hashtag/page'

export interface ITimeProductItemProps extends MenuItemProps {
  onClick: (item: MenuItemProps) => void;
}

const TimeProductItem = (props: ITimeProductItemProps) => {
  const { method, price, minute, type, unit = 'minute' } = props;

  const unitLabel = unit === 'second' ? '초' : '분'; // 명확히 구분!

  const paymentLabel = method === 'cash' ? '[선불]' : '[후불]';

  return (
    <div
      onClick={() => props.onClick(props)}
      className="h-11 cursor-pointer bg-white rounded-xl flex items-center gap-4 w-full"
    >
      <div className="grow flex-grow flex flex-col justify-center items-start gap-1">
        <div className="text-zinc-900 text-base font-bold leading-snug">
          {`${minute}${unitLabel} ${type === 'chat' ? '채팅' : '전화'} 상담 `}
          <span className="text-[#E46777] text-xs font-bold">
            {paymentLabel}
          </span>
        </div>
      </div>
      <div className="px-4 py-3 bg-indigo-400/10 rounded-xl flex items-center gap-3 overflow-hidden">
        <div className="text-indigo-400 text-base font-medium">₩</div>
        <div className="text-indigo-400 text-base font-bold">
          {formatNumberWithCommas(price)}
        </div>
      </div>
    </div>
  );
};

export default TimeProductItem;
