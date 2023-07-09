import connectDB from "../../../../../../utilities/connectMongo";
import {
	RadicalModel,
	KanjiModel,
	KotobaKanjiModel,
	KotobaKanaModel,
} from "../../../../../../model/commonDocumentModel";

export async function GET(
	request: Request,
	{ params }: { params: { grade: string; type: string } }
) {
	const grade = parseInt(params.grade, 10);
	const gradeLowerLimit = grade * 5 - 4;
	const gradeUpperLimit = grade * 5;
	const type = params.type.toLowerCase();
	await connectDB();

	const query: any = {
		"data.level": {
			$gte: gradeLowerLimit,
			$lte: gradeUpperLimit,
		},
	};

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
