import LogoAppbar from '@/components/common/LogoAppbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header className="">
        <LogoAppbar />
      </header>
      <section className="px-5 py-8">{children}</section>
    </div>
  )
}
