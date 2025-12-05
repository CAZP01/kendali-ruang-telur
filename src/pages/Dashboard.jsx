// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  connectMQTT,
  subscribeTopic,
  publishCommand,
  disconnectMQTT,
} from "../services/MqttService";
import Header from "../components/Header";
import "../index.css";

function secondsToHMS(seconds) {
  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

export default function Dashboard() {
  const navigate = useNavigate();

  const [temperature, setTemperature] = useState("-");
  const [humidity, setHumidity] = useState("-");
  const [power, setPower] = useState("-");
  const [setpoint, setSetpoint] = useState("-");
  const [rotateOn, setRotateOn] = useState("-");
  const [newSetpoint, setNewSetpoint] = useState("");
  const [lastData, setLastData] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("mqttUser"));
    if (!saved) return navigate("/");

    connectMQTT(saved.username, saved.password).then(() => {
      subscribeTopic("topic/penetasan/status", (msg) => {
        try {
          const data = JSON.parse(msg);

          setTemperature(data.temperature ?? "-");
          setHumidity(data.humidity ?? "-");
          setPower(data.power ?? "-");
          setSetpoint(data.set ?? "-");

          if (data.rotate_on !== undefined) {
            setRotateOn(secondsToHMS(data.rotate_on));
          } else {
            setRotateOn("-");
          }

          setLastData(data);

          saveStatusHistory(data);

        } catch (err) {
          console.error("JSON invalid:", msg);
        }
      });
    });

    return () => {};
  }, []);

  function handlePublish() {
    if (!newSetpoint) return alert("Isi setpoint baru!");
    publishCommand(newSetpoint);
  }

  function handleLogout() {
    disconnectMQTT();
    localStorage.removeItem("mqttUser");
    navigate("/");
  }

  function saveStatusHistory(data) {
    const old = JSON.parse(localStorage.getItem("statusHistory") || "[]");

    const entry = {
      time: new Date().toISOString(),
      temperature: data.temperature ?? null,
      humidity: data.humidity ?? null,
      power: data.power ?? null,
      setpoint: data.set ?? null,
      rotate_on: data.rotate_on ?? null
    };

    old.push(entry);

    localStorage.setItem("statusHistory", JSON.stringify(old));
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <Header onLogout={handleLogout} />

      <h1 className="text-3xl font-bold mb-6 text-slate-100">Dashboard Penetasan</h1>

      {/* Top Row: Temperature & Humidity (Large) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 shadow-md hover:shadow-lg hover:border-blue-500 transition-all">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Temperature</p>
          <p className="text-5xl font-bold text-blue-400 mb-2">{temperature}</p>
          <p className="text-lg text-slate-500">°C</p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 shadow-md hover:shadow-lg hover:border-blue-500 transition-all">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Humidity</p>
          <p className="text-5xl font-bold text-blue-400 mb-2">{humidity}</p>
          <p className="text-lg text-slate-500">%</p>
        </div>
      </div>

      {/* Bottom Row: Setpoint, Power, Putaran */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-md hover:shadow-lg hover:border-blue-500 transition-all">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Setpoint</p>
          <p className="text-2xl font-bold text-blue-400">{setpoint}</p>
          <p className="text-sm text-slate-500">°C</p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-md hover:shadow-lg hover:border-blue-500 transition-all">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Power</p>
          <p className="text-2xl font-bold text-blue-400">{power}</p>
          <p className="text-sm text-slate-500">%</p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-md hover:shadow-lg hover:border-blue-500 transition-all">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Putarn Berikutnya</p>
          <p className="text-lg font-bold text-blue-400">{rotateOn}</p>
          <p className="text-sm text-slate-500">H:M:S</p>
        </div>
      </div>

      {/* Controls Card */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-md">
        <h3 className="text-lg font-semibold text-slate-100 mb-4">Kirim Setpoint Temperature Baru</h3>
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <input
            type="number"
            placeholder="Misal: 37"
            value={newSetpoint}
            onChange={(e) => setNewSetpoint(e.target.value)}
            className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-900 transition-all"
          />
          <button
            onClick={handlePublish}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-colors whitespace-nowrap"
          >
            Kirim
          </button>
          <button
            onClick={() => navigate("/history")}
            className="px-4 py-2 bg-transparent text-blue-400 font-semibold hover:bg-slate-700 rounded-lg transition-colors whitespace-nowrap"
          >
            Lihat History
          </button>
        </div>
      </div>
    </div>
  );
}
