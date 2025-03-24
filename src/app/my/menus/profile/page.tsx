'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getMyInfo, updateprofile, changePassword } from '@/app/api/user'
import { Button, BUTTON_TYPE } from '@/components/common/Button'
import Input from '@/components/common/Input'
import { UserDto } from '@/types/user'
import PasswordCheckModal from '../../components/PasswordCheckModal'
import Modal from '@/components/common/Modal'

export default function ProfilePage() {
  const router = useRouter()
  const [nickname, setNickname] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [me, setMe] = useState<UserDto | null>(null)
  const [showPasswordModal, setShowPasswordModal] = useState(true)
  const [isVerified, setIsVerified] = useState(false)
  
  // 비밀번호 변경 모달 관련 상태
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  useEffect(() => {
    const verified = sessionStorage.getItem('profile_verified');
    if (verified) { 
      setIsVerified(true);
      setShowPasswordModal(false);
      reload();
    }
  }, []);

  const reload = () => {
    getMyInfo().then((res) => {
      setMe(res)
      setNickname(res.nickname)
      setPhoneNumber(res.phoneNum)
    })
  }

  const handlePasswordChange = async () => {
    // 새 비밀번호 유효성 검사
    if (newPassword.length < 8) {
      setPasswordError('새 비밀번호는 8자 이상이어야 합니다.')
      return
    }
    
    if (newPassword !== confirmPassword) {
      setPasswordError('새 비밀번호가 일치하지 않습니다.')
      return
    }

    try {
      await changePassword(currentPassword, newPassword)
      alert('비밀번호가 성공적으로 변경되었습니다.')
      resetPasswordForm()
      setShowChangePasswordModal(false)
      router.push('/my')
    } catch (error) {
      setPasswordError('현재 비밀번호가 올바르지 않습니다.')
    }
  }

  const resetPasswordForm = () => {
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setPasswordError('')
  }

  if (!isVerified) {
    return (
      <PasswordCheckModal
        isOpen={showPasswordModal}
        onClose={() => {
          router.back()
        }}
        onVerified={() => {
          setIsVerified(true)
          setShowPasswordModal(false)
          reload()
        }}
      />
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <Input
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        name="닉네임"
        placeholder="닉네임을 입력해주세요."
      />
      <Input
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        name="전화번호"
        placeholder="전화번호 입력해주세요."
      />
      
      {/* 비밀번호 변경 버튼 */}
      <Button
        label="비밀번호 변경"
        onClick={() => setShowChangePasswordModal(true)}
        buttonType={BUTTON_TYPE.secondary}
      />

      {/* 비밀번호 변경 모달 */}
      <Modal
        title="비밀번호 변경"
        isOpen={showChangePasswordModal}
        onClose={() => {
          setShowChangePasswordModal(false)
          resetPasswordForm()
        }}
      >
        <div className="p-4">
          <div className="flex flex-col gap-4">
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              name="현재 비밀번호"
              placeholder="현재 비밀번호를 입력해주세요."
            />
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              name="새 비밀번호"
              placeholder="새 비밀번호를 입력해주세요. (8자 이상)"
            />
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              name="새 비밀번호 확인"
              placeholder="새 비밀번호를 다시 입력해주세요."
            />
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
            <div className="flex justify-end gap-2 mt-2">
              <Button
                label="취소"
                onClick={() => {
                  setShowChangePasswordModal(false)
                  resetPasswordForm()
                }}
                buttonType={BUTTON_TYPE.secondary}
              />
              <Button
                label="변경하기"
                onClick={handlePasswordChange}
                buttonType={BUTTON_TYPE.primary}
              />
            </div>
          </div>
        </div>
      </Modal>

      <Button
        label="수정하기"
        onClick={async () => {
          try {
            await updateprofile({ nickname, phoneNum: phoneNumber })
            alert("수정이 완료되었습니다.")
            sessionStorage.removeItem('profile_verified')
            router.push('/my')
          } catch (error) {
            console.log('error!!', error)
            alert("이미 중복되는 전화번호가 존재합니다.")
          }
        }}
        buttonType={BUTTON_TYPE.primary}
      />

        {/*<div className="mt-5">*/}
        {/*    <h2>찜 목록</h2>*/}
        {/*</div>*/}
    </div>
  )
}
