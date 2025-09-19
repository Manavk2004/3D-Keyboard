import { createClient } from "@/prismicio";
import { asText } from "@prismicio/client";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-07-30.basil" 
});

export async function POST(
  request: NextRequest,
  { params }: { params: { uid: string } }
) {
  try {
    const { uid } = params; // No await needed

    if (!uid) {
      return NextResponse.json({ error: "Missing Product UID" }, { status: 400 });
    }
    const prismicClient = createClient()
    const product = await prismicClient.getByUID("product", uid);

    const name = product.data.name as string
    const price = product.data.price as number
    const image = product.data.image?.url
    const description = asText(product.data.description)

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name,
                        ...(description ? {description} : {}),
                        ...(image ? {images: [image]} : {})
                    }
                }
            }
        ]
    }

  } catch (err) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}