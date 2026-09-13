import React, { useState } from "react";
import { Search, Shield, AlertTriangle, CheckCircle2, Globe, ExternalLink, RefreshCw, Lock } from "lucide-react";

export function BrowserExtensionDemo({ onGoToAnalyzer }) {
    const [simulatedDomain, setSimulatedDomain] = useState("g00gle-security-check.com");

    const DOMAIN_SCENARIOS = {
        "g00gle-security-check.com": {
            score: 94,
            status: "Phishing",
            color: "#dc2626",
            title: "🚨 Phishing Warning",
            reason: "Homograph character spoofing (0 for O) & Brand Impersonation of Google.",
            recommendation: "Do not enter passwords or personal data on this site."
        },
        "paypa1-update-account.com": {
            score: 91,
            status: "Phishing",
            color: "#dc2626",
            title: "🚨 Phishing Warning",
            reason: "Typosquatting domain spoofing PayPal trademark.",
            recommendation: "Close tab immediately."
        },
        "microsoft.com": {
            score: 5,
            status: "Safe",
            color: "#059669",
            title: "🟢 Verified Safe Domain",
            reason: "Official Microsoft EV SSL Certificate & Established Reputation.",
            recommendation: "This website is safe for authentication."
        }
    };

    const currentScenario = DOMAIN_SCENARIOS[simulatedDomain] || DOMAIN_SCENARIOS["g00gle-security-check.com"];

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* Header */}
            <div style={{ background: "linear-gradient(135deg, #0b132b 0%, #1c2541 100%)", borderRadius: "20px", padding: "2.5rem 3rem", color: "#ffffff" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.35rem 0.9rem", borderRadius: "999px", background: "rgba(0, 242, 254, 0.12)", border: "1px solid rgba(0, 242, 254, 0.35)", color: "#38bdf8", fontSize: "0.82rem", fontWeight: "700", marginBottom: "1rem" }}>
                    <Search className="w-3.5 h-3.5" />
                    <span>Module 10: Browser Extension Overlay Demo</span>
                </div>
                <h1 style={{ fontSize: "2.2rem", fontWeight: "800", color: "#ffffff", marginBottom: "0.75rem" }}>
                    Chrome & Firefox Browser Extension Overlay Simulator
                </h1>
                <p style={{ color: "#94a3b8", fontSize: "1rem", lineHeight: "1.6", maxWidth: "780px" }}>
                    Demonstrates active real-time web extension protection that scans website DOMs and URLs automatically as users navigate the web.
                </p>
            </div>

            {/* Scenario Selector */}
            <div style={{ display: "flex", gap: "0.75rem", background: "#ffffff", padding: "1.25rem", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
                <span style={{ fontWeight: "700", color: "#475569", alignSelf: "center", marginRight: "0.5rem" }}>Simulate Visiting Website:</span>
                {Object.keys(DOMAIN_SCENARIOS).map((domain, i) => (
                    <button
                        key={i}
                        onClick={() => setSimulatedDomain(domain)}
                        style={{
                            padding: "0.5rem 1rem",
                            borderRadius: "10px",
                            border: simulatedDomain === domain ? "2px solid #2563eb" : "1px solid #cbd5e1",
                            background: simulatedDomain === domain ? "#eff6ff" : "#ffffff",
                            fontWeight: "700",
                            color: simulatedDomain === domain ? "#2563eb" : "#334155",
                            cursor: "pointer"
                        }}
                    >
                        {domain}
                    </button>
                ))}
            </div>

            {/* Simulated Browser Frame */}
            <div style={{ background: "#ffffff", borderRadius: "20px", border: "2px solid #cbd5e1", boxShadow: "0 20px 40px rgba(0,0,0,0.1)", overflow: "hidden" }}>
                {/* Browser Top Bar */}
                <div style={{ background: "#f1f5f9", padding: "0.75rem 1.25rem", borderBottom: "1px solid #cbd5e1", display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div style={{ display: "flex", gap: "0.4rem" }}>
                        <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ef4444" }}></div>
                        <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#f59e0b" }}></div>
                        <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#10b981" }}></div>
                    </div>

                    {/* URL Bar */}
                    <div style={{ flex: 1, background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "0.4rem 1rem", display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: "var(--font-code)", fontSize: "0.88rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            {currentScenario.status === "Safe" ? <Lock className="w-4 h-4 text-[#059669]" /> : <AlertTriangle className="w-4 h-4 text-[#dc2626]" />}
                            <span style={{ fontWeight: "700", color: "#0f172a" }}>https://{simulatedDomain}/verify-account</span>
                        </div>
                    </div>

                    {/* Extension Icon in Toolbar */}
                    <div style={{ background: currentScenario.color, color: "#ffffff", padding: "0.35rem 0.75rem", borderRadius: "8px", fontWeight: "900", fontSize: "0.75rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <Shield className="w-4 h-4" />
                        <span>{currentScenario.score}</span>
                    </div>
                </div>

                {/* Website Content Area + Extension Popup Overlay */}
                <div style={{ padding: "3rem", background: "#f8fafc", minHeight: "350px", position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {/* Simulated Web Extension Popup */}
                    <div style={{ background: "#ffffff", borderRadius: "16px", border: `2px solid ${currentScenario.color}`, width: "360px", boxShadow: "0 20px 30px rgba(0,0,0,0.15)", padding: "1.5rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", borderBottom: "1px solid #f1f5f9", paddingBottom: "0.85rem", marginBottom: "1rem" }}>
                            <Shield className="w-6 h-6" style={{ color: currentScenario.color }} />
                            <div>
                                <h3 style={{ fontSize: "1.1rem", fontWeight: "900", color: "#0f172a" }}>PhishGuard Extension</h3>
                                <span style={{ fontSize: "0.72rem", color: "#64748b" }}>Live Page Protection</span>
                            </div>
                        </div>

                        <div style={{ textAlign: "center", padding: "1rem 0" }}>
                            <div style={{ fontSize: "2.4rem", fontWeight: "900", color: currentScenario.color }}>{currentScenario.score} / 100</div>
                            <span style={{ fontSize: "0.85rem", fontWeight: "800", color: currentScenario.color }}>{currentScenario.title}</span>
                        </div>

                        <div style={{ background: "#f8fafc", padding: "0.85rem", borderRadius: "10px", fontSize: "0.8rem", color: "#475569", marginBottom: "1rem", lineHeight: "1.4" }}>
                            <strong>Analysis:</strong> {currentScenario.reason}
                        </div>

                        <p style={{ fontSize: "0.78rem", color: "#64748b", fontStyle: "italic", textAlign: "center" }}>
                            {currentScenario.recommendation}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
