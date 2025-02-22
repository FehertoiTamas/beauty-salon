import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Appointment from "@/models/Appointment";

export async function POST(req) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const newAppointment = new Appointment(data);
    await newAppointment.save();
    return NextResponse.json({ success: true, appointment: newAppointment });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
