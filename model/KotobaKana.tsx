import { Schema, model, models } from "mongoose";

interface Meaning {
	meaning: string;
	primary: boolean;
	accepted_answer: boolean;
}

interface ContextSentence {
	en: string;
	ja: string;
}

const KotobaKanaSchema: Schema = new Schema(
	{
		id: Number,
		data: {
			level: Number,
			slug: String,
			document_url: String,
			characters: String,
			meanings: Array<Meaning>,
			context_sentences: Array<ContextSentence>,
		},
	},
	{ collection: "kotoba_kana" }
);

const KotobaKanaModel =
	models.KotobaKanaModel || model("KotobaKanaModel", KotobaKanaSchema);

export default KotobaKanaModel;
