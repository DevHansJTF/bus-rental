import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customer, trip } = body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL || "",
        pass: process.env.SMTP_PASSWORD || "",
      },
    });

    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(amount);
    };

    const price = trip.price ? formatCurrency(trip.price) : "N/A";
    const reqStartDate = trip.startDate ? new Date(trip.startDate).toLocaleString() : "N/A";
    const reqEndDate = trip.endDate ? new Date(trip.endDate).toLocaleString() : "N/A";

    // Admin Email HTML
    const adminHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
        <h2 style="font-size: 24px; border-bottom: 1px solid #eaeaea; padding-bottom: 16px; margin-bottom: 24px;">New Order Received</h2>
        
        <p><strong>Customer Name:</strong> ${customer.fullName}</p>
        <p><strong>Email:</strong> <a href="mailto:${customer.email}">${customer.email}</a></p>
        <p><strong>Phone:</strong> ${customer.phone || "N/A"}</p>
        <p><strong>Address:</strong> ${customer.address}, ${customer.city} ${customer.postalCode}</p>
        <br/>
        
        <h3 style="font-size: 20px; border-bottom: 1px solid #eaeaea; padding-bottom: 16px; margin-bottom: 16px;">Order Details</h3>
        <table style="width: 100%; border-collapse: collapse; text-align: left;">
          <thead>
            <tr>
              <th style="padding: 12px 0; border-bottom: 1px solid #eaeaea;">Item</th>
              <th style="padding: 12px 0; border-bottom: 1px solid #eaeaea;">Details</th>
              <th style="padding: 12px 0; border-bottom: 1px solid #eaeaea;">Price (/day)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 16px 0; border-bottom: 1px solid #eaeaea;">${trip.busName}</td>
              <td style="padding: 16px 0; border-bottom: 1px solid #eaeaea;">
                Passengers: ${trip.passengers}<br/>
                Location: ${trip.location}<br/>
                From: ${reqStartDate}<br/>
                To: ${reqEndDate}
              </td>
              <td style="padding: 16px 0; border-bottom: 1px solid #eaeaea;">${price}</td>
            </tr>
          </tbody>
        </table>
        
        <p style="font-size: 18px; font-weight: bold; margin-top: 24px;">Total (/day): ${price}</p>
      </div>
    `;

    // User Email HTML
    const userHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; background-color: #fafafa; border: 1px solid #eaeaea;">
        <div style="text-align: center; margin-bottom: 40px;">
          <h1 style="font-size: 24px; letter-spacing: 4px; font-weight: 400; color: #111; margin: 0;">APEXBUS</h1>
          <p style="font-size: 10px; letter-spacing: 2px; color: #666; text-transform: uppercase; margin-top: 8px;">Fleet Services</p>
        </div>
        
        <p style="color: #333; font-size: 15px; line-height: 1.6;">Dear ${customer.fullName},</p>
        
        <p style="color: #333; font-size: 15px; line-height: 1.6;">
          Thank you for reaching out to ApexBus. We have received your inquiry regarding <strong>"${trip.busName}"</strong>.
        </p>
        
        <p style="color: #333; font-size: 15px; line-height: 1.6;">
          Our concierge team is currently reviewing your message and will get back to you shortly. We pride ourselves on providing bespoke service and look forward to assisting you.
        </p>
        
        <p style="color: #333; font-size: 15px; line-height: 1.6; margin-top: 40px;">
          Warm regards,<br/>
          <em style="font-family: serif; font-size: 16px;">The ApexBus Team</em>
        </p>
      </div>
    `;

    // If no credentials are found, simulate email
    if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
      console.log("No SMTP credentials found. Simulating email sending.");
      console.log("MOCK ADMIN:", adminHtml);
      return NextResponse.json({ success: true, simulated: true });
    }

    // Send to Admin
    await transporter.sendMail({
      from: `"ApexBus Concierge" <${process.env.SMTP_EMAIL}>`,
      to: "devhansjtf@gmail.com", // Fixed requested admin email
      subject: "New Order Received",
      html: adminHtml,
    });

    // Send to User
    await transporter.sendMail({
      from: `"ApexBus Concierge" <${process.env.SMTP_EMAIL}>`,
      to: customer.email,
      subject: "Booking Request Received - ApexBus",
      html: userHtml,
    });

    console.log("Emails sent successfully to admin and user!");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json({ error: "Failed to send communication", details: String(error) }, { status: 500 });
  }
}
