import "dotenv/config";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const bucketName = process.env.S3_BUCKET!;
const region = process.env.S3_REGION!;

const s3Client = new S3Client({
  region: region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const upload = async (file: Express.Multer.File, directory: string) => {
  const key = `${directory}/${Date.now().toString()}-${file.originalname}`;
  const result = await s3Client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    })
  );

  console.log(result);
  
  return `https://${bucketName}.s3.${region}.amazonaws.com/${key}`
};

export default {
  upload,
};
