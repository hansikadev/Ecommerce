import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import Product from "@/models/Product";
import User from "@/models/User";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectToDatabase();
    
    // Can also find by slug
    const product = await Product.findById(id).populate("category", "name slug");
    
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch product" }, { status: 500 });
  }
}

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
    const data = await req.json();
    const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });

    if (!updatedProduct) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    await connectToDatabase();
    const dbUser = await User.findOne({ clerkId: userId });
    if (dbUser?.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Product deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete product" }, { status: 500 });
  }
}