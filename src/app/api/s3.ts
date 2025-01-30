export const uploadImageToS3 = async (file: File) => {
  const fileType = file.type

  // 1. 백엔드에서 S3 서명된 URL 요청
  const res = await fetch('/api/upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fileType }),
  })

  if (!res.ok) {
    throw new Error('Failed to get upload URL')
  }

  const { url, fileName } = await res.json()

  // 2. 서명된 URL을 사용하여 S3에 업로드
  const uploadRes = await fetch(url, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': fileType,

      'Access-Control-Allow-Origin': '*', // CORS 헤더 추가
    },
  })

  if (!uploadRes.ok) {
    console.log(uploadRes)
    throw new Error('Failed to upload image')
  }

  // 3. 이미지 URL 반환
  return `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/uploads/${fileName}`
}
