import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true, select: false },
  isVerified: { type: Boolean, default: false },
  googleId: { type: String }
})

const User = mongoose.models?.User || mongoose.model("User", userSchema)
export default User;

