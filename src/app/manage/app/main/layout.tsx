import AdvisorBTB from '@/components/common/AdvisorBtb'
import LogoAppbar from '@/components/common/LogoAppbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <LogoAppbar />
      <section>{children}</section>
      <AdvisorBTB />
    </div>
  )
}
