import React, { useState } from "react";
import { Target, Cpu, HelpCircle, Layers, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";

export function XaiDeepDive({ onGoToAnalyzer }) {
    const [selectedThreat, setSelectedThreat] = useState(0);

    const THREAT_SAMPLES = [
        {
            title: "🔴 Sample 1: Fake Google Verification Link (g00gle-security-check.com)",
            finalScore: 94,
            tier: "Likely Phishing / Critical Threat",
            baseValue: 15,
            shapFeatures: [
                { feature: "Homograph Spoofing ('0' for 'O')", shapValue: +25, direction: "risk", description: "Replaces letter O with digit 0 to fool human readers" },
                { feature: "Brand Impersonation (Google)", shapValue: +22, direction: "risk", description: "Jaro-Winkler 92% similarity to Google trademark" },
                { feature: "Urgent Keyword ('verify-account')", shapValue: +18, direction: "risk", description: "High risk credential harvest string in URL path" },
                { feature: "Suspicious TLD (.xyz / .com spoof)", shapValue: +14, direction: "risk", description: "Unregistered external domain registration" },
                { feature: "Domain Age (< 7 Days)", shapValue: +10, direction: "risk", description: "Newly created domain infrastructure" },
                { feature: "Valid SSL Certificate", shapValue: -10, direction: "safe", description: "Free Let's Encrypt SSL active (reduces score slightly)" }
            ]
        },
        {
            title: "🟠 Sample 2: Shortened Bitly Redirect Hop",
            finalScore: 68,
            tier: "High Risk Suspicious",
            baseValue: 15,
            shapFeatures: [
                { feature: "Shortened URL Service (bit.ly)", shapValue: +24, direction: "risk", description: "Hides final destination URL from email filters" },
                { feature: "Multi-Hop HTTP Redirect (3 Hops)", shapValue: +20, direction: "risk", description: "Triggers 3 status 301 location header redirects" },
                { feature: "IP Address Final Destination", shapValue: +18, direction: "risk", description: "Final endpoint is raw IP address without DNS record" },
                { feature: "Clean Lexical Path", shapValue: -9, direction: "safe", description: "No credential keywords detected in path string" }
            ]
        },
        {
            title: "🟢 Sample 3: Official Microsoft Security Portal (microsoft.com)",
            finalScore: 8,
            tier: "Safe / Legitimate",
            baseValue: 15,
            shapFeatures: [
                { feature: "Verified Infrastructure Reputation", shapValue: -20, direction: "safe", description: "Official Microsoft EV SSL and DNSSEC signature" },
                { feature: "High Domain Authority", shapValue: -15, direction: "safe", description: "Established domain age > 25 years" },
                { feature: "Standard Lexical Structure", shapValue: -12, direction: "safe", description: "Clean URL structure without obfuscation" },
                { feature: "Long Path Length (> 50 chars)", shapValue: +4, direction: "risk", description: "Minor risk addition for lengthy query parameters" }
            ]
        }
    ];

    const activeSample = THREAT_SAMPLES[selectedThreat];

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* Header */}
            <div style={{ background: "linear-gradient(135deg, #0b132b 0%, #1c2541 100%)", borderRadius: "20px", padding: "2.5rem 3rem", color: "#ffffff" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.35rem 0.9rem", borderRadius: "999px", background: "rgba(0, 242, 254, 0.12)", border: "1px solid rgba(0, 242, 254, 0.35)", color: "#38bdf8", fontSize: "0.82rem", fontWeight: "700", marginBottom: "1rem" }}>
                    <Target className="w-3.5 h-3.5" />
                    <span>Module 4: Explainable AI (XAI) & SHAP Feature Attribution</span>
                </div>
                <h1 style={{ fontSize: "2.2rem", fontWeight: "800", color: "#ffffff", marginBottom: "0.75rem" }}>
                    SHAP Waterfall Feature Attribution Inspector
                </h1>
                <p style={{ color: "#94a3b8", fontSize: "1rem", lineHeight: "1.6", maxWidth: "780px" }}>
                    Instead of a black-box binary classification, PhishGuard calculates Shapley additive explanations (SHAP) to quantify exactly how much each feature pushes the risk score up or down.
                </p>
            </div>

            {/* Sample Selector */}
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                {THREAT_SAMPLES.map((sample, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedThreat(idx)}
                        style={{
                            padding: "0.75rem 1.25rem",
                            borderRadius: "12px",
                            border: selectedThreat === idx ? "2px solid #2563eb" : "1px solid #e2e8f0",
                            background: selectedThreat === idx ? "#ffffff" : "#f8fafc",
                            fontWeight: "700",
                            fontSize: "0.85rem",
                            cursor: "pointer",
                            color: selectedThreat === idx ? "#2563eb" : "#475569",
                            boxShadow: selectedThreat === idx ? "0 4px 12px rgba(37,99,235,0.15)" : "none"
                        }}
                    >
                        {sample.title}
                    </button>
                ))}
            </div>

            {/* Main SHAP Waterfall Visualizer */}
            <div style={{ background: "#ffffff", padding: "2rem", borderRadius: "16px", border: "1px solid #e2e8f0", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f1f5f9", paddingBottom: "1rem" }}>
                    <div>
                        <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "#64748b" }}>SHAP ATTRIBUTION EXPLANATION MODEL</span>
                        <h2 style={{ fontSize: "1.5rem", fontWeight: "900", color: activeSample.finalScore > 70 ? "#dc2626" : activeSample.finalScore > 40 ? "#d97706" : "#059669" }}>
                            {activeSample.tier} (Risk Score: {activeSample.finalScore}/100)
                        </h2>
                    </div>
                    <div style={{ textAlign: "right", background: "#f8fafc", padding: "0.5rem 1rem", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                        <span style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: "700", display: "block" }}>Base Model Risk</span>
                        <span style={{ fontSize: "1.2rem", fontWeight: "900", color: "#0f172a" }}>E[f(x)] = {activeSample.baseValue}</span>
                    </div>
                </div>

                {/* Waterfall Visual Rows */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {activeSample.shapFeatures.map((item, idx) => (
                        <div key={idx} style={{ background: "#f8fafc", padding: "1rem 1.25rem", borderRadius: "12px", border: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div style={{ flex: 1, paddingRight: "1.5rem" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                    <span style={{ fontWeight: "800", fontSize: "0.95rem", color: "#0f172a" }}>{item.feature}</span>
                                </div>
                                <p style={{ fontSize: "0.82rem", color: "#64748b", marginTop: "0.25rem" }}>{item.description}</p>
                            </div>

                            <div style={{ display: "flex", alignItems: "center", gap: "1rem", minWidth: "180px", justifyContent: "flex-end" }}>
                                <div style={{
                                    height: "10px",
                                    width: `${Math.abs(item.shapValue) * 4}px`,
                                    background: item.direction === "risk" ? "linear-gradient(90deg, #fca5a5, #dc2626)" : "linear-gradient(90deg, #86efac, #166534)",
                                    borderRadius: "999px"
                                }}></div>
                                <span style={{
                                    fontWeight: "900",
                                    fontSize: "1rem",
                                    color: item.direction === "risk" ? "#dc2626" : "#059669",
                                    minWidth: "60px",
                                    textAlign: "right"
                                }}>
                                    {item.shapValue > 0 ? `+${item.shapValue}` : item.shapValue}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
