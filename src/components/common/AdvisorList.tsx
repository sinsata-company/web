'use client'

import { TeacherListDto } from '@/app/api/data'
import AdvisorCard from './AdvisorCard'
import { useSearch } from './SearchContext'

interface AdvisorListProps {
  advisorList: TeacherListDto[]
  changeLiked: (id: string) => void
  lastAdvisorElementRef?: (node: HTMLDivElement) => void
  emptyMessage?: string
}

export default function AdvisorList({ 
  advisorList,
  changeLiked,
  lastAdvisorElementRef,
  emptyMessage = "선생님이 없습니다." 
}: AdvisorListProps) {
  const { searchTerm } = useSearch()

  const filteredAdvisors = advisorList.filter((advisor) =>
    advisor.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="px-4">
      {filteredAdvisors.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          {emptyMessage}
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredAdvisors.map((advisor, index) => (
            <div
              key={advisor.id}
              ref={index === filteredAdvisors.length - 1 ? lastAdvisorElementRef : undefined}
            >
              <AdvisorCard 
                advisor={advisor} 
                onLikeClick={() => changeLiked(advisor.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 