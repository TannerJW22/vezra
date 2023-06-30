import mongoose from "mongoose";
import { z } from "zod";

export const _contactTypeEnum = [
  "Parent",
  "Guardian",
  "Emergency",
  "ReleaseOnly",
  "Other",
] as const;
export type ContactTypeEnum = (typeof _contactTypeEnum)[number];

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

export const ZodContact = z.object({
  type: z.enum(_contactTypeEnum),
  lastName: z.string(),
  firstName: z.string(),
  phone: z.number().optional(),
  email: z.string().optional(),
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.number().optional(),
  bbcid: z.string().optional(),
  bciExpires: z.date().optional(),
  notes: z.string().optional(),
  students: z.array(z.unknown()).optional(), // <<--| {unknown()} bypasses circular dependency (couldnt solve)
  createdAt: z.date().optional(), // <<--|
  updatedAt: z.date().optional(), // <<--|
});
export type Contact = z.infer<typeof ZodContact>;

export default mongoose.model<Contact>("Contact", contactSchema);
