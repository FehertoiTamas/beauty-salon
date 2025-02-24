import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Appointment from "@/models/Appointment";

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

    // Ellenőrizzük, hogy van-e már ilyen időpont és szolgáltatás
    const existingAppointment = await Appointment.findOne({ date, time, service });

    if (existingAppointment) {
      return NextResponse.json(
        { success: false, error: "Ez az időpont sajnos már foglalt!" },
        { status: 400 }
      );
    }

    // Ha nincs ütközés, mentjük az új foglalást
    const newAppointment = new Appointment(data);
    await newAppointment.save();

    return NextResponse.json({ success: true, appointment: newAppointment });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}