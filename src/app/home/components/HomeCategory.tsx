'use client'

import { useRouter } from 'next/navigation'
import CategoryContainer from './CategoryContainer'

export default function HomeCategory() {
  const router = useRouter()

  return (
    <CategoryContainer
      onClick={(image: string) => {
        router.push('/home/' + image)
      }}
    />
  )
}
