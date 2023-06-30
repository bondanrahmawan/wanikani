import connectDB from "../../../../../../utilities/connectMongo";
import { KotobaKanjiModel } from "../../../../../../model/commonDocumentModel";

export async function GET(
	request: Request,
	{ params }: { params: { level: string } }
) {
	const level = params.level;
	await connectDB();

	const query: any = { "data.level": level };

	var kotobaKanjiResult;

	try {
		kotobaKanjiResult = await KotobaKanjiModel.find(query);
	} catch (error) {
		console.log("KotobaKanji error " + error);
	}

	return new Response(JSON.stringify(kotobaKanjiResult));
}
