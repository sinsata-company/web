'use client'

import React from 'react'
import { Document, Page } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'

export default function PDFViewer() {
  return (
    <iframe
      src="/privacy.pdf" // public 폴더에 있는 PDF 파일
      width="100%"
      height="100%"
      style={{
        height: '100vh',
      }}
    />
  )
}
