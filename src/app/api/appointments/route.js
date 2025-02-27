import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import { createTranslator } from "next-intl";

const getMessages = async (locale) => {
  try {
    const messagesModule = await import(`../../../../messages/${locale}.json`);
    return messagesModule.default || messagesModule;
  } catch (error) {
    console.error(`Nem található a fordítás: ${locale}`);
    return {};
  }
};

export async function GET(req) {
  await connectToDatabase();

  try {
    const appointments = await Appointment.find({});
    return NextResponse.json(appointments, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 });
  }
}


export async function POST(req) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const { date, time, service } = data;

    // 🔹 Nyelv meghatározása a kérés fejlécéből vagy alapértelmezett "hu"
    const locale = req.headers.get("Accept-Language")?.split(",")[0];
    // 🔹 Dinamikusan töltjük be a fordításokat
    const messages = await getMessages(locale);

    const t = createTranslator({ locale, messages });

    // Ellenőrizzük, hogy van-e már ilyen időpont és szolgáltatás
    const existingAppointment = await Appointment.findOne({ date, time, service });

    if (existingAppointment) {
      return NextResponse.json(
        { success: false, error: t("ServerPost.appointmentTaken") || "Ez az időpont sajnos már foglalt!" },
        { status: 400 }
      );
    }

    // Ha nincs ütközés, mentjük az új foglalást
    const newAppointment = new Appointment(data);
    await newAppointment.save();

    return NextResponse.json({ success: true, message: t("ServerPost.appointmentSucces"), appointment: newAppointment });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}