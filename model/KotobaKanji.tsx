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

interface ContextSentence {
	en: string;
	ja: string;
}

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
