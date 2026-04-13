import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import Order from "@/models/Order";
import User from "@/models/User";
import Product from "@/models/Product";
import { auth } from "@clerk/nextjs/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20" as any,
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    await connectToDatabase();
    const dbUser = await User.findOne({ clerkId: userId });
    if (!dbUser) return NextResponse.json({ message: "User not found" }, { status: 404 });

    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = await req.json();

    if (orderItems && orderItems.length === 0) {
      return NextResponse.json({ message: "No order items" }, { status: 400 });
    }

    const order = new Order({
      orderItems,
      user: dbUser._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const savedOrder = await order.save();

    // Create a stripe checkout session if payment method is Stripe
    if (paymentMethod === "Stripe") {
      const line_items = orderItems.map((item: any) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
            images: item.image ? [item.image] : [],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        client_reference_id: savedOrder._id.toString(),
        customer_email: dbUser.email,
        success_url: `${process.env.NEXT_PUBLIC_URL}/order/${savedOrder._id}?success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_URL}/order/${savedOrder._id}?canceled=true`,
      });

      return NextResponse.json({ order: savedOrder, sessionId: session.id, url: session.url }, { status: 201 });
    }

    return NextResponse.json({ order: savedOrder }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Failed to create order" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    await connectToDatabase();
    const dbUser = await User.findOne({ clerkId: userId });

    if (dbUser?.role === "admin") {
      // Admin gets all orders
      const orders = await Order.find({}).populate("user", "id firstName lastName email");
      return NextResponse.json(orders, { status: 200 });
    } else {
      // User gets their own orders
      const orders = await Order.find({ user: dbUser._id });
      return NextResponse.json(orders, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch orders" }, { status: 500 });
  }
}
