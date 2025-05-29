import { useNavigate } from "@remix-run/react";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const paymentElementOptions = {
  layout: "accordion"
}

export interface IMetaData {
  surname: string;
  lastname: string;
  email: string;
  phone: string;
  birthday: string;
  street: string;
  streetNumber: string;
  plz: string;
  city: string;
  company: string | null;
  legalForm: string | null;
  client: 'privat' | 'legal';
}

export const CheckoutForm = ({
  car_id,
  contract_id,
  km_id,
  km,
  contract,
  shipping_date,
  color,
  metadata,
  car,
  price
}: { car_id: number; km: number; shipping_date: string; contract: number; price: number; car: string; km_id: number; contract_id: number; color: string; metadata: IMetaData; }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errMsg, setErrMsg] = useState<string>('');

  const navigate = useNavigate();
  
  const [carabo, setCarabo] = useState<any>();

  const [loader, setLoader] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('');
  const [load, setLoad] = useState<boolean>(false);

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    setLoader(true);

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();

    const rd = await stripe.createRadarSession();

    console.log('RADAR');
    console.log(rd);

    if (submitError?.message) {
      // Show error to your customer
      setErrMsg(submitError.message);
      setLoader(false);
      return;
    }

    const res = await fetch('http://localhost:5173/confirm_payment', {
      method: 'POST',
      body: JSON.stringify({
        ...metadata,
        car_id,
        contract_id,
        km_id,
        km,
        contract,
        shipping_date,
        color,
        metadata,
        car,
        price
      })
    });

    const { client_secret, verify_token, endPrice } = await res.json();

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      clientSecret: client_secret,
      confirmParams: {
        return_url: "http://localhost:5173/success_payment",
      },
      redirect: 'if_required'
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
      setErrorText(result.error.message);
      setLoader(false);
    } else {
      console.log('HIIII');

      console.log(contract);

      const fetchMail = await fetch('http://localhost:5173/send_verify_mail', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          ...metadata,
          car_id,
          contract_id,
          km_id,
          km,
          contract,
          shipping_date,
          color,
          metadata,
          car,
          price: endPrice
        })
      });

      const res = await fetchMail.json();

      navigate('/success_payment');
      setLoader(false);

      console.log(res);
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };
  return (
    <section>
      <section className="checkout-con">
        {
          errorText && <p>{errorText}</p>
        }
        <form onSubmit={handleSubmit}>
          <PaymentElement options={paymentElementOptions} />

          <div className="checkout-btn-con">
            <button className="pay-btn" disabled={!stripe}>{ loader ? <ClipLoader size={16} color="#fff" /> : `Bezahlen ${price}€` }</button>
          </div>
        </form>
      </section>
    </section>
  )
};