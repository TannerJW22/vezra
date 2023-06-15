import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "Username is required"],
		trim: true,
	},
	role: {
		type: String,
		enum: ["admin", "staff"],
		required: [true, "Email is required!"],
		default: "staff",
		trim: true,
	},
});

export type ContactSchema = {
	_id: string;
	username: string;
	role: "admin" | "staff";
};

export default mongoose.models.contactSchema ||
	mongoose.model<ContactSchema>("Contact", contactSchema);
