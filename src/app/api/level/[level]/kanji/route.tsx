import connectDB from '../../../../../../utilities/connectMongo';
import KanjiModel from '../../../../../../model/Kanji';

export async function GET(
  request: Request,
  { params }: { params: { level: string } }
) {
  const level = params.level
  await connectDB()

  const query:any = {"data.level":level}

  var kanjiResult;

  try {
    kanjiResult = await KanjiModel.find(query)
  } catch (error) {
    console.log("kanji error "+ error)
  }

  return new Response(JSON.stringify(kanjiResult))
}
