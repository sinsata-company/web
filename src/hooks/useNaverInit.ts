import { useCallback, useEffect } from 'react'

const useNaverInit = () => {
  const handleNaverInit = useCallback(() => {
    const naver = window.naver
    const naverLogin = new naver.LoginWithNaverId({
      clientId: 'jhsF1FFbQfwtnFulzCl4', //ClientID
      callbackUrl: 'http://localhost:3000/register/oauth/naver', // Callback URL
      callbackHandle: true,
      isPopup: false, // 팝업 형태로 인증 여부
      loginButton: {
        color: 'green', // 색상
        type: 1, // 버튼 크기
        height: '60', // 버튼 높이
      }, // 로그인 버튼 설정
    })
  }, [])

  useEffect(() => {
    handleNaverInit()
  }, [])
}

export default useNaverInit
