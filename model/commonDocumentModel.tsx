import { Schema, model, models } from "mongoose";
import {
	ContextSentence,
	CharacterImage,
	Meaning,
	Reading,
} from "./commonTypes";

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

export const RadicalModel =
	models.RadicalModel || model("RadicalModel", RadicalSchema);

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

export const KanjiModel = models.KanjiModel || model("KanjiModel", KanjiSchema);

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

export const KotobaKanjiModel =
	models.KotobaKanjiModel || model("KotobaKanjiModel", KotobaKanjiSchema);

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

export const KotobaKanaModel =
	models.KotobaKanaModel || model("KotobaKanaModel", KotobaKanaSchema);
