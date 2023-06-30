import { Schema, model, models } from "mongoose";
import { Meaning, Reading, ContextSentence } from "./commonTypes";

const KotobaKanjiSchema: Schema = new Schema(
	{
		id: Number,
		data: {
			level: Number,
			slug: String,
			document_url: String,
			characters: String,
			meanings: Array<Meaning>,
			readings: Array<Reading>,
			context_sentences: Array<ContextSentence>,
		},
	},
	{ collection: "kotoba_kanji" }
);

const KotobaKanjiModel =
	models.KotobaKanjiModel || model("KotobaKanjiModel", KotobaKanjiSchema);

export default KotobaKanjiModel;
