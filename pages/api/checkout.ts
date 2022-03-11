const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);
import { NextApiRequest, NextApiResponse } from "next";


const paymentHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { amount } = req.body;
  const url = "http://localhost:3000";

  const items = [
    {
      price_data: {
        currency: "usd",
        product_data: {
          name: `Sponsoring SnowBit`,
        },
        unit_amount: amount * 100,
      },
      quantity: 1,
    },
  ];

  const session = await stripe.checkout.sessions.create({
    line_items: items,
    mode: "payment",
    success_url: `${url}/success`,
    cancel_url: url,
  });

  res.status(200).json({ id: session.id });
};

export default paymentHandler;