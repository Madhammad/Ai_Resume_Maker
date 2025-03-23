import mongoose from "mongoose";

const summarySchema = new mongoose.Schema({
  
  summarytext: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const summary = mongoose.model("Interview", summarySchema);
