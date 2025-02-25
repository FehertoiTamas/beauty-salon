import connectToDatabase from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import { NextResponse } from "next/server";

export async function PATCH(req, context) {
  await connectToDatabase();

  const params = await context.params; // 🔹 params-t aszinkron kell várni
  const appointmentId = params?.id; // 🔹 ID helyes kinyerése

  if (!appointmentId) {
    return NextResponse.json({ error: "Missing appointment ID" }, { status: 400 });
  }

  const { status } = await req.json(); // 🔹 Státusz a body-ból jön

  if (!["pending", "confirmed", "cancelled"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
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

export async function DELETE(req, context) {
  await connectToDatabase();

  const params = await context.params; // 🔹 params-t aszinkron kell várni
  const appointmentId = params?.id; // 🔹 ID helyes kinyerése

  if (!appointmentId) {
    return NextResponse.json({ success: false, error: "Missing appointment ID" }, { status: 400 });
  }

  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);

    if (!deletedAppointment) {
      return NextResponse.json({ success: false, error: "Appointment not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Appointment deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete appointment" }, { status: 500 });
  }
}
