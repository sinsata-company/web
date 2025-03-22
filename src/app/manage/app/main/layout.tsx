import AdvisorBTB from '@/components/common/AdvisorBtb'
import LogoAppbar from '@/components/common/LogoAppbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-[100dvh] w-full overflow-hidden">
      <LogoAppbar />
      <section className="flex-1 overflow-y-auto mb-[64px]">{children}</section>
      <AdvisorBTB />
    </div>
  )
}
