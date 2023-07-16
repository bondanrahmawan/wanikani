import connectDB from "../../../../../utilities/connectMongo";
import { BaseKana } from "../../../../../model/commonTypes";
import { HiraganaModel, KatakanaModel } from "../../../../../model/commonDocumentModel";

export async function GET(request: Request, { params }: { params: { type: string } }) {
	const type = params.type.toLowerCase();
	await connectDB();

	var hiragana;
	var katakana;
	var result;

	try {
		if (type == "hiragana") {
			result = await HiraganaModel.find();
		} else if (type == "katakana") {
			result = await KatakanaModel.find();
		} else if (type == "allkana") {
			hiragana = await HiraganaModel.find();
			katakana = await KatakanaModel.find();
			result = [...hiragana, ...katakana];
		}
	} catch (error) {
		console.error("fetch error " + error);
	}

	return new Response(JSON.stringify(result));
}
