import { NextResponse } from "next/server";
import { Resend } from "resend";
import { bookingFormSchema } from "@/lib/validations";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = bookingFormSchema.parse(body);

    const { error } = await resend.emails.send({
      from: "Adams Autoshine <bookings@adamsautoshine.com>",
      to: ["info@adamsautoshine.com"],
      subject: `New Booking Request from ${data.fullName}`,
      html: `
        <h2>New Appointment Request</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Name</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${data.fullName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Phone</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${data.phone}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Email</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${data.email}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Service</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${data.service}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Vehicle</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${data.vehicle || "Not specified"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Date</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${data.date}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Time</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${data.time || "No preference"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Notes</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${data.notes || "None"}</td>
          </tr>
        </table>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
