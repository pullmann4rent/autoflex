import nodemailer from 'nodemailer';
import { IFormData } from '~/routes/form';


// async..await is not allowed in global scope, must use a wrapper
export default async function MailTermin({
  surname,
  lastname,
  phone,
  email,
  company,
  legal_form,
  info,
  car
}: IFormData){
  try {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      auth: {
        user: "support@renting24.de", // generated ethereal user
        pass: "j34LSsfgBREanH07", // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info_ = await transporter.sendMail({
      from: email, // sender address
      to: "kontakt@24mobility.de", // list of receivers
      subject: "Kontaktanfrage 24Mobility", // Subject line
      text: info, // plain text body
      html: `
        <p>Name: ${surname} ${lastname}</p><br>
        <p>Telefon: ${phone}<p><br>
        <p>E-Mail: ${email}</p><br>
        <p>Unternehmen: ${company}</p><br>
        <p>Rechtsform: ${legal_form}</p><br>
        <p>Info: ${info}</p><br>
        <p>Auto: ${car && (car.brand, car.model)}</p>
      `, // html body
    });
    
    if(!info_?.messageId) {
      return {
        message: 'Es ist ein Fehler unterlaufen. Bitte versuche es erneut.',
        success: false
      }
    }

    return {
      success: true
    }
  } catch(e) {
    console.log(e);
    throw e;
  }
}