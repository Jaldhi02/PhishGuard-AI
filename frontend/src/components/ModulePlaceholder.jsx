import React from "react";
import { Shield, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export function ModulePlaceholder({ title, badge, icon: Icon, description, onGoToAnalyzer }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <div
                style={{
                    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
                    borderRadius: "20px",
                    padding: "2.5rem 3rem",
                    color: "#ffffff",
                    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.15)",
                }}
            >
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.35rem 0.85rem", borderRadius: "999px", background: "rgba(37, 99, 235, 0.2)", border: "1px solid rgba(59, 130, 246, 0.4)", color: "#60a5fa", fontSize: "0.8rem", fontWeight: "700", marginBottom: "1rem" }}>
                    <Shield className="w-3.5 h-3.5" />
                    <span>{badge}</span>
                </div>
                <h1 style={{ fontSize: "2.2rem", fontWeight: "800", color: "#ffffff", marginBottom: "0.75rem" }}>
                    {title}
                </h1>
                <p style={{ color: "#94a3b8", fontSize: "1rem", lineHeight: "1.6", maxWidth: "780px" }}>
                    {description}
                </p>
            </div>

            <div style={{ background: "#ffffff", padding: "3rem", borderRadius: "16px", border: "1px solid #e2e8f0", textCenter: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem" }}>
                {Icon && (
                    <div style={{ background: "#eff6ff", padding: "1.25rem", borderRadius: "50%", color: "#2563eb" }}>
                        <Icon className="w-8 h-8" />
                    </div>
                )}
                <h2 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#0f172a" }}>Module Interactive Sandbox Active</h2>
                <p style={{ color: "#64748b", maxWidth: "550px", textAlign: "center" }}>
                    This defense module works in tandem with Module 1 (URL Feature Engine) for comprehensive threat analysis. You can trigger live scans or inspect heuristic features.
                </p>
                <button
                    onClick={onGoToAnalyzer}
                    style={{
                        background: "#2563eb",
                        color: "#ffffff",
                        padding: "0.75rem 1.5rem",
                        borderRadius: "10px",
                        border: "none",
                        fontWeight: "700",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        marginTop: "0.5rem"
                    }}
                >
                    <span>Go to URL Feature Analyzer</span>
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
