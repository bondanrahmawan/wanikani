import connectDB from "../../../../../../utilities/connectMongo";
import {
	RadicalModel,
	KanjiModel,
	KotobaKanjiModel,
	KotobaKanaModel,
} from "../../../../../../model/commonDocumentModel";

export async function GET(
	request: Request,
	{ params }: { params: { level: string; type: string } }
) {
	const level = params.level;
	const type = params.type.toLowerCase();
	await connectDB();

	const query: any = { "data.level": level };

	var result;

	try {
		if (type == "radical") {
			result = await RadicalModel.find(query);
		} else if (type == "kanji") {
			result = await KanjiModel.find(query);
		} else if (type == "kotobakanji") {
			result = await KotobaKanjiModel.find(query);
		} else if (type == "kotobakana") {
			result = await KotobaKanaModel.find(query);
		}
	} catch (error) {
		console.error("fetch error " + error);
	}

	return new Response(JSON.stringify(result));
}
