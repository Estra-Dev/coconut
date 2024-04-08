import { Schema, model } from "mongoose";

const assetSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    species: {
      type: String,
      default: "king",
    },
    age: {
      type: Number,
      default: "0",
    },
    stage: {
      type: String,
      default: "beginner",
    },
    value: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    instore: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Asset = model("Asset", assetSchema);
export default Asset;
