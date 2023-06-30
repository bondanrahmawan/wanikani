import connectDB from "../../../../../../utilities/connectMongo";
import { RadicalModel } from "../../../../../../model/commonDocumentModel";

export async function GET(
	request: Request,
	{ params }: { params: { level: string } }
) {
	const level = params.level;
	await connectDB();

	const query: any = { "data.level": level };

	var radicalResult;

	try {
		radicalResult = await RadicalModel.find(query);
	} catch (error) {
		console.log("radical error " + error);
	}

	return new Response(JSON.stringify(radicalResult));
}
