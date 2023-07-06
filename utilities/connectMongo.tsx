import mongoose from "mongoose";

const connectDB = async () => {
	try {
		await mongoose.connect(
			"mongodb+srv://admin:Administrator@cluster0.1dj9w0e.mongodb.net/wanikani"
			// "mongodb://127.0.0.1:27017/admin"
		);
		console.log("MongoDB connected");
	} catch (err) {
		console.error("MongoDB connection error:", err);
		process.exit(1);
	}
};

export default connectDB;
