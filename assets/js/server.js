import express from "express";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

// --- Booking Endpoint ---
app.post("/book-event", async (req, res) => {
  try {
    const { name, email, eventDate, eventTime, venue, notes } = req.body;

    if (!name || !email || !eventDate) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Enforce 2-week minimum notice
    const event = new Date(eventDate);
    const today = new Date();
    const daysDiff = (event - today) / (1000 * 60 * 60 * 24);
    if (daysDiff < 14) {
      return res.status(400).json({
        message: "Events must be booked at least 2 weeks in advance.",
      });
    }

    // Configure mail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email template
    const emailContent = `
New Wedding Booking Request 💍

Name: ${name}
Email: ${email}
Event Date: ${eventDate} at ${eventTime || "N/A"}
Venue: ${venue || "N/A"}

Notes:
${notes || "(none)"}

Please reply directly to this email to coordinate details.
`;

    await transporter.sendMail({
      from: `"Wedding Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER,
      subject: "New Wedding Booking Request",
      text: emailContent,
    });

    // Confirmation email for the client (optional)
    await transporter.sendMail({
      from: `"Wedding Website" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank You for Your Booking Request",
      text: `Hi ${name},

Thank you for reaching out! Your booking request has been received.

Event Details:
Date: ${eventDate}
Time: ${eventTime || "N/A"}
Venue: ${venue || "N/A"}

We'll get back to you within 2 business days to confirm availability.

Warm regards,
The Wedding Team`,
    });

    res.json({ message: "Your booking request was sent successfully!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "An error occurred. Please try again later." });
  }
});

app.listen(process.env.PORT, () =>
  console.log(`✨ Server running at http://localhost:${process.env.PORT}`)
);
