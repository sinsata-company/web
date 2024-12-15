export interface IAdvisor {
  id: number
  profileImage: string[]
  nickname: string
  name: string
  introduction: string
  type: 'sinjeom' | 'saju' | 'taro' | 'mind'
}

export const dummyAdvisors: IAdvisor[] = [
  {
    id: 1,
    profileImage: [
      '/images/samples/gw-1.jpeg',
      '/images/samples/gw-2.jpeg',
      '/images/samples/gw-3.jpeg',
      '/images/samples/gw-4.jpeg',
      '/images/samples/gw-5.jpeg',
      '/images/samples/gw-6.jpeg',
      '/images/samples/gw-7.jpeg',
      '/images/samples/gw-8.jpeg',
      '/images/samples/gw-9.jpeg',
      '/images/samples/gw-10.jpeg',
    ],
    nickname: '광운',
    name: '천명광운',
    introduction: `안녕하세요.
광운 입니다.
3대째세습강신무로써
신의 말씀 가감없이 전달
천지만물 모두가 인과 연으로 이어지듯이
여러분이 이루고자 하는 간절한 바램과
원하는 모든 것을 크게 이루게
도와 드리겠습니다.
사람과 신령님과의 중계자로서
알고자하는 미래, 궁금한 상대방의 마음등
답답한 가슴이 확 트이고
인간중생 험한길에 등불이 되어 드릴겁니다
인연법.애정운.궁합.재물운등
인간사 길흉 제반사 속 시원히 풀어드립니다

신내림은 계룡산에세2002년도에 신내림을받았어요
경신련 민속무속협회`,
    type: 'sinjeom',
  },
  {
    id: 2,
    profileImage: ['/images/samples/profile_taro_sample.webp'],
    nickname: '유라',
    name: '적중타로',
    introduction: `타로 마스터 유라입니다.
살다보면 내가 인생의 길을 잘 가고 있는지 궁금할 때가 아주 많죠~~
이때 누군가의 도움으로 갈길이 훤히 잘 보인다면 얼마나 좋을까요? 그 길을 안내해드리고 싶습니다.
타로 마스터 '유라'와 상의해요~~^^

타로 공부한지는 2년 이상이며, 타로 마스터로 샵 운영도 하고 있습니다. 
명리학도 틈틈히 공부하고 있어 훗날 타로와 사주를 아우르는 그런 사람이 되고 싶습니다.`,
    type: 'taro',
  },
  {
    id: 3,
    profileImage: ['/images/samples/profile_sinjeom_sample.webp'],
    nickname: '성수당',
    name: '성수당',
    introduction: `자기소개글
☆조용한 장소에서 전화해 주세요
☆답을 정해놓고 답을 들을려구 하지마세요
☆성수님들의 공수이기에 기분이 안좋을수두 있구 좋을수두 있어요
☆조언으로 들으시구 폭언은 삼가해주세요
☆음주상담 성적발언 상담 불과 합니다

2017년 신내림 성수대신 불사대신
신장 장군 
현제 홍성 에서 오프라인 현업중`,
    type: 'sinjeom',
  },
  {
    id: 4,
    profileImage: ['/images/samples/profile_taro_sample.webp'],
    nickname: '하남타로',
    name: '리아',
    introduction: `자기소개글
죽을 만큼 힘들 때 노크하세요.

뛰어난 촉으로 그 마음 읽어드릴게요.

겨울이 왜 이렇게 기냐고 답답해하지 마세요. 영원히 올 것 같지 않던 봄도 운명처럼 다가와 있을 거에요.

타로 상담 경력 8년
역학 경력 20년
네이버 엑스퍼트에서 타로 상담사로 활동 중`,
    type: 'taro',
  },
  {
    id: 5,
    profileImage: [
      '/images/samples/dr-1.jpeg',
      '/images/samples/dr-2.jpeg',
      '/images/samples/dr-3.jpeg',
      '/images/samples/dr-4.jpeg',
      '/images/samples/dr-5.jpeg',
    ],
    nickname: '다린',
    name: '다린',
    introduction: `애정, 속마음, 고민상담 전문 컨설팅 다린입니다.
알 수 없는 답답한 미래에 좀 더 현명한 길을 찾을 수 있도록 내담자님의 내면의 힘을 키워 드립니다.
다년간의 상담 경험을 통해 편안하고 공감있는 상담을 하고 있습니다.
사주 상담시 생년월일 필수 이며, 운세와 궁합을 봐 드리고 있습니다.
연애, 궁합, 직업, 사업, 금전문제, 부부문제, 모든 고민 다린과 함께 상담 해 보아요.

현) 오프라인 타로 상담사 활동 중
현) 네이버엑스퍼트 상담사 활동 중
오프라인 타로 이벤트 다수 참여`,
    type: 'taro',
  },
  {
    id: 6,
    profileImage: ['/images/samples/profile_sinjeom_sample.webp'],
    nickname: '마고할매',
    name: '마고할매',
    introduction: `솔직담백한 진실된 마음으로 상담해드립니다.

17년신의길을 가고 있습니다.장군신령님과마고할머니를 모시고 있습니다
`,
    type: 'sinjeom',
  },
  {
    id: 7,
    profileImage: ['/images/samples/profile_sinjeom_sample.webp'],
    nickname: '단비보살',
    name: '단비보살',
    introduction: `사주와 영으로 보는 상담.답답함풀어드립니다.

2017년 대신할머니.작두장군할아버지`,
    type: 'sinjeom',
  },
  {
    id: 8,
    profileImage: ['/images/samples/profile_sinjeom_sample.webp'],
    nickname: '성수보살',
    name: '성수보살',
    introduction: `편하게 속풀이 상담원하시는분

2013년 성수대신할머니 작두별상 약사할아버지`,
    type: 'sinjeom',
  },
  {
    id: 9,
    profileImage: ['/images/samples/profile_taro_sample.webp'],
    nickname: '하라',
    name: '하라',
    introduction: `좋은 방향 제시와 마음 치유로
당신의 고민을 함께!! 해결해 드려요.
남들에게 털어놓지 못하는 고민
시원하게 말씀하세요!
당신의 애착 타로 마스터 하라입니다.

타로심리상담사 1급,2급 취득.
2019년~현재 타로 상담`,
    type: 'taro',
  },
  {
    id: 10,
    profileImage: [
      '/images/samples/y-1.jpeg',
      '/images/samples/y-2.jpeg',
      '/images/samples/y-3.jpeg',
      '/images/samples/y-4.jpeg',
      '/images/samples/y-5.jpeg',
    ],
    nickname: '타로여신',
    name: '타로여신',
    introduction: `뛰어난 직관력과 뛰어난 공감능력으로 고민상담및 해결책을 알려드립니다 
듣기 좋은 말보다 확실한 한마디를 해드리며 
어떤 고민이든 편견없는 상담 해드립니다

제자양성
오프라인상담`,
    type: 'taro',
  },
]
