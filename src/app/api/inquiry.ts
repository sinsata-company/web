interface InquirySubmitRequest {
  content: string
  teacherId: string
}

interface InquirySubmitResponse {
  id: string
  status: 'SUCCESS' | 'FAILED'
}

export async function submitInquiry(data: InquirySubmitRequest): Promise<InquirySubmitResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/inquiries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    throw new Error('Failed to submit inquiry')
  }

  return response.json()
} 