import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { login, requireUserSession } from "~/data/auth.server";
import { deleteCar } from "~/data/db/deleteCar";

export default function AuthForm() {
  const errors = useActionData();
  return (
    <section className="login flex jc fd-column">
      <h2>Login</h2>
      <img src="../../../images/gg.png" alt="Logo" />
      { errors && errors === 'Passwort falsch' && <p style={{color: '#333'}}>{ errors }</p> }
      <Form method="post" name="login-form" className="form-login" encType="multipart/form-data">
        <input type="hidden" name="form" value="login" />
        <input type="hidden" name="login" value="1" />
        <input type="password" name="password" placeholder="Passwort eingeben" />
        <button type="submit">
          Einloggen
        </button>
      </Form>
    </section>
  )
};

export const action: ActionFunction = async ({request, response}) => {
  try {
    const form = await request.formData();

    console.log(form.get('form'));
   
    const obj: { car_id: string; } = Object.fromEntries(form) as {car_id: string};

    switch(form.get('form')) {
      case 'delete_car':
      //  await deleteCar(obj.car_id);
      return true;
      break;
      case 'login':
        const dl = await login({password: form.get('password')});
          return dl;
      break;
    }

    return true;
  } catch(e) {
    console.log(e);
    return e;
  }
};

export const loader: LoaderFunction = async ({ request }) => {
  const userID = await requireUserSession(request);
  console.log(userID);
  return userID;
}