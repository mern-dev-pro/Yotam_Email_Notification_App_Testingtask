import { client } from "../../../utils/mongo";
import { INotification } from "../../../utils/type";

const dbName = process.env.MONGODB_DB_NAME;

async function get() {
  try {
    await client.connect();
    const notifications = client.db(dbName).collection("notifications").find();
    const array = await notifications.toArray();
    return array;
  } finally {
    await client.close();
  }
}

async function create(data: INotification) {
  try {
    await client.connect();
    const notification = client.db(dbName).collection("notifications").insertOne(data);
    const array = await notification;
    return array;
  } finally {
    await client.close();
  }
}

export async function GET() {
  const notifications = await get();
  return Response.json(notifications);
}

export async function POST(request: Request) {
  const data = await request.json();
  const notification = await create(data as INotification);
  return Response.json(notification);
}
