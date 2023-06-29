import { Schema, model, models } from "mongoose";

const RadicalSchema: Schema = new Schema(
	{
		id: Number,
		data: {
			level: Number,
			slug: String,
			document_url: String,
			characters: String,
		},
	},
	{ collection: "radical" }
);

const RadicalModel =
	models.RadicalModel || model("RadicalModel", RadicalSchema);

export default RadicalModel;
