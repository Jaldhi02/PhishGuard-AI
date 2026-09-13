import React, { useState, useEffect } from "react";
import { Cpu, ShieldAlert, CheckCircle2, ArrowRight, Zap, RefreshCw, Globe, FileText, CornerDownRight, Sparkles, Check, AlertTriangle, Info } from "lucide-react";
import { analyzeUrl } from "../utils/urlAnalyzerEngine";
import { URL_PRESETS } from "../data/mockData";

export function UrlAnalyzer({ initialUrl = "", onOpenReportModal }) {
    const [inputUrl, setInputUrl] = useState(initialUrl || "https://g00gle-security-check.com/verify-account");
    const [isScanning, setIsScanning] = useState(false);
    const [result, setResult] = useState(null);

    useEffect(() => {
        handleAnalyze(initialUrl || "https://g00gle-security-check.com/verify-account");
    }, [initialUrl]);

    const handleAnalyze = (targetUrl) => {
        const urlToTest = targetUrl || inputUrl;
        if (!urlToTest.trim()) return;

        setIsScanning(true);
        setResult(null);

        setTimeout(() => {
            const res = analyzeUrl(urlToTest);
            setResult(res);
            setIsScanning(false);
        }, 500);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* Dark Blue Rounded Hero Banner */}
            <div
                style={{
                    background: "linear-gradient(135deg, #0b132b 0%, #1c2541 100%)",
                    borderRadius: "20px",
                    padding: "2.5rem 3rem",
                    color: "#ffffff",
                    boxShadow: "0 10px 30px rgba(11, 19, 43, 0.15)",
                }}
            >
                <div
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.35rem 0.9rem",
                        borderRadius: "999px",
                        background: "rgba(0, 242, 254, 0.12)",
                        border: "1px solid rgba(0, 242, 254, 0.35)",
                        color: "#38bdf8",
                        fontSize: "0.82rem",
                        fontWeight: "700",
                        marginBottom: "1rem",
                    }}
                >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Module 1: AI-Based URL Feature Engine</span>
                </div>

                <h1 style={{ fontSize: "2.2rem", fontWeight: "800", color: "#ffffff", marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>
                    Analyze Suspicious Web URLs & Obfuscated Domains
                </h1>

                <p style={{ color: "#94a3b8", fontSize: "1rem", lineHeight: "1.6", maxWidth: "780px" }}>
                    PhishGuard extracts 14+ lexical, domain, homograph, and structural features to compute an explainable risk score (0–100) instead of a simple binary classification.
                </p>
            </div>

            {/* Input Bar & Presets */}
            <div className="glass-panel" style={{ padding: "2rem 2.5rem", background: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
                <form onSubmit={(e) => { e.preventDefault(); handleAnalyze(); }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", background: "#f8fafc", padding: "0.5rem 0.75rem", borderRadius: "12px", border: "1.5px solid #cbd5e1" }}>
                        <Globe className="w-5 h-5 text-[#2563eb]" style={{ flexShrink: 0, marginLeft: "0.5rem", color: "#2563eb" }} />
                        <input
                            type="text"
                            style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontSize: "1rem", fontFamily: "var(--font-code)", color: "#0f172a" }}
                            value={inputUrl}
                            onChange={(e) => setInputUrl(e.target.value)}
                            placeholder="Enter any domain or URL to inspect..."
                        />
                        <button
                            type="submit"
                            style={{
                                background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                                color: "#ffffff",
                                padding: "0.75rem 1.5rem",
                                borderRadius: "10px",
                                border: "none",
                                fontWeight: "700",
                                cursor: "pointer",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                fontSize: "0.95rem"
                            }}
                        >
                            <Zap className="w-4 h-4" />
                            <span>Analyze Phishing Risk</span>
                        </button>
                    </div>
                </form>

                <div style={{ marginTop: "1.25rem" }}>
                    <span style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: "600", display: "block", marginBottom: "0.5rem" }}>
                        Quick Demo Presets:
                    </span>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                        {URL_PRESETS.map((preset, idx) => (
                            <button
                                key={idx}
                                onClick={() => { setInputUrl(preset.url); handleAnalyze(preset.url); }}
                                style={{
                                    padding: "0.4rem 0.85rem",
                                    borderRadius: "999px",
                                    background: "#f1f5f9",
                                    border: "1px solid #cbd5e1",
                                    color: "#334155",
                                    fontSize: "0.8rem",
                                    fontWeight: "600",
                                    cursor: "pointer",
                                    transition: "all 0.2s ease"
                                }}
                            >
                                {preset.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scanning Indicator */}
            {isScanning && (
                <div style={{ background: "#ffffff", padding: "3rem", borderRadius: "16px", border: "1px solid #e2e8f0", textCenter: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
                    <RefreshCw className="w-8 h-8 spin" style={{ color: "#2563eb", animation: "spin 1s linear infinite" }} />
                    <span style={{ fontWeight: "700", fontSize: "1.1rem", color: "#0f172a" }}>Extracting 14+ Lexical & Homograph Features...</span>
                </div>
            )}

            {/* Analysis Results */}
            {result && !isScanning && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
                    {/* Main Risk Summary Card */}
                    <div className="glass-panel" style={{ padding: "2rem", border: `2px solid ${result.riskColor}`, background: "#ffffff", borderRadius: "16px" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                                <div style={{ width: "120px", height: "120px", borderRadius: "50%", border: `6px solid ${result.riskColor}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#f8fafc" }}>
                                    <span style={{ fontSize: "2.6rem", fontWeight: "900", color: result.riskColor, lineHeight: "1" }}>{result.riskScore}</span>
                                    <span style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: "700", marginTop: "2px" }}>/ 100 RISK</span>
                                </div>
                                <div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                        <h2 style={{ fontSize: "1.8rem", fontWeight: "900", color: result.riskColor }}>{result.tierLabel}</h2>
                                    </div>
                                    <p style={{ fontFamily: "var(--font-code)", color: "#334155", marginTop: "0.25rem", wordBreak: "break-all" }}>
                                        Target: <strong>{result.url}</strong>
                                    </p>
                                </div>
                            </div>
                            <button
                                style={{
                                    background: "#0f172a",
                                    color: "#ffffff",
                                    padding: "0.75rem 1.5rem",
                                    borderRadius: "10px",
                                    border: "none",
                                    fontWeight: "700",
                                    cursor: "pointer",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    fontSize: "0.9rem"
                                }}
                                onClick={() => onOpenReportModal(result)}
                            >
                                <FileText className="w-4 h-4" /> Export Audit PDF
                            </button>
                        </div>
                    </div>

                    {/* Feature Breakdown & XAI Matrix Grid */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "1.5rem" }}>
                        {/* XAI Waterfall Contributions */}
                        <div style={{ background: "#ffffff", padding: "1.75rem", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
                                <Cpu className="w-5 h-5 text-[#2563eb]" style={{ color: "#2563eb" }} />
                                <h3 style={{ fontSize: "1.1rem", fontWeight: "800", color: "#0f172a" }}>XAI SHAP Feature Risk Contributions</h3>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                                {result.xaiContributions.map((item, idx) => (
                                    <div key={idx} style={{ background: "#f8fafc", padding: "0.85rem 1rem", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.25rem" }}>
                                            <span style={{ fontWeight: "700", fontSize: "0.9rem", color: "#0f172a" }}>{item.feature}</span>
                                            <span style={{ fontWeight: "800", color: item.impact > 0 ? "#dc2626" : "#059669", fontSize: "0.9rem" }}>
                                                {item.impact > 0 ? `+${item.impact} Risk` : `${item.impact} Risk`}
                                            </span>
                                        </div>
                                        <p style={{ fontSize: "0.8rem", color: "#64748b" }}>{item.detail}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Feature Inspection Matrix */}
                        <div style={{ background: "#ffffff", padding: "1.75rem", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
                                <ShieldAlert className="w-5 h-5" style={{ color: "#dc2626" }} />
                                <h3 style={{ fontSize: "1.1rem", fontWeight: "800", color: "#0f172a" }}>Extracted Feature Telemetry</h3>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                                {result.featuresMatrix.map((feat, idx) => (
                                    <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", paddingBottom: "0.5rem" }}>
                                        <div>
                                            <span style={{ fontWeight: "600", fontSize: "0.85rem", color: "#334155" }}>{feat.name}</span>
                                            <span style={{ display: "block", fontSize: "0.75rem", color: "#64748b" }}>{feat.note}</span>
                                        </div>
                                        <span style={{
                                            padding: "0.25rem 0.65rem",
                                            borderRadius: "6px",
                                            fontSize: "0.75rem",
                                            fontWeight: "700",
                                            background: feat.status === "fail" ? "#fef2f2" : feat.status === "warning" ? "#fffbe6" : "#f0fdf4",
                                            color: feat.status === "fail" ? "#dc2626" : feat.status === "warning" ? "#d97706" : "#166534",
                                            border: `1px solid ${feat.status === "fail" ? "#fca5a5" : feat.status === "warning" ? "#fcd34d" : "#bbf7d0"}`
                                        }}>
                                            {feat.val}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
