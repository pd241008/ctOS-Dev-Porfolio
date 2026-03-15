import { NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize the Resend bot with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        { status: "ERROR", message: "Malformed payload." },
        { status: 400 },
      );
    }

    const { subject, message } = body;

    if (
      !subject ||
      !message ||
      typeof subject !== "string" ||
      typeof message !== "string"
    ) {
      return NextResponse.json(
        { status: "ERROR", message: "Invalid payload." },
        { status: 400 },
      );
    }

    // Tell the Resend bot to dispatch the email
    const { data, error } = await resend.emails.send({
      // onboarding@resend.dev is a special address Resend lets you use for free testing
      from: "Uplink Node <onboarding@resend.dev>",
      to: "prathmeshpdesai@gmail.com", // Where you want to receive the messages
      subject: `[UPLINK] ${subject}`,
      text: `SECURE TRANSMISSION RECEIVED\n\nSUBJECT: ${subject}\n\nPAYLOAD:\n${message}`,
    });

    if (error) {
      console.error("[RESEND_ERROR]:", error);
      return NextResponse.json(
        { status: "ERROR", message: error.message },
        { status: 500 },
      );
    }

    console.log(`[UPLINK_SUCCESS] TX_ID: ${data?.id}`);

    return NextResponse.json({
      status: "SUCCESS",
      id: "TX_" + Math.random().toString(36).substring(2, 11).toUpperCase(),
    });
  } catch (error) {
    console.error("[UPLINK_CRITICAL_ERROR]:", error);
    return NextResponse.json(
      { status: "ERROR", message: "Gateway failure." },
      { status: 500 },
    );
  }
}
