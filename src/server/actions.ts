import { client } from "../utils/mongo";
import { INotification } from "../utils/type";

const dbName = process.env.MONGODB_DB_NAME;

export async function get() {
  try {
    await client.connect();
    const notifications = client.db(dbName).collection("notifications").find();
    const array = await notifications.toArray();
    return array;
  } finally {
    await client.close();
  }
}

export async function create(data: INotification) {
  try {
    await client.connect();
    const notification = client.db(dbName).collection("notifications").insertOne(data);
    const array = await notification;
    return array;
  } finally {
    await client.close();
  }
}
