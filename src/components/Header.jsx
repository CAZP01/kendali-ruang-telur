// src/components/Header.jsx
import React from "react";

export default function Header({ title = "KARTEL", onLogout }) {
  return (
    <header className="flex items-center justify-between bg-slate-800 px-6 py-4 rounded-xl border border-slate-700 shadow-lg mb-6">
      <div className="text-xl font-bold tracking-wide text-blue-400">{title}</div>
      <div className="flex gap-2">
        <button
          onClick={onLogout}
          className="px-4 py-2 border border-blue-500 text-blue-400 font-semibold rounded-lg hover:bg-slate-700 hover:border-blue-400 transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
