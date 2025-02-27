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
