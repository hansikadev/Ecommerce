import { Schema, model, models } from "mongoose";

const OrderItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  title: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  image: { type: String },
});

const AddressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
});

const OrderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  orderItems: [OrderItemSchema],
  shippingAddress: AddressSchema,
  paymentMethod: { type: String, required: true, default: "Stripe" },
  paymentResult: {
    id: String,
    status: String,
    update_time: String,
    email_address: String,
  },
  itemsPrice: { type: Number, required: true, default: 0.0 },
  taxPrice: { type: Number, required: true, default: 0.0 },
  shippingPrice: { type: Number, required: true, default: 0.0 },
  totalPrice: { type: Number, required: true, default: 0.0 },
  isPaid: { type: Boolean, required: true, default: false },
  paidAt: { type: Date },
  isDelivered: { type: Boolean, required: true, default: false },
  deliveredAt: { type: Date },
  status: { type: String, enum: ["Processing", "Shipped", "Delivered", "Cancelled"], default: "Processing" },
  createdAt: { type: Date, default: Date.now },
});

const Order = models.Order || model("Order", OrderSchema);
export default Order;
