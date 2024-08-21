import { NextResponse } from "next/server";
import { sendMail } from "../../../utils/sendgrid";

export async function GET() {
  try {
    await sendMail("koalah86@gmail.com", "Testing search");
  } catch (error) {
    console.log("error: ", error);
  }

  return NextResponse.json({ message: "success" });
}
