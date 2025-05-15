import { LoaderFunction } from "@remix-run/node";
import { getModels } from "~/data/db/getModels";

export const loader: LoaderFunction = async ({request, params}) => {
  const q = new URL(request.url).searchParams;

  console.log(q.get('brand'));
  try {
    let models = null;
    if(q && q.get('brand')) {
      models = await getModels(q.get('brand') as string);
    }

    return models;
  } catch(e) {
    console.log(e);
    return e;
  }
};