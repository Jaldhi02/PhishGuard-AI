import React from "react";
import { Shield, Globe, AlertTriangle, Activity, ArrowRight, Zap, CheckCircle2, FileText, Sparkles, Server, Lock } from "lucide-react";
import { MOCK_DASHBOARD_METRICS } from "../data/mockData";

export function Dashboard({ onNavigateToAnalyzer, onOpenReportModal, onOpenAiModal }) {
    const { totalScansToday, phishingDetected, activeThreatsBlocked, avgDetectionTimeMs, threatLevel, recentScans } = MOCK_DASHBOARD_METRICS;

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* Hero / Banner Header */}
            <div
                style={{
                    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
                    borderRadius: "20px",
                    padding: "2.5rem 3rem",
                    color: "#ffffff",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "1.5rem",
                    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.2)"
                }}
            >
                <div style={{ maxWidth: "650px" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.35rem 0.85rem", borderRadius: "999px", background: "rgba(37, 99, 235, 0.2)", border: "1px solid rgba(59, 130, 246, 0.4)", color: "#60a5fa", fontSize: "0.8rem", fontWeight: "700", marginBottom: "1rem" }}>
                        <Activity className="w-4 h-4" /> Real-time Cyber Threat Intelligence
                    </div>
                    <h1 style={{ fontSize: "2.2rem", fontWeight: "800", color: "#ffffff", lineHeight: "1.2", marginBottom: "0.75rem" }}>
                        Phishing Protection & AI Defense Operations
                    </h1>
                    <p style={{ color: "#94a3b8", fontSize: "1rem", lineHeight: "1.6" }}>
                        Automated multi-layer heuristic scan, homograph detection, and explainable AI risk scoring to safeguard users against credential harvesting and malicious web links.
                    </p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    <button
                        onClick={() => onNavigateToAnalyzer("https://g00gle-security-check.com/verify-account")}
                        style={{
                            background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                            color: "#ffffff",
                            padding: "0.85rem 1.75rem",
                            borderRadius: "12px",
                            border: "none",
                            fontWeight: "700",
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.6rem",
                            fontSize: "0.95rem",
                            boxShadow: "0 4px 14px rgba(37, 99, 235, 0.4)"
                        }}
                    >
                        <Zap className="w-4 h-4" /> Run Live URL Scan
                    </button>
                    <button
                        onClick={onOpenAiModal}
                        style={{
                            background: "rgba(255, 255, 255, 0.1)",
                            color: "#ffffff",
                            padding: "0.75rem 1.75rem",
                            borderRadius: "12px",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                            fontWeight: "600",
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.6rem",
                            fontSize: "0.9rem"
                        }}
                    >
                        <Sparkles className="w-4 h-4 text-[#38bdf8]" /> Ask AI Threat Assistant
                    </button>
                </div>
            </div>

            {/* Metrics Overview Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
                <div style={{ background: "#ffffff", padding: "1.5rem", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", color: "#64748b", marginBottom: "0.5rem" }}>
                        <span style={{ fontSize: "0.85rem", fontWeight: "600" }}>Total Scans Today</span>
                        <Globe className="w-5 h-5 text-[#2563eb]" />
                    </div>
                    <div style={{ fontSize: "2rem", fontWeight: "900", color: "#0f172a" }}>{totalScansToday.toLocaleString()}</div>
                    <span style={{ fontSize: "0.75rem", color: "#166534", fontWeight: "700", display: "inline-flex", alignItems: "center", gap: "0.25rem", marginTop: "0.25rem" }}>
                        ↑ +14.2% from yesterday
                    </span>
                </div>

                <div style={{ background: "#ffffff", padding: "1.5rem", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", color: "#64748b", marginBottom: "0.5rem" }}>
                        <span style={{ fontSize: "0.85rem", fontWeight: "600" }}>Phishing Sites Flagged</span>
                        <AlertTriangle className="w-5 h-5" style={{ color: "#dc2626" }} />
                    </div>
                    <div style={{ fontSize: "2rem", fontWeight: "900", color: "#dc2626" }}>{phishingDetected.toLocaleString()}</div>
                    <span style={{ fontSize: "0.75rem", color: "#dc2626", fontWeight: "700", display: "inline-flex", alignItems: "center", gap: "0.25rem", marginTop: "0.25rem" }}>
                        High Risk Threats Mitigated
                    </span>
                </div>

                <div style={{ background: "#ffffff", padding: "1.5rem", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", color: "#64748b", marginBottom: "0.5rem" }}>
                        <span style={{ fontSize: "0.85rem", fontWeight: "600" }}>Active Threats Blocked</span>
                        <Shield className="w-5 h-5" style={{ color: "#059669" }} />
                    </div>
                    <div style={{ fontSize: "2rem", fontWeight: "900", color: "#059669" }}>{activeThreatsBlocked.toLocaleString()}</div>
                    <span style={{ fontSize: "0.75rem", color: "#059669", fontWeight: "700", display: "inline-flex", alignItems: "center", gap: "0.25rem", marginTop: "0.25rem" }}>
                        100% Protection Rate
                    </span>
                </div>

                <div style={{ background: "#ffffff", padding: "1.5rem", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", color: "#64748b", marginBottom: "0.5rem" }}>
                        <span style={{ fontSize: "0.85rem", fontWeight: "600" }}>Avg Inference Latency</span>
                        <Server className="w-5 h-5" style={{ color: "#7c3aed" }} />
                    </div>
                    <div style={{ fontSize: "2rem", fontWeight: "900", color: "#0f172a" }}>{avgDetectionTimeMs} ms</div>
                    <span style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: "600", marginTop: "0.25rem", display: "block" }}>
                        Sub-second Neural Scoring
                    </span>
                </div>
            </div>

            {/* Recent Analysis Table */}
            <div style={{ background: "#ffffff", padding: "2rem", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                    <div>
                        <h2 style={{ fontSize: "1.3rem", fontWeight: "800", color: "#0f172a" }}>Recent URL Threat Inspection Logs</h2>
                        <p style={{ fontSize: "0.85rem", color: "#64748b" }}>Live stream of URL scans submitted across the enterprise network</p>
                    </div>
                    <button
                        onClick={() => onNavigateToAnalyzer()}
                        style={{
                            background: "#f1f5f9",
                            color: "#0f172a",
                            padding: "0.5rem 1rem",
                            borderRadius: "8px",
                            border: "1px solid #cbd5e1",
                            fontWeight: "600",
                            fontSize: "0.85rem",
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.4rem"
                        }}
                    >
                        <span>Open Analyzer</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                        <thead>
                            <tr style={{ borderBottom: "2px solid #e2e8f0", color: "#64748b", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                <th style={{ padding: "0.75rem 1rem" }}>Scan ID</th>
                                <th style={{ padding: "0.75rem 1rem" }}>Submitted URL Target</th>
                                <th style={{ padding: "0.75rem 1rem" }}>Risk Score</th>
                                <th style={{ padding: "0.75rem 1rem" }}>Verdict</th>
                                <th style={{ padding: "0.75rem 1rem" }}>Timestamp</th>
                                <th style={{ padding: "0.75rem 1rem", textAlign: "right" }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentScans.map((scan) => (
                                <tr key={scan.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                                    <td style={{ padding: "1rem", fontFamily: "var(--font-code)", fontSize: "0.85rem", color: "#475569", fontWeight: "600" }}>{scan.id}</td>
                                    <td style={{ padding: "1rem", fontFamily: "var(--font-code)", fontSize: "0.85rem", color: "#0f172a", fontWeight: "600" }}>{scan.url}</td>
                                    <td style={{ padding: "1rem" }}>
                                        <span style={{
                                            fontWeight: "800",
                                            fontSize: "0.9rem",
                                            color: scan.score > 80 ? "#dc2626" : scan.score > 50 ? "#d97706" : "#059669"
                                        }}>
                                            {scan.score} / 100
                                        </span>
                                    </td>
                                    <td style={{ padding: "1rem" }}>
                                        <span style={{
                                            padding: "0.25rem 0.65rem",
                                            borderRadius: "999px",
                                            fontSize: "0.75rem",
                                            fontWeight: "700",
                                            background: scan.status === "Phishing" ? "#fef2f2" : scan.status === "Suspicious" ? "#fffbe6" : "#f0fdf4",
                                            color: scan.status === "Phishing" ? "#dc2626" : scan.status === "Suspicious" ? "#d97706" : "#166534",
                                            border: `1px solid ${scan.status === "Phishing" ? "#fca5a5" : scan.status === "Suspicious" ? "#fcd34d" : "#bbf7d0"}`
                                        }}>
                                            {scan.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: "1rem", fontSize: "0.8rem", color: "#64748b" }}>{scan.time}</td>
                                    <td style={{ padding: "1rem", textAlign: "right" }}>
                                        <button
                                            onClick={() => onNavigateToAnalyzer(scan.url)}
                                            style={{
                                                background: "#2563eb",
                                                color: "#ffffff",
                                                border: "none",
                                                padding: "0.35rem 0.75rem",
                                                borderRadius: "6px",
                                                fontSize: "0.78rem",
                                                fontWeight: "600",
                                                cursor: "pointer"
                                            }}
                                        >
                                            Inspect
                                        </button>
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
