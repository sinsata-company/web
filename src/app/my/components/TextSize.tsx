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
    <div className="p-4">
      <h1 className="text-lg font-bold mb-3">글꼴 & 글씨 크기</h1>
      <div className="flex gap-3 items-center">
        <div>
          <label className="block text-sm text-gray-600 mb-1">폰트</label>
          <select
            value={fontFamily}
            onChange={handleFontChange}
            className="border border-gray-200 text-sm p-1.5 rounded-md bg-white shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
          >
            {fonts.map((font) => (
              <option key={font.className} value={font.className}>
                {font.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">크기</label>
          <select
            value={fontSize}
            onChange={handleSizeChange}
            className="border border-gray-200 text-sm p-1.5 rounded-md bg-white shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
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
