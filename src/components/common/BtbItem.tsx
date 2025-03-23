import clsx from 'clsx'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

const BTBItem = ({ name, image, url }: { name: string; image: string, url?: string }) => {
    const router = useRouter()
    const pathname = usePathname()
    const selected = pathname.replace('/', '') == image
  
    return (
      <div
        onClick={() => {
            if (url) {
                router.push(url)
                return;
            }
          router.push('/' + image)
        }}
        className="cursor-pointer grow flex-col justify-start items-center  inline-flex max-w-[550px] mx-auto"
      >
        <Image
          src={`/images/btb/${image}${selected ? '_selected' : ''}.svg`}
          height={36}
          width={36}
          alt="btb"
        />
        <div
          className={clsx(
            'self-stretch h-4 text-center text-xs font-normal ',
            selected ? 'text-black' : 'text-zinc-400'
          )}
        >
          {name}
        </div>
      </div>
    )
};

export default BTBItem;
