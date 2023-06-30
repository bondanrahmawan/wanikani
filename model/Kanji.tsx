import { Schema, model, models } from "mongoose";
import { Meaning, Reading } from "./commonTypes";

const KanjiSchema: Schema = new Schema(
	{
		id: Number,
		data: {
			level: Number,
			slug: String,
			document_url: String,
			characters: String,
			meanings: Array<Meaning>,
			readings: Array<Reading>,
		},
	},
	{ collection: "kanji" }
);

const KanjiModel = models.KanjiModel || model("KanjiModel", KanjiSchema);

export default KanjiModel;
