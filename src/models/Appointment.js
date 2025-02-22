import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  date: String,
  time: String,
  service: String,
  name: String,
  email: String,
  phone: String,
  status: { type: String, default: "pending" },
});

export default mongoose.models.Appointment || mongoose.model("Appointment", AppointmentSchema);
