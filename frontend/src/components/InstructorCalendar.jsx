// src/components/InstructorCalendar.jsx
import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import axios from "axios";
import { useTranslation } from "react-i18next";
import {parseTimeToDate} from "../lib/formatter";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: { "Content-Type": "application/json" },
});
const typeColorMap = {
  code: "#3B82F6", // Blue
  conduite: "#10B981", // Green
  manoeuvre: "#F59E0B", // Amber
};

export default function InstructorCalendar({ instructorId }) {
  const [lessons, setLessons] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    if (!instructorId) return;
    api.get(`/lessons/instructor/${instructorId}`, config).then((res) => {
      const events = res.data.map((lesson) => ({
        id: lesson._id,
        title: lesson.type + " - " + lesson.student?.userId.fullName,
        start: parseTimeToDate(lesson.date, lesson.time),
        end: new Date(
          parseTimeToDate(lesson.date, lesson.time).getTime() + lesson.duration * 60000
        ),
        backgroundColor: typeColorMap[lesson.type || "code"] || "#9CA3AF",
        borderColor: typeColorMap[lesson.type || "code"] || "#9CA3AF",
        textColor: "#fff",
      }));
      setLessons(events);
    });
  }, [instructorId]);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">{t("instructor_calendar")}</h2>
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin, dayGridPlugin]}
        initialView="timeGridWeek"
        locale="fr"
        slotMinTime="07:00:00"
        slotMaxTime="21:00:00"
        allDaySlot={false}
        events={lessons}
        height="auto"
        nowIndicator={true}
      />
    </div>
  );
}
