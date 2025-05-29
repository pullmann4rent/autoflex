import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

export default function AuthForm() {
  const errors = useActionData();
  return (
    <section className="login flex jc fd-column">
      <h2>Login</h2>
      <img src="../../../images/gg.png" alt="Logo" />
      { errors && <p style={{color: '#fff'}}>{ errors }</p> }
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