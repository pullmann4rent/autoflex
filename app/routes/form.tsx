import { ActionFunction, json } from "@remix-run/node";
import MailTermin from "~/data/mailMeeting";

export interface IFormData {
  surname: string;
  lastname: string;
  phone: string;
  email: string;
  company: string;
  legal_form: string;
  info: string;
  car: { id: number; model: string; brand: string; } | null;
}

function withCors() {
  const headers = new Headers();

  headers.append('Access-Control-Allow-Origin', '*');

  headers.append(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, referer-path'
  );

  return headers;
}

export const action: ActionFunction = async ({request, params}) => {
  const headers = withCors();
  try {

  const d = await request.text();

  const par = JSON.parse(d) as IFormData;

  const mail_send = await MailTermin(par);

  console.log(mail_send);

  return json({
    success: true
  }, { headers });
 } catch(e) {
  console.log(e);
  return json({
    error: 'Es ist ein fehler aufgetreten.'
  }, { headers });
 }
}