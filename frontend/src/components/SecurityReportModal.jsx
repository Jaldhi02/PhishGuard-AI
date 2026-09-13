import React from "react";
import { X, ShieldAlert, CheckCircle2, FileText, Download, Printer, Shield } from "lucide-react";

export function SecurityReportModal({ isOpen, onClose, reportData }) {
    if (!isOpen || !reportData) return null;

    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(15, 23, 42, 0.65)",
            backdropFilter: "blur(6px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem"
        }}>
            <div style={{
                background: "#ffffff",
                borderRadius: "20px",
                maxWidth: "680px",
                width: "100%",
                maxHeight: "90vh",
                overflowY: "auto",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                border: "1px solid #e2e8f0"
            }}>
                {/* Modal Header */}
                <div style={{
                    padding: "1.5rem 2rem",
                    borderBottom: "1px solid #e2e8f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "#f8fafc",
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "20px"
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <FileText className="w-5 h-5 text-[#2563eb]" />
                        <h3 style={{ fontSize: "1.2rem", fontWeight: "800", color: "#0f172a" }}>Enterprise Security Threat Audit Report</h3>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            padding: "0.4rem",
                            borderRadius: "50%",
                            color: "#64748b"
                        }}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Modal Body */}
                <div style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.25rem", borderRadius: "12px", background: reportData.riskScore > 70 ? "#fef2f2" : "#f0fdf4", border: `1px solid ${reportData.riskColor}` }}>
                        <div>
                            <span style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: "800", color: reportData.riskColor }}>Security Classification</span>
                            <h4 style={{ fontSize: "1.4rem", fontWeight: "900", color: reportData.riskColor, marginTop: "2px" }}>{reportData.classification}</h4>
                        </div>
                        <div style={{ textAlign: "right" }}>
                            <span style={{ fontSize: "2rem", fontWeight: "900", color: reportData.riskColor }}>{reportData.riskScore}</span>
                            <span style={{ fontSize: "0.75rem", color: "#64748b", display: "block" }}>/ 100 Risk Score</span>
                        </div>
                    </div>

                    <div>
                        <h4 style={{ fontSize: "0.95rem", fontWeight: "800", color: "#0f172a", marginBottom: "0.4rem" }}>Target Analyzed</h4>
                        <code style={{ background: "#f1f5f9", padding: "0.5rem 0.75rem", borderRadius: "8px", display: "block", fontSize: "0.85rem", wordBreak: "break-all", color: "#334155" }}>
                            {reportData.url}
                        </code>
                    </div>

                    <div>
                        <h4 style={{ fontSize: "0.95rem", fontWeight: "800", color: "#0f172a", marginBottom: "0.75rem" }}>SHAP XAI Threat Contribution Breakdown</h4>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            {reportData.xaiContributions.map((contrib, i) => (
                                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "0.6rem 0.85rem", background: "#f8fafc", borderRadius: "8px", fontSize: "0.85rem" }}>
                                    <span style={{ fontWeight: "600", color: "#334155" }}>{contrib.feature}</span>
                                    <span style={{ fontWeight: "800", color: contrib.impact > 0 ? "#dc2626" : "#059669" }}>
                                        {contrib.impact > 0 ? `+${contrib.impact}` : contrib.impact}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {reportData.brandMatch && (
                        <div style={{ background: "#fffbe6", border: "1px solid #fcd34d", padding: "1rem", borderRadius: "10px" }}>
                            <h4 style={{ fontSize: "0.9rem", fontWeight: "800", color: "#b45309", marginBottom: "0.25rem" }}>Brand Impersonation Alert</h4>
                            <p style={{ fontSize: "0.82rem", color: "#92400e" }}>
                                Domain spoofs official trademark <strong>{reportData.brandMatch.name}</strong> ({reportData.brandMatch.officialDomain}) with high string similarity.
                            </p>
                        </div>
                    )}
                </div>

                {/* Modal Footer */}
                <div style={{
                    padding: "1.25rem 2rem",
                    borderTop: "1px solid #e2e8f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    gap: "0.75rem",
                    background: "#f8fafc",
                    borderBottomLeftRadius: "20px",
                    borderBottomRightRadius: "20px"
                }}>
                    <button
                        onClick={() => window.print()}
                        style={{
                            background: "#ffffff",
                            border: "1px solid #cbd5e1",
                            padding: "0.6rem 1.25rem",
                            borderRadius: "8px",
                            fontWeight: "600",
                            fontSize: "0.85rem",
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.4rem"
                        }}
                    >
                        <Printer className="w-4 h-4" /> Print / Save PDF
                    </button>
                    <button
                        onClick={onClose}
                        style={{
                            background: "#0f172a",
                            color: "#ffffff",
                            border: "none",
                            padding: "0.6rem 1.25rem",
                            borderRadius: "8px",
                            fontWeight: "700",
                            fontSize: "0.85rem",
                            cursor: "pointer"
                        }}
                    >
                        Close Report
                    </button>
                </div>
            </div>
        </div>
    );
}
