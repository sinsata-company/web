const StaticItem = ({ label, data }: { label: string; data: string }) => {
  return (
    <div className="flex-1 px-4 py-5 bg-white rounded-2xl border border-gray-200 flex-col justify-center items-start gap-2.5 inline-flex">
      <div className="self-stretch  flex-col justify-start items-start flex">
        <div className="self-stretch text-indigo-400 text-3xl font-bold font-['Pretendard']">
          {data}
        </div>
        <div className="self-stretch text-neutral-400 text-xl font-semibold font-['Pretendard']">
          {label}
        </div>
      </div>
    </div>
  )
}

export default StaticItem
