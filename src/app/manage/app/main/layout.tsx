import AdvisorBTB from '@/components/common/AdvisorBtb'
import LogoAppbar from '@/components/common/LogoAppbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <LogoAppbar />
      <section>{children}</section>
      <AdvisorBTB />
    </div>
  )
}
