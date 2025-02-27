import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Appointment from "@/models/Appointment";


export async function GET(req) {
  await connectToDatabase();

  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");
    const service = searchParams.get("service");

    const query = {};
    if (date) query.date = date;
    if (service) query.service = service;

    const appointments = await Appointment.find(query);

    return NextResponse.json({ bookedTimes: appointments.map((a) => a.time) }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 });
  }
}