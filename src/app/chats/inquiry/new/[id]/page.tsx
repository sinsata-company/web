'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { getMyInfo, getInquiryDetails } from '@/app/api/user'
import { UserDto } from '@/types/user'
import UserLevelIcon from '@/components/common/UserLevelIcon'
import { InquiryResponseDto } from '@/app/api/data'
  
export default function InquiryDetail() {
  const router = useRouter()
  const [inquiry, setInquiry] = useState<InquiryResponseDto | null>(null) // TODO: 타입 정의 필요
  const [user, setUser] = useState<UserDto | null>(null)
  const param = useParams()
  const inquiryId = param.id as unknown as number
    

  useEffect(() => {
    getUserDetails()
    initialize()
    
  }, [inquiryId])

  const initialize = async () => {
    const inquiryResponse = await getInquiryDetails(inquiryId)
    setInquiry(inquiryResponse)
  }

  const getUserDetails = async () => {
    const user = await getMyInfo()
    setUser(user)
  }

  const formatDateTime = (dateString: string) => {
    if (!dateString) return '';
    return dateString.replace('T', ' ').split('.')[0];
  };

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="flex items-center p-4">
          <button onClick={() => router.back()} className="mr-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
            <UserLevelIcon level={user?.level ?? ''} />
              <div className="flex flex-col">
                <span className="font-medium">{user?.nickname}</span>
                {/* <span className="text-sm text-gray-500">
                  {inquiry?.status === 'CONFIRMED' ? '답변완료' : '답변대기'}
                </span> */}
              </div>
            </div>
          </div>
          {/* <div className="text-gray-400 text-sm">
            {new Date().toLocaleString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div> */}
        </div>
      </div>

      {/* 질문 & 답변 컨테이너 */}
      <div className="flex-1 p-4">
        {/* 질문 내용 */}
        <div className="mb-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              {inquiry?.status !== 'CONFIRMED' && (
                  <span className="text-blue-500 text-sm mb-1">답변대기</span>
                )}
              <div className="flex flex-col items-end">
              {inquiry?.status !== 'CONFIRMED' && (
                <span className="text-gray-400 text-sm">
                  {formatDateTime(inquiry?.createdAt || '')}
                </span>
              )}
              </div>
            </div>
            <p className="text-gray-800">
              {inquiry?.userContent || '질문 내용이 없습니다.'}
            </p>
          </div>
        </div>

        {/* 답변 내용 */}
        <div className="mb-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500">➜ 답변내용</span>
              <div className="flex flex-col items-end">
                {inquiry?.status === 'CONFIRMED' && (
                  <span className="text-green-500 text-sm mb-1">답변완료</span>
                )}
                {inquiry?.status === 'CONFIRMED' && (
                <span className="text-gray-400 text-sm">
                  {formatDateTime(inquiry?.createdAt || '')}
                </span>
                  )}
              </div>
            </div>
            <p className="text-gray-800">
              {inquiry?.status === 'CONFIRMED' ? (
                inquiry?.teacherContent
              ) : (
                <span className="text-gray-400">
                  아직 답변이 등록되지 않았습니다.
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}