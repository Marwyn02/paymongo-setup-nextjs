/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const event = await req.json();

    // Verify the event signature (optional but recommended)
    // This ensures that the request is genuinely from PayMongo

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        // Handle successful checkout session completion
        console.log("Checkout session completed:", event.data.object);
        // Update your database, send confirmation emails, etc.
        break;
      // Add more cases to handle other event types if needed
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: any) {
    console.error("Error processing webhook event:", error.message);
    return NextResponse.json({ error: "Webhook error" }, { status: 400 });
  }
}
