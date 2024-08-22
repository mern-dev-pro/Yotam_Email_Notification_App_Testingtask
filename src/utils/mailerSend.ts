import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY ?? "",
});
const sentFrom = new Sender("pavel@trial-pq3enl6rq57l2vwr.mlsender.net", "Pavel Medelian");

export const sendMail = async (emails: string[], searchString: string) => {
  const recipients = emails.map((email) => new Recipient(email, ""));

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setReplyTo(sentFrom)
    .setSubject(`You’ve requested notifications about ${searchString}`)
    .setHtml(
      ` Hello!<br>
        This is Pavel Medelian.<br> You’ve requested notifications about ${searchString}.<br>
        Have a great day<br><br>
        Pavel Medelian
      `,
    )
    .setText(`You’ve requested notifications about ${searchString}`);

  await mailerSend.email.send(emailParams);
};
