// components/FontWidget.js

import { useAppContext } from '@/context/AppContext'

const fonts = [
  { name: 'Sans', className: 'font-sans' },
  { name: 'Serif', className: 'font-serif' },
  { name: 'Mono', className: 'font-mono' },
  { name: 'Pretendard', className: 'font-Pretendard' },
]

const fontSizes = [
  { name: 'Small', className: 'text-sm' },
  { name: 'Base', className: 'text-base' },
  { name: 'Large', className: 'text-lg' },
  { name: 'XL', className: 'text-xl' },
]

export default function FontWidget() {
  const context = useAppContext()
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  const { fontFamily, fontSize, setFontFamily, setFontSize } = context

  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFontFamily(e.target.value)

    localStorage.setItem('fontFamily', e.target.value)
  }

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFontSize(e.target.value)
    localStorage.setItem('fontSize', e.target.value)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">글꼴 & 글씨 크기 변경 위젯</h1>
      <div className="flex gap-4 items-center">
        <div>
          <label className="block mb-1">폰트 패밀리</label>
          <select
            value={fontFamily}
            onChange={handleFontChange}
            className="border p-2 rounded"
          >
            {fonts.map((font) => (
              <option key={font.className} value={font.className}>
                {font.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">글씨 크기</label>
          <select
            value={fontSize}
            onChange={handleSizeChange}
            className="border p-2 rounded"
          >
            {fontSizes.map((size) => (
              <option key={size.className} value={size.className}>
                {size.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
