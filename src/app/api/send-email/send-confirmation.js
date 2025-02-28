import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, name, date, time, service } = body;

    if (!email) {
      return Response.json({ message: "Missing email address" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Foglalás megerősítve",
      text: `Kedves ${name},\n\nÖrömmel értesítünk, hogy a foglalásod megerősítésre került.\n\n📅 Dátum: ${date}\n⏰ Időpont: ${time}\n🔹 Szolgáltatás: ${service}\n\nVárunk szeretettel!`,
    };

    await transporter.sendMail(mailOptions);

    return Response.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return Response.json({ message: "Failed to send email" }, { status: 500 });
  }
}
