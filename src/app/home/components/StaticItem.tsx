const StaticItem = ({ label, data }: { label: string; data: string }) => {
  return (
    <div className="flex-1 px-4 py-4 bg-white rounded-lg border border-gray-200 flex-col justify-center items-start gap-1.5 inline-flex">
      <div className="self-stretch flex-col justify-start items-start flex">
        <div className="self-stretch text-indigo-500 text-xl font-semibold">
          {data}
        </div>
        <div className="self-stretch text-neutral-500 text-sm">
          {label}
        </div>
      </div>
    </div>
  )
}

export default StaticItem
