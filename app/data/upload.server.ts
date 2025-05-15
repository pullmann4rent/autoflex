import cloudinary from 'cloudinary';
import { writeAsyncIterableToWritable } from '@remix-run/node';

cloudinary.v2.config({
  cloud_name: 'do8ssnxjw',
  api_key: '978835928878837',
  api_secret: '3YQW-xMQV3uADrCM8x7iV_PzqNI'
});

async function uploadImage(data: any) {
      const uploadPromise = new Promise(async (resolve, reject) => {
          const uploadStream = cloudinary.v2.uploader.upload_stream(
              { folder: "uploads" },
              (error, result) => {
                  if (error) {

                      reject(error)
                    return;
                 }
                  resolve(result)
              }
          )
          await writeAsyncIterableToWritable(data, uploadStream);
      });
        return uploadPromise;
}

export { uploadImage };