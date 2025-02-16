import BackAppbar from '@/components/common/BackAppbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <BackAppbar />
      <section className="px-5 py-2 h-screen">{children}</section>
    </div>
  )
}
