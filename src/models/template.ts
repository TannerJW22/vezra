import mongoose from "mongoose";

const AbcSchema = new mongoose.Schema({
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

export type AbcSchema = {
	_id: string;
	username: string;
	role: "admin" | "staff";
};

export default mongoose.models.AbcSchema || mongoose.model<AbcSchema>("Abc", AbcSchema);
