import connectToDatabase from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  await connectToDatabase();

  const { id } = params; // ID az URL-ből jön
  const { status } = await req.json(); // Státusz a body-ból jön

  if (!["pending", "confirmed", "cancelled"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedAppointment) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
    }

    return NextResponse.json(updatedAppointment, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update appointment" }, { status: 500 });
  }
}
