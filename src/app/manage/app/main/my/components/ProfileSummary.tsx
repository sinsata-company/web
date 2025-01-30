const ProfileSummary = () => {
  return (
    <div className="h-36 px-5 flex flex-col gap-4">
      <div className="w-28 text-zinc-900 text-xl font-bold">내 프로필</div>
      <div className="w-full p-4 bg-neutral-50 rounded-2xl border border-zinc-100 flex gap-3">
        <div className="w-20 h-20 bg-zinc-100 rounded-xl" />
        <div className="flex flex-col justify-between">
          <div className="text-zinc-900 text-base font-bold leading-snug">
            선생님명
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4" />
            <div className="text-yellow-400 text-sm font-bold leading-tight">
              해시태그
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileSummary
