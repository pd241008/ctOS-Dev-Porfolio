import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { subject, message } = await request.json();

    console.log("--- SECURE_UPLINK_TRANSMISSION ---");
    console.log(`SUBJECT: ${subject}`);
    console.log(`PAYLOAD: ${message}`);
    console.log("----------------------------------");

    /**
     * NOTE: To make this functional for production,
     * you would integrate a service like Resend or Nodemailer here.
     * Example with Resend:
     *
     * await resend.emails.send({
     *   from: 'Uplink <onboarding@resend.dev>',
     *   to: 'prathmeshpdesai@gmail.com',
     *   subject: subject,
     *   text: message
     * });
     */

    return NextResponse.json({
      status: "SUCCESS",
      id: "TX_" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    });
  } catch (error) {
    return NextResponse.json(
      { status: "ERROR", message: "Failed to relay payload" },
      { status: 500 },
    );
  }
}
