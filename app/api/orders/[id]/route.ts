import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import Order from "@/models/Order";
import User from "@/models/User";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    await connectToDatabase();

    const order = await Order.findById(id).populate("user", "firstName lastName email clerkId");
    
    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    const dbUser = await User.findOne({ clerkId: userId });

    // Ensure the user owns the order or is an admin
    if (order.user.clerkId !== userId && dbUser?.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch order" }, { status: 500 });
  }
}

// Update order status (for admin)
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    await connectToDatabase();
    const dbUser = await User.findOne({ clerkId: userId });
    
    if (dbUser?.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const { status, isDelivered } = await req.json();

    const order = await Order.findById(id);
    if (!order) return NextResponse.json({ message: "Order not found" }, { status: 404 });

    if (status) order.status = status;
    if (isDelivered) {
      order.isDelivered = true;
      order.deliveredAt = new Date();
    }

    const updatedOrder = await order.save();
    return NextResponse.json(updatedOrder, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: "Failed to update order" }, { status: 500 });
  }
}
