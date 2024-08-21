import { ObjectId } from "mongodb";
import { client } from "../../../../utils/mongo";
import { INotification } from "../../../../utils/type";

const dbName = process.env.MONGODB_DB_NAME;

async function update(data: INotification, id: string) {
  try {
    await client.connect();
    const notification = client
      .db(dbName)
      .collection("notifications")
      .updateOne({ _id: new ObjectId(id) }, data as INotification);
    const array = await notification;
    return array;
  } finally {
    await client.close();
  }
}

async function deleteNotification(id: string) {
  try {
    await client.connect();
    const notification = client
      .db(dbName)
      .collection("notifications")
      .deleteOne({ _id: new ObjectId(id) });
    const array = await notification;
    return array;
  } finally {
    await client.close();
  }
}

export async function PUT(request: Request, { params }: { params: { slug: string } }) {
  const data = await request.json();
  const notification = await update(data, params.slug);
  return Response.json(notification);
}

export async function DELETE(request: Request, { params }: { params: { slug: string } }) {
  const notification = await deleteNotification(params.slug);
  return Response.json(notification);
}
