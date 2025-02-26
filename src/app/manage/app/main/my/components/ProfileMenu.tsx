import ProfileMenuItems from './ProfileMenuItems'

export interface IMenuItem {
  route: string
  title: string
}

const ProfileMenu = () => {
  const menus: IMenuItem[] = [
    {
      route: 'time',
      title: '상담 가능 시간 설정',
    },
    {
      route: 'hashtag',
      title: '내 해시태그 관리',
    },
    {
      route: 'notice',
      title: '공지사항 작성',
    },
    {
      route: 'intro',
      title: '내 소개 수정',
    },
    {
      route: 'strength',
      title: '잘하는 분야 수정',
    },
    {
      route: 'qna',
      title: '자주 묻는 질문',
    },
    {
      route: 'withdraw',
      title: '회원탈퇴',
    },
  ]
  return (
    <div>
      {menus.map((menu, index) => (
        <div key={index}>
          <ProfileMenuItems route={menu.route} title={menu.title} />
        </div>
      ))}
    </div>
  )
}

export default ProfileMenu
