import MainAppbar from '@/components/common/MainAppbar'
import AdCarousel from './components/AdCarousel'
import CategoryContainer from './components/CategoryContainer'
import BTB from '@/components/common/Btb'
import GroupChatItem from './components/GroupChatItem'

import AdvisorSort from './components/AdvisorSort'
import AdvisorList from './components/AdvisorList'
import FindMyAdvisor from './components/FindMyAdvisor'

export default function HomePage() {
  return (
    <div>
      <MainAppbar />
      <AdCarousel />
      <div className="h-6"></div>
      <div className="px-5">
        <GroupChatItem />
      </div>
      <div className="h-6"></div>
      <CategoryContainer />
      <div className="h-6"></div>
      <div className="px-5">
        <AdvisorSort />
      </div>
      <div className="h-6"></div>
      <div className="px-5">
        <AdvisorList />
      </div>
      <FindMyAdvisor />
      <BTB />
    </div>
  )
}
