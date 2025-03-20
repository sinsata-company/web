'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { InquiryResponseDto, TeacherChatInquiryDto } from '@/app/api/data'
import { getInquiryById, updateInquiry } from '@/app/api/chat'
import { getInquiryDetails, getMyInfo } from '@/app/api/user'
import { UserDto } from '@/types/user'
import UserLevelIcon from '@/components/common/UserLevelIcon'
export default function InquiryAnswer() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const [inquiry, setInquiry] = useState<InquiryResponseDto | null>(null)
  const [answer, setAnswer] = useState('')
  const [user, setUser] = useState<UserDto | null>(null)

  // URL 파라미터에서 user 정보 추출
  const userLevel = searchParams.get('level')
  const userNickname = searchParams.get('nickname')


  useEffect(() => {
    initialize(params.id as unknown as number)
    
  }, [params.id as unknown as number])

  const initialize = async (inquiryId: number) => {

    const inquiryResponse = await getInquiryDetails(inquiryId)
    setInquiry(inquiryResponse)
  }


  const handleSubmit = async () => {
    try {
      // TODO: API 구현 후 실제 답변 제출 로직 추가
      await updateInquiry(params.id as unknown as string, answer)
      router.push('/manage/app/my/inquiry')
    } catch (error) {
      console.error('Failed to submit answer:', error)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
        <div className="max-w-screen-xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={() => router.back()} 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            {/* <h1 className="ml-4 text-lg font-semibold">{inquiry?.status === 'PENDING' ? '[답변대기]' : '[답변완료]'}</h1> */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-14 pb-4 px-4 max-w-screen-xl mx-auto">
        <div className="mt-4">
          {/* User Info and Status */}
          <div className="flex items-center justify-between mb-4">
            {/* Left side - User Info */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <UserLevelIcon level={userLevel ?? ''} width={16} height={16} />
                <span className="text-sm font-medium">{userNickname}</span>
              </div>
              <div className="text-base font-medium text-gray-500">상담문의</div>
            </div>
            
            {/* Right side - Status and Date */}
            <div className="flex flex-col items-end">
              <div className="text-sm font-medium text-red-500 mb-1">
                {inquiry?.status === 'PENDING' ? '답변대기' : '답변완료'}
              </div>
              <div className="text-sm text-gray-500">
                {inquiry?.createdAt && new Date(inquiry.createdAt).toLocaleString('ko-KR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-4"></div>

          {/* Question */}
          <div className="mb-6">
            <p className="text-gray-700">{inquiry?.userContent}</p>
          </div>

          {/* Answer Input */}
          <div className="mt-4">
            <textarea
              className="w-full h-48 p-4 border rounded-lg resize-none"
              placeholder="답글 내용을 입력해주세요."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <button
              onClick={() => router.back()}
              className="py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              취소
            </button>
            <button
              onClick={handleSubmit}
              className="py-3 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              등록하기
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}