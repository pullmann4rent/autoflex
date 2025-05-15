import { ActionFunction, json } from "@remix-run/node";
import { IFormData } from "./form";
import MailMeeting2 from "~/data/mailMeeting2";

function withCors() {
  const headers = new Headers();

  headers.append('Access-Control-Allow-Origin', '*');

  headers.append(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, referer-path'
  );

  return headers;
}

export interface IFormMeetingCalendar {
  email: string;
  name: string;
  phone: string;
  date: {
    day: number;
    month: number;
    year: number;
  };
  time: string;
}

export const action: ActionFunction = async ({request, params}) => {
  const headers = withCors();
  try {

  const fm = await request.formData();

  let data = JSON.parse(fm.get('json'));

    console.log(data);

  const dm = await MailMeeting2(data);

  console.log(dm);

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