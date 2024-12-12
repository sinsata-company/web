import MainAppbar from '@/components/common/MainAppbar'
import AdCarousel from './components/AdCarousel'
import CategoryContainer from './components/CategoryContainer'

export default function HomePage() {
  return (
    <div>
      <MainAppbar />
      <AdCarousel />
      <CategoryContainer />
    </div>
  )
}
