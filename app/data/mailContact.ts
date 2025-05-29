import nodemailer from 'nodemailer';

export interface IMail {
  company?: string;
  surname: string;
  lastname: string;
  mail: string;
  phone: string;
  anliegen: string;
}

// async..await is not allowed in global scope, must use a wrapper
export default async function Mail({
  name,
  email,
  issue,
  phone,
  car
}: { name: string; email: string; issue: string; car: string; phone: string; }){
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
    let info = await transporter.sendMail({
      from: email, // sender address
      to: "kontakt@24mobility.de", // list of receivers
      subject: "Kontaktanfrage 24Mobility", // Subject line
      text: issue, // plain text body
      html: `
        <p>Name: ${name}</p>
        <p>Email: ${email}</p><br>
        <p>Telefon: ${phone}</p><br>
        <p>Anliegen: ${issue}</p><br>
      `, // html body
    });
    
    if(!info?.messageId) {
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