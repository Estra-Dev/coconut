import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      minLength: 5,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      maxLength: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    ownedAssets: {
      type: Array,
      default: [],
    },
    numberOfAssets: {
      type: Number,
      default: 0,
    },
    photoUrl: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR__H-FaeADAspQbggprYkIa8oWFi2yQXs5zCjvV3ZGKA&s",
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);
export default User;
