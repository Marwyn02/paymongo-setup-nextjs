/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/createCheckoutSession";

export async function POST(req: Request) {
  try {
    const { amount, currency, description } = await req.json();

    if (!amount || !currency || !description) {
      return NextResponse.json(
        { error: "Missing required parameters." },
        { status: 400 }
      );
    }

    const checkoutSession = await createCheckoutSession(
      amount,
      currency,
      description
    );
    return NextResponse.json(
      { checkoutUrl: checkoutSession.data.attributes.checkout_url },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to create checkout session." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}

// import { NextResponse } from "next/server";

// // Setup for paymongo!

// // Step 1:
// // Set the NGROK http link.

// // Step 2: Go to paymongo, and create a webhook.
// // Set the ngrok url / api / paymongo - which is the file path of your paymongo webhook api (which is this one).

// // Step 3: Set events attribute:
// // source.chargeable, payment.paid, payment.failed

// // And you're done!

// export async function POST(req: Request) {
//   const { data } = await req.json();
//   if (data.attributes.type === "source.chargeable") {
//     const options = {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         Authorization: `Basic ${Buffer.from(
//           process.env.PAYMONGO_SECRET!
//         ).toString("base64")}`,
//       },
//       body: JSON.stringify({
//         data: {
//           attributes: {
//             amount: data.attributes.data.attributes.amount,
//             source: {
//               id: `${data.attributes.data.id}`,
//               type: `${data.attributes.data.type}`,
//             },
//             description: data.attributes.data.attributes.description,
//             currency: "PHP",
//             statement_descriptor:
//               data.attributes.data.attributes.statement_descriptor,
//           },
//         },
//       }),
//     };
//     fetch("https://api.paymongo.com/v1/payments", options)
//       .then((response) => response.json())
//       .then((response) => console.log(response))
//       .catch((err) => console.error(err));
//   }
//   return NextResponse.json({ message: "Webhook Received" }, { status: 200 });
// }
// export async function GET() {
//   return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
// }
