import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export const config = {
  db_url: process.env.DB_URL,
  port: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
};
