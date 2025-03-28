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

  const safeAdvisorList = Array.isArray(advisorList) ? advisorList : [];
  
  const filteredAdvisors = Array.from(
    new Set(safeAdvisorList.map(advisor => advisor?.id))
  ).map(id => safeAdvisorList.find(advisor => advisor?.id === id))
    .filter(advisor => advisor && advisor.name && typeof advisor.name === 'string' 
      ? advisor.name.toLowerCase().includes((searchTerm || '').toLowerCase())
      : false
    )

  return (
    <div className="px-4">
      {filteredAdvisors.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          {emptyMessage}
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredAdvisors.map((advisor, index) => {
            const key = advisor?.id || `advisor-${index}`;
            
            return (
              <div
                key={key}
                ref={index === filteredAdvisors.length - 1 ? lastAdvisorElementRef : undefined}
              >
                <AdvisorCard 
                  advisor={advisor} 
                  onLikeClick={() => advisor?.id && changeLiked(advisor.id)}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  )
}