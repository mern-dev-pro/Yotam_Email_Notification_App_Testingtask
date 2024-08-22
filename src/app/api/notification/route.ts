import { create, get } from "../../../server/actions";
import { INotification } from "../../../utils/type";

export async function GET() {
  const notifications = await get();
  return Response.json(notifications);
}

export async function POST(request: Request) {
  const data = await request.json();
  const notification = await create(data as INotification);
  return Response.json(notification);
}
