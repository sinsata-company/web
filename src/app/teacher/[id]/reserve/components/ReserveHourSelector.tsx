import Image from 'next/image'
import React from 'react'

interface Menu {
  id: number;
  type: 'chat' | 'phone';
  minute: number;
  method: string;
  price: number;
}

interface ReserveHourSelectorProps {
  selectedHour: number;
  setSelectedHour: (hour: number) => void;
  onCoinAmountChange: (amount: number) => void;
  menus: Menu[];
  selectedType: string;  // 'chat' 또는 'phone'
}

export default function ReserveHourSelector({
  selectedHour,
  setSelectedHour,
  onCoinAmountChange,
  menus,
  selectedType
}: ReserveHourSelectorProps) {
  // 선택된 타입에 맞는 메뉴만 필터링하고 시간순으로 정렬
  const filteredMenus = menus
    .filter(menu => menu.type === (selectedType === '전화' ? 'phone' : 'chat'))
    .sort((a, b) => a.minute - b.minute);
  
  // 컴포넌트 마운트 시 초기값 설정
  React.useEffect(() => {
    if (filteredMenus.length > 0 && !selectedHour) {
      const initialMenu = filteredMenus[0];
      setSelectedHour(initialMenu.minute);
      onCoinAmountChange(initialMenu.price);
    }
  }, [filteredMenus, selectedHour, setSelectedHour, onCoinAmountChange]);

  // 현재 선택된 시간에 해당하는 메뉴 찾기
  const getCurrentMenu = (minute: number) => {
    return filteredMenus.find(menu => menu.minute === minute);
  };

  // 이전/다음 메뉴 찾기
  const getPrevMenu = (currentMinute: number) => {
    const currentIndex = filteredMenus.findIndex(menu => menu.minute === currentMinute);
    return currentIndex > 0 ? filteredMenus[currentIndex - 1] : null;
  };

  const getNextMenu = (currentMinute: number) => {
    const currentIndex = filteredMenus.findIndex(menu => menu.minute === currentMinute);
    return currentIndex < filteredMenus.length - 1 ? filteredMenus[currentIndex + 1] : null;
  };

  return (
    <div className="w-full px-5 justify-between items-center inline-flex">
      <div className="text-zinc-900 text-base font-bold">시간 예약하기</div>
      <div className="justify-end items-center gap-3 flex">
        <div
          onClick={() => {
            const prevMenu = getPrevMenu(selectedHour);
            if (prevMenu) {
              setSelectedHour(prevMenu.minute);
              onCoinAmountChange(prevMenu.price);
            }
          }}
          className={`cursor-pointer w-8 h-8 px-2.5 rounded-full border 
            ${!getPrevMenu(selectedHour) 
              ? 'border-gray-200 opacity-50' 
              : 'border-zinc-100'
            } justify-center items-center gap-2 flex`}
        >
          <Image
            src={'/images/ic_minus.svg'}
            width={10}
            height={2}
            alt="minus"
          />
        </div>
        <div className="text-zinc-900 text-base font-bold">
          {selectedHour}분
        </div>
        <div
          onClick={() => {
            const nextMenu = getNextMenu(selectedHour);
            if (nextMenu) {
              setSelectedHour(nextMenu.minute);
              onCoinAmountChange(nextMenu.price);
            }
          }}
          className={`cursor-pointer w-8 h-8 px-2.5 rounded-full border 
            ${!getNextMenu(selectedHour)
              ? 'border-gray-200 opacity-50' 
              : 'border-zinc-100'
            } justify-center items-center gap-2 flex`}
        >
          <Image
            src={'/images/ic_plus.svg'}
            width={10}
            height={10}
            alt="plus"
          />
        </div>
      </div>
    </div>
  );
}
