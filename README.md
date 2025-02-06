# PayMongo Setup for Next.js

## 🚀 Introduction

This project integrates **PayMongo** into a **Next.js** application, allowing seamless online payments. PayMongo provides APIs for processing payments via credit/debit cards, and e-wallets.

## 📌 Features

- **PayMongo API integration** for secure transactions.
- **Supports multiple payment methods** (GCash, GrabPay, Paymaya, and Credit/Debit Cards).
- **Server-side API routes** for handling transactions securely.
- **Real-time payment status updates.**
- **Next.js API route setup** to interact with PayMongo.

## 📂 Project Structure

```
/paymongo-nextjs-setup
│── /app
│   ├── page.tsx          # Main UI with payment button
│── /app
│   ├── /api
│   │   ├── /paymongo
│   │   │   ├── route.ts   # API route for initiating payments
│   │   ├── /webhook
│   │   │   ├── route.ts   # API route for paymongo response
│── /lib
│   ├── createCheckoutSession.ts        # Helper functions for PayMongo API calls
│── next.config.js         # Next.js configuration
│── .env.local             # Environment variables
│── package.json           # Project dependencies
│── README.md              # Documentation
```

## ⚙️ Installation

1. Clone this repository:

   ```sh
   git clone https://github.com/Marwyn02/paymongo-nextjs-setup.git
   cd paymongo-nextjs-setup
   ```

2. Install dependencies:

   ```sh
   npm install  # or yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add:

   ```env
   PAYMONGO_SECRET_KEY=your_secret_key
   PAYMONGO_PUBLIC_KEY=your_public_key
   ```

   Replace `your_secret_key` and `your_public_key` with your actual **PayMongo API keys**.

4. Start the development server:

   ```sh
   npm run dev  # or yarn dev
   ```

   **⚠️ Important:** This setup requires the website to be **hosted online** for PayMongo API interactions to work properly. It will not function correctly in a local development environment without an internet-accessible server.

## 🔧 Usage

1. Open `http://localhost:3000` in your browser.
2. Click on the **Pay Now** button.
3. The system will generate a PayMongo payment link.
4. Complete the payment using available payment methods.
5. Upon success, you will be redirected to `/success`.
6. If the payment fails, you will be redirected to `/failed`.

## 🔗 API Endpoints

### `POST /api/create-payment`

- **Description:** Creates a PayMongo payment intent.
- **Request Body:**
  ```json
  {
    "amount": 100,
    "currency": "PHP",
    "paymentMethod": "gcash"
  }
  ```
- **Response:**
  ```json
  {
    "checkoutUrl": "https://paymongo.com/checkout/..."
  }
  ```

## 🛠 Technologies Used

- **Next.js** (Frontend & API Routes)
- **PayMongo API** (Payment Processing)
- **TypeScript** (Type Safety)
- **Tailwind CSS** (Styling, if applicable)

## 🔥 Future Improvements

- Implement **webhooks** for real-time payment status updates.
- Add **database integration** for storing transaction history.
- Enhance **error handling and user experience**.

## 🤝 Contributing

Feel free to **fork** this repo, make improvements, and submit a **pull request**! 🚀

## 📝 License

This project is open-source and available under the **MIT License**.

---

💡 **Need help?** Contact me at [jhunmarwynsumargo@gmail.com] or open an issue on GitHub!
