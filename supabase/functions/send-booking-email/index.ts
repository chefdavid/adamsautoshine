import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface BookingData {
  name: string;
  email: string;
  phone: string;
  service: string;
  vehicleType: string;
  date: string;
  time: string;
  message?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const bookingData: BookingData = await req.json();

    // Format the email content
    const emailBody = `
New Booking Request from Adams AutoShine Website

Customer Details:
- Name: ${bookingData.name}
- Email: ${bookingData.email}
- Phone: ${bookingData.phone}

Service Details:
- Service: ${bookingData.service}
- Vehicle Type: ${bookingData.vehicleType}
- Preferred Date: ${bookingData.date}
- Preferred Time: ${bookingData.time}

Additional Message:
${bookingData.message || 'No additional message provided'}

---
Please contact the customer to confirm the appointment.
    `.trim();

    // Email configuration
    const RESEND_API_KEY = "re_FKKGrQ2f_5H5pPQFxt5QB9RnS6uz1A6Ab";
    const BUSINESS_EMAIL = "form@adamsautoshine.com";

    // Send email using Resend API
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Adams AutoShine <bookings@adamsautoshine.com>",
        to: [BUSINESS_EMAIL],
        reply_to: bookingData.email,
        subject: `New Booking Request - ${bookingData.name}`,
        text: emailBody,
      }),
    });

    if (!resendResponse.ok) {
      const error = await resendResponse.text();
      console.error("Resend API error:", error);
      throw new Error("Failed to send email");
    }

    const result = await resendResponse.json();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Booking request sent successfully!",
        id: result.id
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error processing booking:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to send booking request. Please try again or call us directly."
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
