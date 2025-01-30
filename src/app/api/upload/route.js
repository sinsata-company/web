import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})
export async function POST(req) {
  try {
    const { fileType } = await req.json()

    if (!fileType) {
      return Response.json(
        { error: '파일 타입이 필요합니다.' },
        { status: 400 }
      )
    }

    try {
      const fileExtension =
        fileType === 'image/svg+xml' ? 'svg' : fileType.split('/')[1]
      const fileName =
        `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`.replace(
          /[^a-zA-Z0-9-_]/g,
          ''
        ) + `.${fileExtension}`

      const encodedFileName = encodeURIComponent(fileName)

      const key = `uploads/${encodedFileName}`

      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key,
        ContentType: fileType,
        // ACL: 'public-read',
      }

      const command = new PutObjectCommand(params)
      const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 })
      return Response.json({ url: signedUrl, fileName })
    } catch (error) {
      console.error('S3 서명 URL 생성 오류:', error)
      return Response.json({ error: error }, { status: 500 })
    }
  } catch (error) {
    console.error('S3 서명 URL 생성 오류:', error)
    return Response.json(
      { error: '서명된 URL 생성 실패', raw: error },
      { status: 500 }
    )
  }
}
