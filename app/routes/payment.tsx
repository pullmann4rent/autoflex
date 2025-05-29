import { Elements} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CheckoutForm, IMetaData } from '~/components/CheckoutForm';

const stripePromise = loadStripe('pk_test_51R34Ic2fV8RKv1lKigRZkK0kysq7HHnHuwJ7CKA2eP4wu9bk0u502WqWD6jcurq0ujSvaSyItIdDpF9p2q2u1Fdf00paJ41Idw');
const options = {
  mode: 'payment',
  payment_method_types: ['card', 'paypal', 'sofort', 'sepa_debit'],
  currency: 'eur',
  amount: 1099,
  appearance: {
    theme: 'flat'
  }
};
export const PaymentStripe = (props: { car_id: number; shipping_date: string; km_id: number; km: number; car: string; price: number; contract: number; contract_id: number; color: string; metadata: IMetaData; }) => {
  return (
    <>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm {...props} />
      </Elements>
    </>
  )
};

export const action = ({ request, params }) => {
  return 'x';
};

export default PaymentStripe;