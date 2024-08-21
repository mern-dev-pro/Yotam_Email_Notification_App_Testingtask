import client from "@sendgrid/client";
import sgMail from "@sendgrid/mail";

client.setApiKey(process.env.SENDGRID_API_KEY ?? "");
sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? "");

export const sendMail = async (email: string, searchString: string) => {
  try {
    const msg = {
      to: email,
      from: process.env.SENDER_EMAIL ?? "",
      subject: "Hello!",
      text: "This is Pavel",
      html: `<p>This is Pavel. You’ve requested notifications about ${searchString}.<br><br>Have a great day.<br><br>Pavel</p>`,
    };

    sgMail
      .send(msg)
      .then((response) => {
        console.log(response[0].statusCode);
        console.log(response[0].headers);
      })
      .catch((error) => {
        throw Error("Failed sending mail");
      });
  } catch (error) {
    throw Error("Failed sending mail");
  }
};
