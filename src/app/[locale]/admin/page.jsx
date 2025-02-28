"use client";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import "../styles/admin.css";
import AdminGuard from "../../components/AdminGuard";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("all");

  const t = useTranslations("AdminPage");

  const formatDateInTimeZone = (dateString, timeZone) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      timeZone,
    }).format(date);
  };

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

  const deleteAppointment = async (id) => {
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete appointment");
      }

      fetchAppointments(); // 🔄 Frissítjük a listát törlés után
    } catch (error) {
      console.error("Error deleting appointment:", error);
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
            <h1 className="dashboard-title">{t("title")}</h1>
            <button className="logout-button" onClick={() => signOut()}>
              {t("logOut-btn")}
            </button>

            {/* Filter Controls */}
            <div className="filter-controls">
              <button
                onClick={() => setFilter("all")}
                className={filter === "all" ? "active" : ""}
              >
                {t("filterAll-btn")}
              </button>
              <button
                onClick={() => setFilter("pending")}
                className={filter === "pending" ? "active" : ""}
              >
                {t("filterPending-btn")}
              </button>
              <button
                onClick={() => setFilter("confirmed")}
                className={filter === "confirmed" ? "active" : ""}
              >
                {t("filterConfirmed-btn")}
              </button>
              <button
                onClick={() => setFilter("cancelled")}
                className={filter === "cancelled" ? "active" : ""}
              >
                {t("filterCancelled-btn")}
              </button>
            </div>

            {/* Appointments Table */}
            <div className="appointments-table">
              <table>
                <thead>
                  <tr>
                    <th>{t("appointment-date&time")}</th>
                    <th>{t("appinment-client")}</th>
                    <th>{t("appointmrnt-service")}</th>
                    <th>{t("appointment-status")}</th>
                    <th>{t("appointment-action")}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map((appointment) => (
                    <tr key={appointment._id}>
                      <td>
                        <div>
                          {formatDateInTimeZone(appointment.date, "UTC")}
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
                              {t("confirm-btn")}
                            </button>
                            <button
                              onClick={() =>
                                updateAppointmentStatus(
                                  appointment._id,
                                  "cancelled"
                                )
                              }
                            >
                              {t("cancel-btn")}
                            </button>
                          </div>
                        )}
                        <button
                          className="delete-button"
                          onClick={() => deleteAppointment(appointment._id)}
                        >
                          {t("delete-btn")}
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
