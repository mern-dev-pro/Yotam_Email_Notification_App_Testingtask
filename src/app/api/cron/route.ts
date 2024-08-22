import { client } from "../../../utils/mongo";
import { NextResponse } from "next/server";
import { sendMail } from "../../../utils/mailerSend";
import { calculationDistanceWidthNextDate, days } from "../../../utils/function";
import { IDay } from "../../../utils/type";
import { add } from "date-fns";

const dbName = process.env.MONGODB_DB_NAME;

const send = async () => {
  await client.connect();
  const notificationsRes = client.db(dbName).collection("notifications").find();
  const notifications = await notificationsRes.toArray();
  const today = new Date();

  notifications.forEach(async (notification) => {
    const currentPlanedDate = new Date(notification?.plannedDate);
    if (currentPlanedDate) {
      try {
        if (notification.interval === "week") {
          console.log("****** Current notification is weekly planned *******");
          console.log("****** Current planned day:", days[currentPlanedDate.getDay()]);

          if (currentPlanedDate.getDay() === today.getDay()) {
            console.log("****** Sending emails...******");
            await sendMail(notification.emails, notification.searchString);
            console.log("****** The emails are sent!******");
            const lengthWithNextDay = calculationDistanceWidthNextDate(
              notification.day ?? [],
              days[currentPlanedDate.getDay()] as IDay,
            );
            console.log("**** Distance with next planned day: ", lengthWithNextDay);
            console.log("****** Updating next planned date! ******");
            await client
              .db(dbName)
              .collection("notifications")
              .updateOne(
                { _id: notification._id },
                {
                  $set: {
                    plannedDate: add(currentPlanedDate, { days: lengthWithNextDay }),
                  },
                },
              );
            console.log("****** Next planned date is updated! ******");
            console.log("****** Success! ******");
          } else {
            console.log("****** This notification is not planned for today *******");
          }
        }

        if (notification.interval === "day") {
          if (currentPlanedDate.getDate() === today.getDate() && currentPlanedDate.getMonth() === today.getMonth()) {
            console.log("****** Sending emails...******");
            await sendMail(notification.emails, notification.searchString);
            console.log("****** The emails are sent!******");
            console.log("****** Updating next planned date! ******");
            await client
              .db(dbName)
              .collection("notifications")
              .updateOne(
                { _id: notification._id },
                {
                  $set: {
                    plannedDate: add(currentPlanedDate, { days: notification?.intervalDuration ?? 0 }),
                  },
                },
              );
            console.log("****** Next planned date is updated! ******");
            console.log("****** Success! ******");
          } else {
            console.log("****** This notification is not planned for today *******");
          }
        }
      } catch (error: any) {
        console.log("****** Error! ******", error?.body?.message);
      }
    }
  });
};

export async function GET() {
  try {
    await send();
    // await sendMail(["koalah86@gmail.com"], "Test");
    return NextResponse.json({ message: "success" });
  } catch (error) {
    return NextResponse.json({ message: "failed" });
  }
}
