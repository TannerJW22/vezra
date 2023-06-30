import { ZodStudent } from "@/lib/validators";

import mongoose from "mongoose";
import { z } from "zod";

export const _lockerlocationEnum = ["Main", "Addition"] as const;
export type LockerLocationEnum = (typeof _lockerlocationEnum)[number];

export const _genderEnum = ["Male", "Female", "Other"] as const;
export type GenderEnum = (typeof _genderEnum)[number];

export const _ancestryEnum = [
  "White",
  "Hispanic",
  "Asian",
  "Black",
  "American Indian/Alaskan Native",
  "NativeHawaiian/OtherPacific",
] as const;
export type AncestryEnum = (typeof _ancestryEnum)[number];

export type Student = z.infer<typeof ZodStudent>;

// Mongoose Model
const studentSchema = new mongoose.Schema(
  {
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
    grade: {
      type: String,
      enum: ["K", "1", "2", "3", "4", "5"],
      required: [true, "Grade is required"],
      trim: true,
    },
    dateEnrolled: {
      type: Date,
      required: [true, "Enrollent Date is required"],
    },
    homeroom: {
      type: String,
      trim: true,
    },
    lockerNumber: {
      type: Number,
      trim: true,
    },
    lockerLocation: {
      type: String,
      enum: ["Main", "Addition"],
      trim: true,
    },
    daysAbsent: {
      // <<--| Calc automatically
      type: Number,
      default: 0,
    },
    dateExit: {
      type: Date,
    },
    hasLep: {
      type: Boolean,
      default: false,
    },
    canPhoto: {
      type: Boolean,
      default: false,
    },
    bbcid: {
      type: String,
      default: false,
      trim: true,
    },
    sasid: {
      type: String,
      default: false,
      trim: true,
    },
    lasid: {
      type: String,
      default: false,
      trim: true,
    },
    livesWithBothParent: {
      type: Boolean,
      default: false,
    },
    lastSchoolName: {
      type: String,
      trim: true,
    },
    phone: {
      type: Number,
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
    dob: {
      type: Date,
    },
    SSN: {
      type: Number,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    ancenstry: {
      type: String,
      enum: [
        "White",
        "Hispanic",
        "Asian",
        "Black",
        "American Indian/Alaskan Native",
        "NativeHawaiian/OtherPacific",
      ],
    },
    notes: {
      type: String,
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
        ref: "Contact",
      },
    ],
    // <<--*
  },
  {
    // Options Object
  }
);

export default mongoose.model<Student>("Student", studentSchema);
