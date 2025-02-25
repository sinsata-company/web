import BackAppbar from '@/components/common/BackAppbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <BackAppbar />
      <div className="px-4">{children}</div>
    </section>
  )
}
