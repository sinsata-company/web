'use client'

import Image from 'next/image'
import Link from 'next/link'
import { TeacherListDto } from '@/app/api/data'

interface AdvisorCardProps {
  advisor: TeacherListDto
  onLikeClick: () => void
}

export default function AdvisorCard({ advisor, onLikeClick }: AdvisorCardProps) {
  return (
    <Link href={`/advisor/${advisor.id}`}>
      <div className="bg-white rounded-lg shadow p-4 flex items-start space-x-4">
        <div className="relative w-20 h-20 flex-shrink-0">
          <Image
            src={advisor.thumbnail || '/images/default-profile.png'}
            alt={advisor.name}
            className="rounded-full object-cover"
            fill
            sizes="80px"
          />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg">{advisor.name}</h3>
            <span className="text-sm text-gray-500">{advisor.teacherType}</span>
          </div>
          
          <div className="mt-1 text-sm text-gray-600">
            {advisor?.introduction}
          </div>
          
          <div className="mt-2 text-sm text-gray-700 line-clamp-2">
            {advisor?.introduction}
          </div>

          <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
            <div>경력 {advisor?.experience}년</div>
            <div>리뷰 {advisor?.reviewCount}개</div>
            <div>평점 {advisor?.rating.toFixed(1)}</div>
          </div>
        </div>
      </div>
    </Link>
  )
} 