import { ActionFunctionArgs, json } from "@remix-run/node";
import { withCors } from "./imagesAdd";


export const action = async ({ request, params }: ActionFunctionArgs) => {
  const headers = withCors();
  try {
    const formData = await request.formData();


    const f2 = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': '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'
      },
      body: JSON.stringify({
        email: formData.get('email'),
        listIds: [2]
      })
    })

    const f3 = await f2.json();
    console.log(f3);
   
    return json({message: 'Vielen Dank für ihr Abbonent. Sie erhalten von uns nun Neuigkeiten über 24Mobility.'}, {headers});

  } catch(e) {
    console.log(e);
    return json({err: 'Es ist ein Fehler unterlaufen'}, {headers});
  }
};