// src/pages/Login.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connectMQTT } from "../services/MqttService";
import "../index.css";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load saved login (if any)
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("user"));
    if (saved) {
      setUsername(saved.username);
      setPassword(saved.password);
      setRemember(true);
    }
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      await connectMQTT(username, password);

      // Remember Me
      if (remember) {
        localStorage.setItem("user", JSON.stringify({ username, password }));
      } else {
        localStorage.removeItem("user");
      }

      // Simpan untuk Dashboard
      localStorage.setItem(
        "mqttUser",
        JSON.stringify({ username, password })
      );

      navigate("/dashboard");
    } catch (err) {
      alert("Login MQTT gagal!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800/40 border border-slate-700 rounded-lg p-8 backdrop-blur-sm shadow-xl">

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">KARTEL</h1>
            <p className="text-slate-400">Sistem Automasi Ruang Telur</p>
          </div>

          {/* Form Login */}
          <form onSubmit={handleLogin} className="space-y-5">

            {/* Username */}
            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-2">
                Username
              </label>

              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg
                           text-white placeholder-slate-400 focus:outline-none
                           focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-2">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg
                             text-white placeholder-slate-400 focus:outline-none
                             focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-300"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <label className="flex items-center gap-2 text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4"
              />
              Remember Me
            </label>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading || !username || !password}
              className="w-full mt-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700
                         hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg
                         transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Loading...
                </span>
              ) : (
                'Login'
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-slate-400 text-xs">
          © 2025 KARTEL. All rights reserved.
        </div>
      </div>
    </div>
  );
}
