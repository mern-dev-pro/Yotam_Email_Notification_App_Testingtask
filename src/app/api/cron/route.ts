import { client } from "../../../utils/mongo";
import { NextResponse } from "next/server";
import { sendMail } from "../../../utils/sendgrid";

const dbName = process.env.MONGODB_DB_NAME;
const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const send = async () => {
  await client.connect();
  const notificationsRes = client.db(dbName).collection("notifications").find();
  const notifications = await notificationsRes.toArray();
  const date = new Date();

  notifications.forEach((notification) => {
    const intervalLength = notification.intervalDuration;

    if (notification.interval === "week") {
      const day = date.getDay();
      if ((notification.day ?? []).find((item: string) => item === days[day])) {
        (notification.emails ?? []).forEach((email: string) => {
          sendMail(email, notification.searchString);
        });
      }
    }
    if (notification.interval === "day") {
      const distance = date.getTime() - notification.date.getTime();
      const distanceDays = Math.round(distance / (1000 * 3600 * 24));
      if (distanceDays % intervalLength === 0) {
        (notification.emails ?? []).forEach((email: string) => {
          sendMail(email, notification.searchString);
        });
      }
    }
    if (notification.interval === "hour") {
      const distance = date.getTime() - notification.date.getTime();
      const distanceHours = Math.round(distance / (1000 * 3600));
      if (distanceHours % intervalLength === 0) {
        (notification.emails ?? []).forEach((email: string) => {
          sendMail(email, notification.searchString);
        });
      }
    }
  });
};

export async function GET() {
  try {
    await send();
    return NextResponse.json({ message: "success" });
  } catch (error) {
    return NextResponse.error();
  }
}
