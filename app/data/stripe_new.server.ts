import Stripe from "stripe";

export const stripe = new Stripe('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', {
  typescript: true,
  apiVersion: '2025-04-30.basil'
});