import { ActionFunction, json } from "@remix-run/node";
import { fileTypeFromBlob } from 'file-type';
import sharp from 'sharp';
import cloudinary from 'cloudinary';
cloudinary.v2.config({
  cloud_name: 'do8ssnxjw',
  api_key: '978835928878837',
  api_secret: '3YQW-xMQV3uADrCM8x7iV_PzqNI'
});


const upload = async(file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer) //  <-- convert to Buffer

  return new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload_stream({ resource_type: "image" }, onDone).end(buffer)

      function onDone(error, result) {
          if (error) {
              return reject({ success: false, error });
          }
          return resolve({ success: true, result })
      }
  });
}

export function withCors() {
  const headers = new Headers();

  headers.append('Access-Control-Allow-Origin', '*');

  headers.append(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, referer-path'
  );

  return headers;
}

export const action: ActionFunction = async ({ request, params }) => {
  const headers = withCors();  
  try {
      let secureURLS: string[] = [];
      const formData = await request.formData();
      console.log(formData);
      console.log(Object.fromEntries(formData));
      const imgs = formData.getAll('images')
      console.log(imgs);
      for(let i = 0; i < imgs.length; i++) {
        let imgSharp;
        console.log(imgs[i]);
        const blobToBuffer = await imgs[i].arrayBuffer();

        const { ext, mime }: { ext: string; mime: string; } = await fileTypeFromBlob(imgs[i]);

        const splitMime = mime.split('/');
  
        const getExtensionFromMime = splitMime[1];

        if(getExtensionFromMime === 'jpeg') {
          imgSharp = await sharp(blobToBuffer).resize(1800).jpeg({quality: 70}).toBuffer();
        } else {
          imgSharp = await sharp(blobToBuffer).resize(1800).png({quality: 70}).toBuffer();
        }

        const buff = Buffer.from(imgSharp);
        const datas = await upload(new Blob([buff]));

        console.log(secureURLS.push(datas.result.secure_url));
  
      }
 
      return json({secureURLS}, {
        headers
      });
    } catch(e) {
      
      console.log(e);
      return json({
        e
      }, {headers})
    }
};