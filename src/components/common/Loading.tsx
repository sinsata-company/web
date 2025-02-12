import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const Loading = () => {
  const [index, setIndex] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex % 4) + 1)
    }, 800)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="absolute"
      style={{
        textAlign: 'center',
        width: '100%',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.5)',
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
        style={{
          position: 'absolute',
          top: 'calc(50% - 90px)',
          left: 'calc(50% - 90px)',
          transform: 'translate(-50%, -50%)',
          transformOrigin: '50% 50%',
        }}
      >
        <Image
          src={'/images/sst-loading.svg'}
          width={180}
          height={180}
          alt="Loading"
          style={{
            display: 'block',
            margin: '0 auto',
          }}
        />
      </motion.div>

      <Image
        src={`/images/sst-loading-${index}.png`}
        width={140}
        height={140}
        alt="Loading-t"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  )
}

export default Loading
