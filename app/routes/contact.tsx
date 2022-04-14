import type { ActionFunction, LinksFunction } from "@remix-run/node";
import { Form, useActionData, useTransition } from "@remix-run/react";
import styles from "~/styles/contact.css";
import { sendEmail } from "~/utils/mailer";
export let links: LinksFunction = () => {
  return[
    { rel: "stylesheet", href: styles },
  ]
}



export let action: ActionFunction = async ({ request }) => {
  let body = await request.formData();
  let name = body.get("name") as string;
  let email = body.get("email") as string;
  const messageStatus = await sendEmail({
    to: email,
    subject: "New Message from Remix App",
    text: `${name}, you have a message from Syntax remix app.`,
  });
  return messageStatus;
}

export default function () {
  const data = useActionData();
  const transition = useTransition();
  let isSubmitting = transition.state === "submitting";
  return (
    data 
      ? (<a href={data}>Message sent successfully. Click here to see it.</a>)
      : (
          <div className="prose lg:prose-xl text-center w-screen h-screen m-0">
            <h1>Contact Us</h1>
            <Form method="post" className="flex flex-col gap-4">
              <label>
                Name: <input type="text" name="name" />
              </label>
              <label htmlFor="email">
                Email: <input type="email" name="email" />
              </label>
              <button className="button max-w-sm place-self-center" type="submit" disabled={isSubmitting}>Send{isSubmitting ? 'ing' : ''} Message{isSubmitting ? '...' : ''}</button>
            </Form>
          </div>
        )
  );
}
