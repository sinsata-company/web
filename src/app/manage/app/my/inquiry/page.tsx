'use client'

import { useEffect, useState } from 'react' 
import MainAppbar from '@/components/common/MainAppbar'
import { useRouter } from 'next/navigation'   
import Image from 'next/image'  
import { getInquiryList } from '@/app/api/chat'
import { getCustomerAll, CutomerChatInquiryDto, TeacherChatInquiryDto, getTeacherAll } from '@/app/api/data'   
import { getMyInfo } from '@/app/api/user'
import { UserDto } from '@/types/user'
import UserLevelIcon from '@/components/common/UserLevelIcon'

export default function InquiryList() {
  const [inquiries, setInquiries] = useState<TeacherChatInquiryDto[]>([])
  const router = useRouter()
  const [user, setUser] = useState<UserDto | null>(null)

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await getTeacherAll()
        setInquiries(response as unknown as TeacherChatInquiryDto[])
        const user = await getMyInfo()
        setUser(user)

        console.log(response);
    
      } catch (error) {
        console.error('Failed to fetch inquiries:', error)
        setInquiries([])
      }
    }
    fetchInquiries()
    
    // 실제 API 구현 시 대체 필요
    // const mockData: InquiryItem[] = [
    //   {
    //     id: 1,
    //     title: '테스트',
    //     inquiryNumber: '관대한 고릴라 4798',
    //     unreadCount: 10,
    //     thumbnail: '/images/test-avatar.png'
    //   },
    //   {
    //     id: 2,
    //     title: '상담 문의',
    //     inquiryNumber: '관대한 고릴라 4798',
    //     unreadCount: 1,
    //   }
    // ]
    // setInquiries(mockData)
  }, [])

  const TEACHER_TYPE_MAP: { [key: string]: string } = {
    'SINJEOM': '신점',
    'SAJU': '사주',
    'TARO': '타로',
    'MIND': '심리'
  }

  return (
    <div className="h-screen bg-white">
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
            <h1 className="ml-4 text-lg font-semibold">1:1 문의내역</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-14 pb-4 max-w-screen-xl mx-auto">
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col">
            {inquiries.map((inquiry: TeacherChatInquiryDto, index: number) => ( 
              <div 
                key={inquiry.id ? `inquiry-${inquiry.id}` : `inquiry-${index}`}
                className="border-b p-4 flex items-center justify-between cursor-pointer"
                onClick={() => {
                  if (inquiry.type === 'CHAT') {
                    inquiry.id && router.push(`/manage/app/chats/inquiry/${inquiry.id}`)
                  } else if (inquiry.type === 'INQUIRY') {
                    console.log('inquiry.id', inquiry)  
                    if (inquiry?.inquiryStatus === 'PENDING') {
                      // 답변 대기 상태일 경우 답변 작성 화면으로 이동
                      router.push(`/manage/app/my/inquiry/answer/${inquiry.id}?level=${user?.level}&nickname=${user?.nickname}`)
                    } else if (inquiry?.inquiryStatus === 'CONFIRMED') {
                      // 답변 완료 상태일 경우 채팅 상세 화면으로 이동
                      router.push(`/manage/app/my/inquiry/new/${inquiry?.id}`)
                    }
                  }
                }}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    {inquiry.type === 'CHAT' || inquiry.type === 'INQUIRY' ? (
                      inquiry?.products?.productImage ? (
                        <div className="flex items-center gap-4">
                          <div className="relative w-12 h-12 mr-4">
                            <div className="w-12 h-12 rounded-md overflow-hidden">
                              <Image 
                                src={inquiry?.products?.productImage}
                                alt="프로필"
                                width={60}
                                height={48}
                                className={`w-full h-full ${inquiry.type === 'CHAT' ? 'object-cover' : 'object-fill'}`}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
                            <span className="text-gray-500 text-sm">
                              {inquiry.type === 'CHAT' ? '채팅' : '상담'}
                            </span>
                          </div>
                          
                          {inquiry.type === 'INQUIRY' && (
                            <div className="ml-2 px-3 py-1 rounded-full text-sm" style={{
                              backgroundColor: inquiry.inquiryStatus === 'PENDING' ? '#FEE2E2' : '#DBEAFE',
                              color: inquiry.inquiryStatus === 'PENDING' ? '#EF4444' : '#3B82F6'
                            }}>
                              {inquiry.inquiryStatus === 'PENDING' ? '답변대기' : '답변완료'}
                            </div>
                          )}
                        </div>
                      )
                    ) : null}
                    <div className="flex flex-col justify-center min-w-0">
                      
                      <div className="font-medium truncate mt-0.5 text-sm">
                        {inquiry?.products?.productName}
                      </div>
                      <div className="text-sm text-gray-500 mt-0.5">{inquiry?.products?.price}</div>
                    </div>
                  </div>
                  
                  <div className="relative flex flex-col items-end">
                    <div className="flex items-center gap-1 text-sm">
                      <UserLevelIcon level={inquiry?.userLevel ?? ''} width={16} height={16} />
                      <span>{inquiry?.users?.nickname}</span>
                    </div>
                    <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                      채팅문의
                    </button>
                    {inquiry?.totalUnreadCount > 0 && (
                      <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {inquiry?.totalUnreadCount}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
} 