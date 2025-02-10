import ReserveList from '../home/components/ReserveList'

export default function Page() {
  return (
    <div className="inline-flex flex-col gap-5 px-5 w-full">
      <ReserveList reserves={[]} />
    </div>
  )
}
