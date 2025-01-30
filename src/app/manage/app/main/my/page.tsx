import { GreyDivider } from '@/components/common/Divider'
import ProfileSummary from './components/ProfileSummary'
import ProfileMenu from './components/ProfileMenu'

export default function Page() {
  return (
    <div>
      <ProfileSummary />
      <GreyDivider />
      <ProfileMenu />
    </div>
  )
}
