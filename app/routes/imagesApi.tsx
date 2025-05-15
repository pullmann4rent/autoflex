import { LoaderFunction, json } from "@remix-run/node";
import { getImages } from "~/data/db/getImages";

function withCors() {
  const headers = new Headers();

  headers.append('Access-Control-Allow-Origin', '*');

  headers.append(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, referer-path'
  );

  return headers;
}

export const loader: LoaderFunction = async ({request, params}) => {
  const headers = withCors();

  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if(!id) {
    return null;
  }

  const images = await getImages(id);

  let imagesOnly: string[] = [];

  images.map((el => {
    imagesOnly.push(el.image);
  }));

  return json({images: imagesOnly}, {
    headers
  });
}