import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import Product from "@/models/Product";
import { auth } from "@clerk/nextjs/server";
import User from "@/models/User";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    const query: any = {};
    if (category) query.category = category;
    if (search) query.title = { $regex: search, $options: "i" };

    await connectToDatabase();
    const products = await Product.find(query).populate("category", "name slug");
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    await connectToDatabase();
    const dbUser = await User.findOne({ clerkId: userId });
    
    // Simple admin check based on your role logic
    if (dbUser?.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const data = await req.json();
    const product = new Product(data);
    await product.save();

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Failed to create product" }, { status: 500 });
  }
}