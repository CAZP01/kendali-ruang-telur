// src/pages/History.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../index.css";

function secondsToHMS(seconds) {
  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

export default function History() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("mqttUser"));
    if (!saved) return navigate("/");

    // ⬅ TIDAK ADA MQTT DI HALAMAN HISTORY
    // History hanya membaca data dari localStorage
    const data = JSON.parse(localStorage.getItem("statusHistory") || "[]");
    setHistory(data);
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <Header
        onLogout={() => {
          localStorage.removeItem("mqttUser");
          navigate("/");
        }}
      />

      <h1 className="text-3xl font-bold mb-6 text-slate-100">Riwayat Status Penetasan</h1>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-md">
        <button
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 bg-transparent text-blue-400 font-semibold hover:bg-slate-700 rounded-lg transition-colors mb-4"
        >
          ← Kembali ke Dashboard
        </button>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-slate-700 bg-slate-900">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">Waktu</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">Temperature</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">Humidity</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">Power</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">Setpoint</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">Rotate On (H:M:S)</th>
              </tr>
            </thead>

            <tbody>
              {history.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="px-4 py-3 text-center text-slate-400 text-sm"
                  >
                    Belum ada data
                  </td>
                </tr>
              )}

              {history.map((row, index) => (
                <tr
                  key={index}
                  className="border-b border-slate-700 hover:bg-slate-700 transition-colors"
                >
                  <td className="px-4 py-3 text-sm text-slate-200">
                    {new Date(row.time).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-200">
                    {row.temperature}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-200">
                    {row.humidity}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-200">
                    {row.power}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-200">
                    {row.setpoint}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-200">
                    {secondsToHMS(row.rotate_on)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
