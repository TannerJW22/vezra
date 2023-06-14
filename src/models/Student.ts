import mongoose from "mongoose";

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
		homeroomNumber: {
			type: Number,
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
	},
);

export type studentSchema = {
	lastName: string;
	firstName: string;
	grade: string;
	dateEnrolled: Date;
	homeroomNumber?: string;
	lockerNumber?: string;
	lockerLocation?: "Main" | "Addition";
	daysAbsent?: number;
	dateExit?: Date;
	hasLep?: Boolean;
	canPhoto?: Boolean;
	bbcid?: string;
	sasid?: string;
	lasid?: string;
	livesWithBothParents?: Boolean;
	lastSchoolName?: string;
	phone?: number;
	street?: string;
	city?: string;
	state?: string;
	zip?: number;
	dob?: Date;
	ssn?: number;
	gender?: "Male" | "Female" | "Other";
	ancenstry?:
		| "White"
		| "Hispanic"
		| "Asian"
		| "Black"
		| "American Indian/Alaskan Native"
		| "NativeHawaiian/OtherPacific";
	notes?: string;
	contactIds: contactSchema[];
	createdAt?: Date;
	updatedAt?: Date;
};

export default mongoose.models.studentSchema ||
	mongoose.model<studentSchema>("Student", studentSchema);
