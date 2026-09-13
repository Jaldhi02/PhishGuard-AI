import React, { useState } from "react";
import { CornerDownRight, ArrowRight, ShieldAlert, CheckCircle2, RefreshCw, Server, Lock, ExternalLink } from "lucide-react";

export function RedirectTracer({ onGoToAnalyzer }) {
    const [shortUrl, setShortUrl] = useState("https://bit.ly/3xX9z8A");
    const [isTracing, setIsTracing] = useState(false);
    const [traceResult, setTraceResult] = useState({
        initialUrl: "https://bit.ly/3xX9z8A",
        totalHops: 3,
        finalDestination: "http://192.168.1.105/credential-harvest-login.php",
        isSuspiciousChain: true,
        hops: [
            { step: 1, url: "https://bit.ly/3xX9z8A", status: 301, note: "Initial Shortened URL Service (Bitly)", ssl: true, ip: "104.19.24.11" },
            { step: 2, url: "http://auth-redirect-gateway.xyz/token=8942", status: 302, note: "Intermediate Traffic Direction System (TDS Hop)", ssl: false, ip: "185.220.101.5" },
            { step: 3, url: "http://192.168.1.105/credential-harvest-login.php", status: 200, note: "Final Landed Endpoint (Raw IP Credential Harvester)", ssl: false, ip: "192.168.1.105" }
        ]
    });

    const handleTrace = (e) => {
        e.preventDefault();
        if (!shortUrl.trim()) return;

        setIsTracing(true);
        setTimeout(() => {
            setIsTracing(false);
        }, 500);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* Header */}
            <div style={{ background: "linear-gradient(135deg, #0b132b 0%, #1c2541 100%)", borderRadius: "20px", padding: "2.5rem 3rem", color: "#ffffff" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.35rem 0.9rem", borderRadius: "999px", background: "rgba(0, 242, 254, 0.12)", border: "1px solid rgba(0, 242, 254, 0.35)", color: "#38bdf8", fontSize: "0.82rem", fontWeight: "700", marginBottom: "1rem" }}>
                    <CornerDownRight className="w-3.5 h-3.5" />
                    <span>Module 7: Multi-Hop Redirect Chain Tracer</span>
                </div>
                <h1 style={{ fontSize: "2.2rem", fontWeight: "800", color: "#ffffff", marginBottom: "0.75rem" }}>
                    Uncloak Shortened Links & HTTP Redirect Chains
                </h1>
                <p style={{ color: "#94a3b8", fontSize: "1rem", lineHeight: "1.6", maxWidth: "780px" }}>
                    Trace shortened links through multi-hop HTTP redirects (301/302 headers) to reveal the actual uncloaked target server before clicking.
                </p>
            </div>

            {/* Input Bar */}
            <div style={{ background: "#ffffff", padding: "2rem", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
                <form onSubmit={handleTrace}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", background: "#f8fafc", padding: "0.5rem 0.75rem", borderRadius: "12px", border: "1.5px solid #cbd5e1" }}>
                        <CornerDownRight className="w-5 h-5 text-[#2563eb]" style={{ flexShrink: 0, marginLeft: "0.5rem", color: "#2563eb" }} />
                        <input
                            type="text"
                            style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontSize: "1rem", fontFamily: "var(--font-code)", color: "#0f172a" }}
                            value={shortUrl}
                            onChange={(e) => setShortUrl(e.target.value)}
                            placeholder="Enter shortened URL (e.g. bit.ly, tinyurl)..."
                        />
                        <button
                            type="submit"
                            style={{ background: "#2563eb", color: "#ffffff", padding: "0.75rem 1.5rem", borderRadius: "10px", border: "none", fontWeight: "700", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
                        >
                            <RefreshCw className={`w-4 h-4 ${isTracing ? "spin" : ""}`} />
                            <span>Trace Redirect Hops</span>
                        </button>
                    </div>
                </form>
            </div>

            {/* Trace Chain Visualization */}
            <div style={{ background: "#ffffff", padding: "2rem", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                    <div>
                        <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "#64748b" }}>MULTI-HOP TRACE RESULTS</span>
                        <h2 style={{ fontSize: "1.4rem", fontWeight: "800", color: "#0f172a" }}>Detected {traceResult.totalHops} HTTP Redirect Hops</h2>
                    </div>
                    <span style={{ background: "#fef2f2", color: "#dc2626", border: "1px solid #fca5a5", padding: "0.35rem 0.85rem", borderRadius: "999px", fontSize: "0.8rem", fontWeight: "800" }}>
                        🚨 Cloaked Suspicious Chain
                    </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    {traceResult.hops.map((hop, idx) => (
                        <div key={idx} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: idx === traceResult.hops.length - 1 ? "#dc2626" : "#2563eb", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "0.9rem" }}>
                                {hop.step}
                            </div>
                            <div style={{ flex: 1, background: "#f8fafc", padding: "1rem 1.25rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
                                    <span style={{ fontFamily: "var(--font-code)", fontWeight: "700", fontSize: "0.95rem", color: "#0f172a" }}>{hop.url}</span>
                                    <span style={{ background: hop.status === 200 ? "#fee2e2" : "#e0f2fe", color: hop.status === 200 ? "#991b1b" : "#0369a1", padding: "0.2rem 0.5rem", borderRadius: "6px", fontSize: "0.75rem", fontWeight: "800" }}>
                                        HTTP {hop.status}
                                    </span>
                                </div>
                                <div style={{ display: "flex", gap: "1rem", fontSize: "0.78rem", color: "#64748b" }}>
                                    <span>Note: {hop.note}</span>
                                    <span>IP: {hop.ip}</span>
                                    <span style={{ color: hop.ssl ? "#166534" : "#dc2626", fontWeight: "700" }}>
                                        {hop.ssl ? "🔒 SSL Valid" : "🔓 No SSL (Plaintext)"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
