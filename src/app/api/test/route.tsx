import connectDB from '../../../../utilities/connectMongo';
import RadicalModel from '../../../../model/Radical';
import KanjiModel from '../../../../model/Kanji';

export async function GET(
  request: Request
) {
  await connectDB()
  console.log("connected")

  var radicalResult;
  var kanjiResult;

  try {
    radicalResult = await RadicalModel.find({"id":{$gte:10, $lte:15}}) /* find all the data in our database */
  } catch (error) {
    radicalResult = error
    console.log("radical error "+ radicalResult)
  }

  try {
    kanjiResult = await KanjiModel.find({"id":{$gte:450, $lte:455}}) /* find all the data in our database */
  } catch (error) {
    kanjiResult = error
    console.log("kanji error "+ kanjiResult)
  }

  const finalResult = "radicalResult\n"+radicalResult + "\n\n"
  + "kanjiResult\n" + kanjiResult

  return new Response("result"+"\n"+finalResult, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
}


export async function POST(
    req: Request
  ) {
    const request = await req.json() // res now contains body
    console.log(request)
    console.log(request.body)
    return new Response("request hehe"+"\n"+JSON.stringify(request), {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      })
}