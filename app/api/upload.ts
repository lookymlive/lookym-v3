import { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const file = req.body.file;
    try {
      const uploadResult = await cloudinary.uploader.upload(file, {
        folder: 'lookym-v3',
        public_id: 'example-video',
        resource_type: 'video',
      });
      res.status(201).json(uploadResult);
    } catch (error) {
      res.status(500).json({ message: 'Error al subir archivo' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;