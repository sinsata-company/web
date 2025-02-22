import Image from 'next/image'

const UserLevelIcon = ({
  level,
  width,
  height,
}: {
  level: string
  width?: number
  height?: number
}) => {
  return (
    <Image
      src={'/images/membership/' + level + '.png'}
      width={width ?? 24}
      height={height ?? 24}
      alt="level"
    />
  )
}

export default UserLevelIcon
