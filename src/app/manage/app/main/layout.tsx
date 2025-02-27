import AdvisorBTB from '@/components/common/AdvisorBtb'
import LogoAppbar from '@/components/common/LogoAppbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <LogoAppbar />
      <section className="py-4">{children}</section>
      <div className="h-[120px]"></div>
      <AdvisorBTB />
    </div>
  )
}
