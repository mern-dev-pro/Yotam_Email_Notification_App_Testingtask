import { client } from "../../../utils/mongo";
import { NextResponse } from "next/server";
import { sendMail } from "../../../utils/sendgrid";
import { add } from "date-fns";

const dbName = process.env.MONGODB_DB_NAME;
const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const send = async () => {
  await client.connect();
  const notificationsRes = client.db(dbName).collection("notifications").find();
  const notifications = await notificationsRes.toArray();
  const today = new Date();

  notifications.forEach(async (notification) => {
    const plannedDate = notification?.plannedDate;
    const intervalLength = notification.intervalDuration;

    if (plannedDate) {
      if (notification.interval === "week") {
        const nextDay = (notification?.day ?? [])?.sort()?.findIndex();
        const distanceDay = Math.floor(today.getTime() - plannedDate.getTime() / (1000 * 3600 * 24));

        if (distanceDay === 0) {
          try {
            await Promise.all(
              (notification.emails ?? []).forEach(async (email: string) => {
                await sendMail(email, notification.searchString);
              }),
            );
            client
              .db(dbName)
              .collection("notifications")
              .updateOne(
                { _id: notification._id },
                {
                  $set: {
                    plannedDate: add(new Date(), { days: plannedDate.getDay() }),
                  },
                },
              );
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
    return NextResponse.json({ message: "success" });
  } catch (error) {
    return NextResponse.error();
  }
}
