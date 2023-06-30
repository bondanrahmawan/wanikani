import { Schema, model, models } from "mongoose";
import { CharacterImage } from "./commonTypes";

const RadicalSchema: Schema = new Schema(
	{
		id: Number,
		data: {
			level: Number,
			slug: String,
			document_url: String,
			characters: String,
			character_images: Array<CharacterImage>,
		},
	},
	{ collection: "radical" }
);

const RadicalModel =
	models.RadicalModel || model("RadicalModel", RadicalSchema);

export default RadicalModel;
