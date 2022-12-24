import mongoose, { Schema } from "mongoose";

const attemptSchema = mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  setting: { type: String, required: true },
  completed: { type: Number, required: true, default: 0 },
  incorrect: { type: Number, required: true, default: 0 },
  time: { type: Number, required: true },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model("Attempt", attemptSchema);
