import { client } from "../../../utils/mongo";
import { NextResponse } from "next/server";
import { sendMail } from "../../../utils/mailerSend";

const dbName = process.env.MONGODB_DB_NAME;
const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const send = async () => {
  await client.connect();
  const notificationsRes = client.db(dbName).collection("notifications").find();
  const notifications = await notificationsRes.toArray();
  const today = new Date();

  notifications.forEach(async (notification) => {
    const plannedDate = notification?.plannedDate;

    if (plannedDate) {
      if (notification.interval === "week") {
        const nextDay = (notification?.day ?? [])?.sort()?.findIndex();
        const distanceDay = Math.floor(today.getTime() - plannedDate.getTime() / (1000 * 3600 * 24));

        if (distanceDay === 0) {
          try {
          } catch (error) {}
        }
      }

      if (notification.interval === "day") {
      }

      if (notification.interval === "hour") {
      }
    }
  });
};

export async function GET() {
  try {
    await send();
    await sendMail(["koalah86@gmail.com"], "Test");
    return NextResponse.json({ message: "success" });
  } catch (error) {
    return NextResponse.json({ message: "failed" });
  }
}
