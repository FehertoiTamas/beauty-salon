"use client";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import "../styles/admin.css";
import AdminGuard from "../../components/AdminGuard";
import { signOut } from "next-auth/react";

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const res = await fetch("/api/appointments");
    const data = await res.json();
    setAppointments(data);
  };

  const updateAppointmentStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }), // ❌ Nem kell id-t küldeni a body-ban
      });

      if (!res.ok) {
        throw new Error("Failed to update appointment");
      }

      fetchAppointments(); // 🔄 Újratöltjük az adatokat
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  const filteredAppointments = appointments.filter((appointment) =>
    filter === "all" ? true : appointment.status === filter
  );

  return (
    <AdminGuard>
      <div className="admin-dashboard">
        <div className="container">
          <div className="dashboard-card">
            <h1 className="dashboard-title">Admin Dashboard</h1>
            <button className="logout-button" onClick={() => signOut()}>
              Log Out
            </button>

            {/* Filter Controls */}
            <div className="filter-controls">
              <button
                onClick={() => setFilter("all")}
                className={filter === "all" ? "active" : ""}
              >
                All
              </button>
              <button
                onClick={() => setFilter("pending")}
                className={filter === "pending" ? "active" : ""}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter("confirmed")}
                className={filter === "confirmed" ? "active" : ""}
              >
                Confirmed
              </button>
              <button
                onClick={() => setFilter("cancelled")}
                className={filter === "cancelled" ? "active" : ""}
              >
                Cancelled
              </button>
            </div>

            {/* Appointments Table */}
            <div className="appointments-table">
              <table>
                <thead>
                  <tr>
                    <th>Date & Time</th>
                    <th>Client</th>
                    <th>Service</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map((appointment) => (
                    <tr key={appointment._id}>
                      <td>
                        <div>
                          {format(new Date(appointment.date), "MMM d, yyyy")}
                        </div>
                        <div>{appointment.time}</div>
                      </td>
                      <td>
                        <div>{appointment.name}</div>
                        <div>{appointment.email}</div>
                        <div>{appointment.phone}</div>
                      </td>
                      <td>{appointment.service}</td>
                      <td>
                        <span className={`status ${appointment.status}`}>
                          {appointment.status.charAt(0).toUpperCase() +
                            appointment.status.slice(1)}
                        </span>
                      </td>
                      <td>
                        {appointment.status === "pending" && (
                          <div className="actions">
                            <button
                              onClick={() =>
                                updateAppointmentStatus(
                                  appointment._id,
                                  "confirmed"
                                )
                              }
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() =>
                                updateAppointmentStatus(
                                  appointment._id,
                                  "cancelled"
                                )
                              }
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                        <button
                          className="delete-button"
                          onClick={() => deleteAppointment(appointment._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}
