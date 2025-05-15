import { ActionFunction, LoaderFunction, json } from "@remix-run/node";
import { getCarsAll } from "~/data/db/getCarsAll";
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
  try {

  const cars = await getCarsAll();

  return json(cars, { headers });
 } catch(e) {
  console.log(e);
  return json({
    error: 'Es ist ein fehler aufgetreten.'
  }, { headers });
 }
}