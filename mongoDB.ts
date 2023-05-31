import mongoose from "mongoose";

const connection: any = {};

(async function dbConnect() {
	if (connection.isConnected) {
		return;
	}

	try {
		const db: any = await mongoose.connect(process.env.DATABASE_URL as string);

		connection.isConnected = db.connections[0].readyState;

		console.log("MongoDB Connected");
	} catch (error) {
		console.log(error);
	}
})();
