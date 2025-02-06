"use client";

import { useState } from "react";

import Image from "next/image";

const Home = () => {
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);

    try {
      console.log("Sending request");

      const response = await fetch("/api/paymongo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 10000, // Amount in cents (e.g., 1000 = PHP 10.00)
          currency: "PHP",
          description: "Shopping",
        }),
      });

      const data = await response.json();

      if (data.checkoutUrl) {
        window.open(data.checkourUrl, "_blank"); // Redirect to PayMongo checkout
      } else {
        console.error("Checkout URL not found");
      }
    } catch (error) {
      console.error("Error initiating checkout:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="space-y-4 text-center py-4 px-6 border rounded-md">
        <h2 className="font-bold">Payment Item</h2>
        <div>
          <p>
            <b>Amount:</b> 100 PHP
          </p>
          <p>
            <b>Description:</b> Shopping
          </p>
        </div>
      </div>
      <button
        onClick={onSubmit}
        disabled={loading}
        className="font-medium border-white border rounded-md px-6 py-2 hover:bg-white hover:text-black duration-300"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
};

export default Home;
