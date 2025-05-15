import { json } from "@remix-run/node";
import pool from "~/data/db.server";
import { stripe } from "~/data/stripe_new";

export const action = async ({ request, params }) => {
  try { 
    let kilometerPacket = 0;
    let actionDelete = false;
    let bid = null;
    let finish = false;
    let secret = '';
    
    const d: {
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
    } = await request.json();

    const contract = await pool.query('SELECT price FROM car_contract WHERE id = $1 LIMIT 1;', [d.contract_id]);
    const km = await pool.query('SELECT price FROM car_km WHERE id = $1 LIMIT 1;', [d.km_id]);

    const priceContract = contract.rows[0].price;
    const priceKM = km.rows[0].price;

    const endPrice = parseFloat(priceContract) + parseFloat(priceKM);

    const endPriceForStripe = Math.round(endPrice * 100);

    console.log(endPriceForStripe);
    
/*         const paymentIntent = await stripe.paymentIntents.create({
          amount: parseFloat(pp),
          metadata: {
            info: JSON.stringify(d.info),
            process: JSON.stringify(id)
          },
          payment_method_types: ["card", "paypal", "sofort", "sepa_debit"],
          currency: 'eur'
        });
    
        console.log(paymentIntent);
    
        const payment_id = paymentIntent.id;
    
        secret = paymentIntent.client_secret;
        console.log(payment_id);
 */
    return json({
      client_secret: secret ?? '',
      endPrice
    })
  } catch(e) {
    console.log(e);
    return e;
  }
};

export const loader = () => {
  return json({});
}