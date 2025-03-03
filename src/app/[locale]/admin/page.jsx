"use client";
import { useState, useEffect } from "react";
import "../styles/admin.css";
import AdminGuard from "../../components/AdminGuard";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname(); // Megbízhatóbb módszer az URL elérésére

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
    if (status === "unauthenticated") {
      const locale = pathname.split("/")[1]; // Nyelvi előtag meghatározása
      router.push(`/${locale}/login`); // Admin oldalra irányítás helyes nyelven
    }
  }, [status, router]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const res = await fetch("/api/appointments");
    const data = await res.json();
    setAppointments(data);
  };

  const updateAppointmentStatus = async (
    id,
    status,
    email,
    name,
    date,
    time,
    service
  ) => {
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        throw new Error("Failed to update appointment");
      }

      if (status === "confirmed") {
        // ✅ Küldjük az e-mailt, ha a foglalás megerősítve
        const emailRes = await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, name, date, time, service }),
        });

        if (!emailRes.ok) {
          throw new Error("Failed to send confirmation email");
        }
      }

      fetchAppointments(); // 🔄 Csak az e-mail küldés után frissítsük a listát
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
        <div className="dashboard-container">
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
                                  "confirmed",
                                  appointment.email,
                                  appointment.name,
                                  appointment.date,
                                  appointment.time,
                                  appointment.service
                                )
                              }
                            >
                              {t("confirm-btn")}
                            </button>{" "}
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
                        {appointment.status !== "pending" && (
                          <button
                            className="delete-button"
                            onClick={() => deleteAppointment(appointment._id)}
                          >
                            {t("delete-btn")}
                          </button>
                        )}
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
