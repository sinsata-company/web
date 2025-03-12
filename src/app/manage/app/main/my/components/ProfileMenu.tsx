import ProfileMenuItems from './ProfileMenuItems'
import {
  Album,
  BookHeart,
  CircleHelp,
  Clock,
  FileQuestion,
  Hash,
  ShoppingCart,
  SquareDot,
  UserMinus
} from "lucide-react";

export interface IMenuItem {
  route: string
  title: string
  icon: any
}
const ICON_SIZE = 30;

const ProfileMenu = () => {
  const menus: IMenuItem[] = [
    {
      route: 'time',
      title: '상담 가능 시간 설정',
      icon: <Clock size={ICON_SIZE} />
    },
    {
      route: 'hashtag',
      title: '내 해시태그 관리',
      icon: <Hash size={ICON_SIZE} />
    },
    {
      route: 'notice',
      title: '공지사항 작성',
      icon:<Album size={ICON_SIZE} />
    },
    {
      route: 'intro',
      title: '내 소개 수정',
      icon: <SquareDot size={ICON_SIZE} />
    },
    {
      route: 'strength',
      title: '잘하는 분야 수정',
      icon: <BookHeart size={ICON_SIZE} />
    },
    {
      route: 'qna',
      title: '자주 묻는 질문',
      icon: <CircleHelp size={ICON_SIZE} />
    },
    {
      route: 'va',
      title: '부가서비스',
      icon: <ShoppingCart size={ICON_SIZE} />
    },
    {
      route: 'withdraw',
      title: '회원탈퇴',
      icon: <UserMinus size={ICON_SIZE} />
    },
      {
      route: 'inquiry',
      title: '1:1 문의관리',
        icon: <FileQuestion size={ICON_SIZE} />
    },
  ]
  return (
    <div className="w-full flex-col justify-start items-start inline-flex">
      <div className="grid grid-cols-3 gap-3 w-full my-6">
      {menus.map((menu, index) => (
        <div key={index} className="flex justify-center items-center p-0">
          <ProfileMenuItems icon={menu.icon} route={menu.route} title={menu.title} />
        </div>
      ))}
    </div>
    </div>
  )
}

export default ProfileMenu
