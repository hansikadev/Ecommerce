import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import Category from "@/models/Category";
import { auth } from "@clerk/nextjs/server";
import User from "@/models/User";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const categories = await Category.find({});
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch categories" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    await connectToDatabase();
    const dbUser = await User.findOne({ clerkId: userId });
    
    if (dbUser?.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const data = await req.json();
    const category = new Category(data);
    await category.save();

    return NextResponse.json(category, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Failed to create category" }, { status: 500 });
  }
}