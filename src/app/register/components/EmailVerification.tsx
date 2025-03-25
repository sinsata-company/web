import { getKeyByEmail } from "@/app/api/user";
import { useState } from 'react'

interface EmailVerificationProps {
  onVerificationSuccess: () => void;
}

export default function EmailVerification({ onVerificationSuccess }: EmailVerificationProps) {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const handleVerification = async () => {
    try {
      const data = await getKeyByEmail(name, password, 'EMAIL')
      // 인증 성공 시
      onVerificationSuccess()  // 부모 컴포넌트에 알림
    } catch (error) {
      // 에러 처리
    }
  }

  // ... rest of the component
}       