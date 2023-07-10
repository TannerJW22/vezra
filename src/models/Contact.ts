import { ZodContact, contactTypeEnum } from "@/lib/validators";
import mongoose from "mongoose";
import { z } from "zod";

const contactSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Parent", "Guardian", "Emergency", "ReleaseOnly", "Other"],
      required: [true, "Type is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
      trim: true,
    },
    firstName: {
      type: String,
      required: [true, "First Name is required"],
      trim: true,
    },
    phone: {
      type: Number,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    street: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    zip: {
      type: Number,
      trim: true,
    },
    bbcid: {
      type: String,
      trim: true,
    },
    bciExpires: {
      type: Date,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    contacts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    // <<--*
  },
  {
    // Options Object
  }
);

export type ContactTypeEnum = (typeof contactTypeEnum)[number];
export type Contact = z.infer<typeof ZodContact>;

// export default mongoose.model<Contact>("Contact", contactSchema);

export const Contact =
  mongoose.models && "Contact" in mongoose.models
    ? (mongoose.models.Contact as mongoose.Model<Contact>)
    : mongoose.model<Contact>("Contact", contactSchema);
