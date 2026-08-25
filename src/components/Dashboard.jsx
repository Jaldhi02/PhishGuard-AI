import React, { useState } from "react";
import { Shield, Cpu, Activity, ShieldAlert, CheckCircle2, Globe, Layers, ArrowRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from "recharts";
import { SYSTEM_STATS, THREAT_TRENDS, PROJECT_MODULES, RECENT_SCANS } from "../data/mockData";

export function Dashboard({ onNavigateToAnalyzer, onOpenAiModal }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Hero Protection Banner */}
      <div className="glass-panel" style={{ padding: "2.25rem 2.5rem", background: "#ffffff" }}>
        <h1>PhishGuard AI Threat Intelligence</h1>
        <p>Explainable phishing detection & security awareness platform</p>
      </div>

      {/* 18-Module Matrix */}
      <div className="glass-panel" style={{ padding: "2rem" }}>
        <h2>PhishGuard AI System Architecture — 18 Core Modules</h2>
        {/* Module Grid Cards */}
      </div>
    </div>
  );
}
