import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import axios from 'axios'

const s3 = new S3Client({
  region: 'ap-northeast-2',
  credentials: {
    accessKeyId: 'AKIAVWABJ3PRQ5YLANYG',
    secretAccessKey: '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',
  },
})

export async function POST(req, res) {
  try {
    const { fileType } = req.body

    if (!fileType) {
      return res.status(400).json({ error: '파일 타입이 필요합니다.' })
    }

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
    }

    const command = new PutObjectCommand(params)
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 })
    return res.status(200).json({ url: signedUrl, fileName })
  } catch (error) {
    console.error('S3 서명 URL 생성 오류:', error)
    return res.status(500).json({ error: '서명된 URL 생성 실패', raw: error })
  }
}
export async function uploadToS3(file, fileType) {
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
      Bucket: 'sinsata',
      Key: key,
      ContentType: fileType,
    }

    const command = new PutObjectCommand(params)
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 })

    await axios.put(signedUrl, file, {
      headers: {
        'Content-Type': fileType,
      },
    })

    const accessUrl = `https://${params.Bucket}.s3.ap-northeast-2.amazonaws.com/${key}`
    return accessUrl
  } catch (error) {
    console.error('S3 업로드 오류:', error)
    throw new Error('파일 업로드 실패')
  }
}
