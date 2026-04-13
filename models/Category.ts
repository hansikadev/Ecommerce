import { Schema, model, models } from "mongoose";

const CategorySchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  image: { type: String },
  parentCategory: { type: Schema.Types.ObjectId, ref: "Category", default: null },
  createdAt: { type: Date, default: Date.now },
});

const Category = models.Category || model("Category", CategorySchema);
export default Category;
