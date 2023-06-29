import { Schema, model, models } from "mongoose";

interface Meaning {
	meaning: string;
	primary: boolean;
	accepted_answer: boolean;
}

interface Reading {
	type: string;
	primary: boolean;
	reading: string;
	accepted_answer: boolean;
}

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
