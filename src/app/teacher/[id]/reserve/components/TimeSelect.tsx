import React from 'react';
import dayjs from 'dayjs';

interface TimeSelectProps {
  selectedDate: string;
  selectedTime: string;
  onTimeSelect: (time: string) => void;
}

const TimeSelect: React.FC<TimeSelectProps> = ({ selectedDate, selectedTime, onTimeSelect }) => {
  // Generate time slots from 00:00 to 23:30 with 30-minute intervals
  const generateTimeList = () => {
    const times: string[] = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        times.push(
          `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        );
      }
    }
    return times;
  };

  const timeList = generateTimeList();

  const isPastTime = (time: string) => {
    const today = dayjs();
    const selectedDateTime = dayjs(selectedDate).set('hour', parseInt(time.split(':')[0])).set('minute', parseInt(time.split(':')[1]));
    return selectedDateTime.isBefore(today);
  };

  return (
    <div className="h-[400px] overflow-y-auto">
      <div className="flex flex-wrap gap-2">
        {timeList.map((time, index) => {
          const isDisabled = isPastTime(time);
          return (
            <div
              key={index}
              onClick={() => !isDisabled && onTimeSelect(time)}
              className={`
                w-[calc(33.33%-8px)] h-10 flex items-center justify-center rounded-lg border border-solid
                ${selectedTime === time ? 'border-primary bg-primary text-white' : 'border-neutral-200'}
                ${isDisabled ? 
                  'line-through opacity-50 cursor-not-allowed bg-gray-100' : 
                  'cursor-pointer hover:border-primary'
                }
              `}
            >
              <span className="text-sm font-medium">{time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSelect; 