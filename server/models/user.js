import mongoose, { Schema } from "mongoose";

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  friends: { type: [Schema.Types.ObjectId], default: [] },
  requests: { type: [Schema.Types.ObjectId], default: [] },
});

export default mongoose.model("User", userSchema);
