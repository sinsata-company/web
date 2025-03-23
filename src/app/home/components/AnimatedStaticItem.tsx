import CountUp from 'react-countup';

interface AnimatedStaticItemProps {
  label: string;
  value: number;
  suffix?: string;
  duration?: number;
}

const AnimatedStaticItem = ({ 
  label, 
  value, 
  suffix = '', 
  duration = 2.5 
}: AnimatedStaticItemProps) => {
  return (
    <div className="flex-1 px-4 py-4 bg-white rounded-lg border border-gray-200 flex-col justify-center items-start gap-1.5 inline-flex">
      <div className="self-stretch flex-col justify-start items-start flex">
        <div className="self-stretch text-indigo-500 text-xl font-semibold">
          <CountUp
            end={value}
            duration={duration}
            separator=","
            suffix={suffix}
            useEasing={true}
          />
        </div>
        <div className="self-stretch text-neutral-500 text-sm">
          {label}
        </div>
      </div>
    </div>
  )
}

export default AnimatedStaticItem
