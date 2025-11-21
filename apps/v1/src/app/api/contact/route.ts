import { NextResponse } from "next/server";
import { Resend } from "resend";

const CONTACT_TO = "open.dataloader@hancom.com";
const CONTACT_FROM = "noreply@opendataloader.org";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      businessEmail,
      jobTitle,
      company,
      country,
      details,
    } = body ?? {};

    if (!firstName || !businessEmail || !details) {
      return NextResponse.json(
        {
          error:
            "First name, business email, and details are required to submit the form.",
        },
        { status: 400 }
      );
    }

    if (!CONTACT_FROM || !resend) {
      console.error(
        "Missing email configuration. CONTACT_EMAIL_FROM and RESEND_API_KEY must be set."
      );
      return NextResponse.json(
        {
          error: "Email service is not configured. Please try again later.",
        },
        { status: 500 }
      );
    }

    const fullName = [firstName, lastName].filter(Boolean).join(" ");
    const subject = `Contact request from ${fullName}`;
    const textBody = [
      `New contact submission on opendataloader.org`,
      "",
      `Name: ${fullName}`,
      `Email: ${businessEmail}`,
      jobTitle ? `Job Title: ${jobTitle}` : null,
      company ? `Company / Institution: ${company}` : null,
      country ? `Country: ${country}` : null,
      "",
      "Details:",
      details,
    ]
      .filter(Boolean)
      .join("\n");

    const { data, error: resendError } = await resend.emails.send({
      from: CONTACT_FROM,
      to: [CONTACT_TO],
      subject,
      text: textBody,
    });

    if (resendError) {
      console.error("Resend API error", resendError);
      return NextResponse.json(
        { error: "Failed to send your message. Please try again later." },
        { status: 502 }
      );
    }

    console.log("Contact form submitted successfully", data);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form submission failed", error);
    return NextResponse.json(
      { error: "Something went wrong while submitting the form." },
      { status: 500 }
    );
  }
}
