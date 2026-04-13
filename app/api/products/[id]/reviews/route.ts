import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import Review from "@/models/Review";
import Product from "@/models/Product";
import User from "@/models/User";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { rating, comment } = await req.json();

    if (!rating || !comment) {
      return NextResponse.json({ message: "Please provide both rating and comment" }, { status: 400 });
    }

    const { id } = await params;
    await connectToDatabase();
    
    const product = await Product.findById(id);
    if (!product) return NextResponse.json({ message: "Product not found" }, { status: 404 });

    const dbUser = await User.findOne({ clerkId: userId });
    if (!dbUser) return NextResponse.json({ message: "User not found" }, { status: 404 });

    // Prevent multiple reviews
    const existingReview = await Review.findOne({ product: product._id, user: dbUser._id });
    if (existingReview) {
      return NextResponse.json({ message: "You have already reviewed this product" }, { status: 400 });
    }

    const review = new Review({
      user: dbUser._id,
      product: product._id,
      rating,
      comment
    });

    await review.save();

    // Update product stats
    const allReviews = await Review.find({ product: product._id });
    
    product.numReviews = allReviews.length;
    product.rating = allReviews.reduce((acc: number, current: any) => acc + current.rating, 0) / allReviews.length;
    
    await product.save();

    return NextResponse.json(review, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Failed to submit review" }, { status: 500 });
  }
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const reviews = await Review.find({ product: id }).populate("user", "firstName lastName");
    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch reviews" }, { status: 500 });
  }
}
