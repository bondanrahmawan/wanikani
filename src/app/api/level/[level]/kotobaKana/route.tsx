import connectDB from "../../../../../../utilities/connectMongo";
import KotobaKanaModel from "../../../../../../model/KotobaKana";

export async function GET(
	request: Request,
	{ params }: { params: { level: string } }
) {
	const level = params.level;
	await connectDB();

	const query: any = { "data.level": level };

	var kotobaKanaResult;

	try {
		kotobaKanaResult = await KotobaKanaModel.find(query);
	} catch (error) {
		console.log("KotobaKana error " + error);
	}

	return new Response(JSON.stringify(kotobaKanaResult));
}
