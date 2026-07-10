"use client";

import { useState } from "react";

export function NotifyButton() {
  const [status, setStatus] = useState("Activar notificaciones");

  async function enableNotifications() {
    if (!("Notification" in window)) {
      setStatus("No soportado");
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      setStatus("Notificaciones activas");
      new Notification("AITrending activo", { body: "Te avisaremos cuando haya novedades mientras visites la web." });
    } else {
      setStatus("Permiso no activado");
    }
  }

  return (
    <button type="button" onClick={enableNotifications} className="w-full rounded-lg border border-cyan/30 bg-cyan/10 px-4 py-3 text-sm font-bold text-cyan">
      {status}
    </button>
  );
}
