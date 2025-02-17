"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import { format } from "date-fns";
import "react-calendar/dist/Calendar.css";
import "../styles/appointment-modal.css";

export default function AppointmentModal({ isOpen, onClose }) {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [service, setService] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  if (!isOpen) return null;

  const availableTimes = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const appointment = {
      id: crypto.randomUUID(),
      date: format(date, "yyyy-MM-dd"),
      time,
      service,
      name,
      email,
      phone,
      status: "pending",
    };

    const existingAppointments = JSON.parse(
      localStorage.getItem("appointments") || "[]"
    );
    localStorage.setItem(
      "appointments",
      JSON.stringify([...existingAppointments, appointment])
    );

    setTime("");
    setService("");
    setName("");
    setEmail("");
    setPhone("");

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Book Appointment</h2>
          <button onClick={onClose} className="close-button">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form-container">
          <div className="calendar-container">
            <div className="calendar">
              <Calendar onChange={setDate} value={date} minDate={new Date()} />
            </div>

            <div className="available-times">
              {availableTimes.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTime(t)}
                  className={`time-button ${time === t ? "selected" : ""}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Service</label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="input-field"
              required
            >
              <option value="">Select a service</option>
              <option value="Luxury Facial Treatment">
                Luxury Facial Treatment
              </option>
              <option value="Hair Styling & Coloring">
                Hair Styling & Coloring
              </option>
              <option value="Manicure & Pedicure">Manicure & Pedicure</option>
            </select>
          </div>

          <div className="input-group">
            <label className="input-label">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <div className="form-footer">
            <button type="submit" className="submit-button">
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
