import React, { useState, useEffect } from "react";
import { Cpu, ShieldAlert, CheckCircle2, ArrowRight, Zap, RefreshCw, Globe, FileText, CornerDownRight, Sparkles, Check } from "lucide-react";
import { analyzeUrl } from "../utils/urlAnalyzerEngine";
import { URL_PRESETS } from "../data/mockData";

export function UrlAnalyzer({ initialUrl = "", onOpenReportModal }) {
  const [inputUrl, setInputUrl] = useState(initialUrl || "https://g00gle-security-check.com/verify-account");
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    handleAnalyze(inputUrl || "https://g00gle-security-check.com/verify-account");
  }, []);

  const handleAnalyze = (targetUrl) => {
    const urlToTest = targetUrl || inputUrl;
    if (!urlToTest.trim()) return;

    setIsScanning(true);
    setResult(null);

    setTimeout(() => {
      const res = analyzeUrl(urlToTest);
      setResult(res);
      setIsScanning(false);
    }, 600);
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

        <h1 style={{ fontSize: "2.3rem", fontWeight: "800", color: "#ffffff", marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>
          Analyze Suspicious Web URLs & Obfuscated Domains
        </h1>

        <p style={{ color: "#94a3b8", fontSize: "1rem", lineHeight: "1.6", maxWidth: "780px" }}>
          PhishGuard extracts 14+ lexical, domain, homograph, and structural features to compute an explainable risk score (0–100) instead of a simple binary classification.
        </p>
      </div>

      {/* Input Bar & Presets */}
      <div className="glass-panel" style={{ padding: "2rem 2.5rem", background: "#ffffff" }}>
        <form onSubmit={(e) => { e.preventDefault(); handleAnalyze(); }}>
          <div className="cyber-input-group">
            <Globe className="w-5 h-5 text-[#2563eb]" style={{ flexShrink: 0, marginRight: "0.5rem" }} />
            <input
              type="text"
              className="cyber-input"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
            />
            <button type="submit" className="cyber-btn cyber-btn-primary">
              <Zap className="w-4 h-4" />
              <span>Analyze Phishing Risk</span>
            </button>
          </div>
        </form>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginTop: "1rem" }}>
          {URL_PRESETS.map((preset, idx) => (
            <button key={idx} className="preset-chip" onClick={() => { setInputUrl(preset.url); handleAnalyze(preset.url); }}>
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Analysis Results */}
      {result && !isScanning && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
          <div className="glass-panel" style={{ padding: "2rem", border: `1.5px solid ${result.riskColor}`, background: "#ffffff" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                <div style={{ width: "130px", height: "130px", borderRadius: "50%", border: `6px solid ${result.riskColor}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#f8fafc" }}>
                  <span style={{ fontSize: "2.8rem", fontWeight: "900", color: result.riskColor }}>{result.riskScore}</span>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-dim)", fontWeight: "700" }}>/ 100 RISK</span>
                </div>
                <div>
                  <h2 style={{ fontSize: "2rem", fontWeight: "900", color: result.riskColor }}>{result.tierLabel}</h2>
                  <p style={{ fontFamily: "var(--font-code)", color: "var(--text-main)" }}>Target: {result.url}</p>
                </div>
              </div>
              <button className="cyber-btn cyber-btn-primary" onClick={() => onOpenReportModal(result)}>
                <FileText className="w-4 h-4" /> Generate PDF Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
