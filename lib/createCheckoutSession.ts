/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios";

const BASE_URL = process.env.BASE_URL;
const PAYMONGO_SECRET_KEY = process.env.PAYMONGO_SECRET_KEY;

export const createCheckoutSession = async (
  amount: number,
  currency: string,
  description: string
) => {
  console.log("Hello from createCheckoutSession");

  const success_url = `${BASE_URL}/success`;
  const cancel_url = `${BASE_URL}`;

  try {
    const response = await axios.post(
      "https://api.paymongo.com/v1/checkout_sessions",
      {
        data: {
          attributes: {
            amount,
            currency,
            description,
            payment_method_types: ["card", "paymaya", "gcash", "grab_pay"],
            merchant: "Dummy Test Payment Page",
            line_items: [
              {
                name: "Jasmine Rice 25kg",
                quantity: 1,
                amount,
                currency,
              },
            ],
            redirect: {
              success: `${BASE_URL}/success`,
              failed: `${BASE_URL}/failed`,
            },
            send_email_receipt: true,
            success_url,
            cancel_url,
          },
        },
      },
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            PAYMONGO_SECRET_KEY + ":"
          ).toString("base64")}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error(
      "Error creating checkout session:",
      error.response?.data || error.message
    );
    throw new Error("Failed to create checkout session.");
  }
};
