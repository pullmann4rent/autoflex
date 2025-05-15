import { ActionFunction } from "@remix-run/node";
import { validateMail } from "./validate";
import Mail from "~/data/mailContact";

export const action: ActionFunction = async ({request, params}) => {
  try {
    const data = await request.formData();

    const {
      email,
      name,
      phone,
      anliegen
    } = Object.fromEntries(data) as {
      name: string;
      phone: string;
      email: string;
      anliegen: string;
    };
    
    validateMail({email, name, issue: anliegen});

    await Mail({
      email,
      phone,
      name,
      issue: anliegen,
      car: ''
    });

    return true;
  } catch(e) {
    console.log(e);
    return e;
  }
}