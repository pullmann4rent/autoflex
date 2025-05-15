import nodemailer from 'nodemailer';

export interface IMail {
  company?: string;
  surname: string;
  lastname: string;
  mail: string;
  phone: string;
  anliegen: string;
}

export interface IMailAbo {
    surname: string;
  lastname: string;
  email: string;
  birthday: string;
  phone: string;
  city: string;
  plz: string;
  client: string;
  street: string;
  streetNumber: string;
  legalForm: string;
  company: string;
  car_id: number;
  contract_id: number;
  km_id: number;
  km: string;
  contract: string;
  shipping_date: string | null;
  color: string;
  car: string;
  price: number;
}

// async..await is not allowed in global scope, must use a wrapper
export default async function Mail({
  surname,
  lastname,
  email,
  street,
  birthday,
  phone,
  city,
  plz,
  client,
  streetNumber,
  legalForm,
  company,
  contract,
  km,
  shipping_date,
  color,
  car,
  price
}: IMailAbo){
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
      text: 'Autoabo Anfrage', // plain text body
      html: `
        <p>Name: ${surname} ${lastname}</p>
        <p>Email: ${email}</p><br>
        <p>Auto: ${car}</p><br>
        <p>Farbe: ${color}</p><br>
        <p>Preis: ${price}</p><br>
        <p>Telefon: ${phone}</p><br>
        <p>Straße & Hausnummer: ${street} ${streetNumber}</p><br>
        <p>Stadt: ${city}</p><br>
        <p>PLZ: ${plz}</p><br>
        <p>Geburtstag: ${birthday}</p><br>
        <p>Kundenart: ${client}</p><br>
        <p>Lieferdatum: ${shipping_date}</p><br>
        <p>Laufzeit: ${contract}</p><br>
        <p>Kilometer: ${km}</p><br>
        <p>Endpreis: ${price}</p><br>
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