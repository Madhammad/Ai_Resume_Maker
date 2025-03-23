import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String, required: true, unique: true, trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    username: { type: String, required: true, unique: true, trim: true, },
    password: { type: String, required: true },
    lastlog: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false },
    isAdminRole: {
      type: Boolean,
      default: false
    },
    resetPasswordToken: String, // otp in this token i.e 34535
    resetPasswordExpiresAt: Date,
    verificationToken: String, // otp send to google when sign up
    verificationTokenExpiresAt: Date, // sihn up opt expire data
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcryptjs.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcryptjs.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
