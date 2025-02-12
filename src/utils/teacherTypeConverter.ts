export const teacherTypeConverter = (type: string) => {
  switch (type) {
    case 'sinjeom':
      return '신점'
    case 'saju':
      return '사주'
    case 'taro':
      return '타로'
    case 'mind':
      return '심리'
    default:
      return '신점'
  }
}
