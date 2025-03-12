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
      route: 'va',
      title: '부가서비스',
    },
    {
      route: 'withdraw',
      title: '회원탈퇴',
    },
      {
      route: 'inquiry',
      title: '1:1 문의관리',
    },
  ]
  return (
    <div className="w-full flex-col justify-start items-start inline-flex">
      <div className="grid grid-cols-3 gap-3 w-full my-6">
      {menus.map((menu, index) => (
        <div key={index} className="border-gray-100 border-[1px] flex justify-center items-center p-0 shadow-md">
          <ProfileMenuItems route={menu.route} title={menu.title} />
        </div>
      ))}
    </div>
    </div>
  )
}

export default ProfileMenu
