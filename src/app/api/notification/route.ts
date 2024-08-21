import { client } from "../../../utils/mongo";

const dbName = process.env.MONGODB_DB_NAME;

async function run() {
  try {
    await client.connect();
    const cursor = await client.db(dbName).collection("notifications").find();
    const array = await cursor.toArray();
    return array;
  } finally {
    await client.close();
  }
}

export async function GET(request: Request) {
  const greetings = await run();
  return Response.json(greetings);
}
