import type { NextPage } from 'next'
import { useState } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}`);


const Home: NextPage = () => {
  const [amount, setAmount] = useState<number | null>(0)

  const createCheckOutSession = async () => {
    const stripe = await stripePromise;
    const checkoutSession = await axios.post("/api/checkout", {
      amount: amount,
    });

    const result = await stripe?.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result?.error) {
      alert(result?.error.message);
    }
  };
  return (
    <>

<section className="relative flex flex-wrap lg:h-screen lg:items-center font-sans">
  <div className="w-full px-4 py-12 lg:w-1/2 sm:px-6 lg:px-8 sm:py-16 lg:py-24">
    <div className="max-w-lg mx-auto text-center">
      <h1 className="text-2xl font-bold sm:text-3xl">Sponsor me!</h1>

      <p className="mt-4 text-gray-500">
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
    </div>

    <div className="max-w-md mx-auto mt-8 mb-0 space-y-4">
      <div>
        <label  className="sr-only">Enter amount (USD)</label>

        <div className="relative">
          <input
            type="number"
            className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-md"
            placeholder="Enter amount (USD)"
            onChange={e => setAmount(parseInt(e.target.value))}
          />

          <span className="absolute inset-y-0 inline-flex items-center right-4 text-gray-400">
            $
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p></p>
        <button
          className="inline-block px-5 py-3 ml-3 text-sm font-medium text-white bg-blue-500 rounded-lg"
          onClick={createCheckOutSession}
          disabled={!amount}
          role="link"
        >
          Sponsor
        </button>
      </div>
    </div>
  </div>

  <div className="relative w-full h-64 sm:h-96 lg:w-1/2 lg:h-full bg-cover">
    <img
      className="absolute inset-0 object-cover w-full h-full"
      src="bg.webp"
      alt="BG"
    />
  </div>
</section>
    </>
  )
}

export default Home
