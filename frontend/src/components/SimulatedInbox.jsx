import React, { useState } from "react";
import { Inbox, Mail, AlertTriangle, ShieldCheck, Star, Trash2, ArrowRight, ExternalLink, Zap } from "lucide-react";

export function SimulatedInbox({ onGoToAnalyzer }) {
    const [emails, setEmails] = useState([
        {
            id: 1,
            senderName: "Microsoft Security Team",
            senderEmail: "security-notice@acc0unt-microsoft-update.xyz",
            subject: "URGENT: Your Office 365 Account Will Be Suspended Within 2 Hours!",
            time: "10:42 AM",
            threatLevel: "Phishing",
            score: 96,
            badgeColor: "#dc2626",
            body: "We detected unauthorized login attempts from IP 185.220.101.5 (Russia). Please verify your account immediately at http://g00gle-security-check.com/verify-account to avoid permanent lockout."
        },
        {
            id: 2,
            senderName: "Amazon Orders",
            senderEmail: "auto-confirm@amazon.com",
            subject: "Your Amazon.com order #114-9028472-9102834 has shipped",
            time: "09:15 AM",
            threatLevel: "Safe",
            score: 5,
            badgeColor: "#059669",
            body: "Your package with Wireless Noise Cancelling Headphones is on its way! Track your delivery directly in your Amazon account orders page."
        },
        {
            id: 3,
            senderName: "PayPal Support",
            senderEmail: "service-alert@paypa1-update-account.com",
            subject: "Security Notification: Unusual payment activity detected",
            time: "Yesterday",
            threatLevel: "Phishing",
            score: 91,
            badgeColor: "#dc2626",
            body: "A transfer of $840.00 USD to CryptoExchange LLC was authorized. If this was not you, log in to cancel immediately: http://paypa1-update-account.com/cancel-transaction"
        },
        {
            id: 4,
            senderName: "IT Support Helpdesk",
            senderEmail: "helpdesk@internal-company.edu",
            subject: "Scheduled Network Maintenance this Saturday at 2:00 AM EST",
            time: "Sep 07",
            threatLevel: "Safe",
            score: 12,
            badgeColor: "#059669",
            body: "Please be aware that central Wi-Fi and VPN access will undergo routine kernel updates for 30 minutes. No user action is required."
        }
    ]);

    const [selectedEmailId, setSelectedEmailId] = useState(1);
    const selectedEmail = emails.find(e => e.id === selectedEmailId) || emails[0];

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* Header */}
            <div style={{ background: "linear-gradient(135deg, #0b132b 0%, #1c2541 100%)", borderRadius: "20px", padding: "2.5rem 3rem", color: "#ffffff" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.35rem 0.9rem", borderRadius: "999px", background: "rgba(0, 242, 254, 0.12)", border: "1px solid rgba(0, 242, 254, 0.35)", color: "#38bdf8", fontSize: "0.82rem", fontWeight: "700", marginBottom: "1rem" }}>
                    <Inbox className="w-3.5 h-3.5" />
                    <span>Module 11: Controlled Email Client Sandbox</span>
                </div>
                <h1 style={{ fontSize: "2.2rem", fontWeight: "800", color: "#ffffff", marginBottom: "0.75rem" }}>
                    Simulated Email Client with PhishGuard AI Defense Tagging
                </h1>
                <p style={{ color: "#94a3b8", fontSize: "1rem", lineHeight: "1.6", maxWidth: "780px" }}>
                    Experience how PhishGuard AI automatically scans incoming enterprise webmail in real-time, tagging messages with live threat warnings.
                </p>
            </div>

            {/* Inbox Split View Container */}
            <div style={{ display: "grid", gridTemplateColumns: "360px 1fr", gap: "1.5rem", background: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", overflow: "hidden", minHeight: "550px" }}>
                {/* Left: Email List Sidebar */}
                <div style={{ borderRight: "1px solid #e2e8f0", background: "#f8fafc", display: "flex", flexDirection: "column" }}>
                    <div style={{ padding: "1.25rem", borderBottom: "1px solid #e2e8f0", fontWeight: "800", fontSize: "1.05rem", color: "#0f172a", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <Mail className="w-5 h-5 text-[#2563eb]" /> Enterprise Inbox Sandbox
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", overflowY: "auto" }}>
                        {emails.map((email) => {
                            const isSelected = email.id === selectedEmailId;
                            return (
                                <div
                                    key={email.id}
                                    onClick={() => setSelectedEmailId(email.id)}
                                    style={{
                                        padding: "1rem 1.25rem",
                                        borderBottom: "1px solid #e2e8f0",
                                        cursor: "pointer",
                                        background: isSelected ? "#ffffff" : "transparent",
                                        borderLeft: isSelected ? "4px solid #2563eb" : "4px solid transparent"
                                    }}
                                >
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                                        <span style={{ fontWeight: "700", fontSize: "0.85rem", color: "#0f172a" }}>{email.senderName}</span>
                                        <span style={{ fontSize: "0.75rem", color: "#64748b" }}>{email.time}</span>
                                    </div>
                                    <div style={{ fontSize: "0.82rem", fontWeight: "600", color: "#334155", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: "0.35rem" }}>
                                        {email.subject}
                                    </div>
                                    <span style={{ background: email.threatLevel === "Phishing" ? "#fef2f2" : "#f0fdf4", color: email.badgeColor, border: `1px solid ${email.badgeColor}`, padding: "0.15rem 0.5rem", borderRadius: "999px", fontSize: "0.7rem", fontWeight: "800" }}>
                                        {email.threatLevel === "Phishing" ? `🔴 Phishing (${email.score}%)` : `🟢 Safe (${email.score}%)`}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right: Email Detail Reader */}
                <div style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    {/* Threat Banner Overlay */}
                    <div style={{ background: selectedEmail.threatLevel === "Phishing" ? "#fef2f2" : "#f0fdf4", border: `1.5px solid ${selectedEmail.badgeColor}`, padding: "1.25rem 1.5rem", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            {selectedEmail.threatLevel === "Phishing" ? <AlertTriangle className="w-7 h-7 text-[#dc2626]" style={{ color: "#dc2626" }} /> : <ShieldCheck className="w-7 h-7 text-[#059669]" style={{ color: "#059669" }} />}
                            <div>
                                <h4 style={{ fontSize: "1.1rem", fontWeight: "900", color: selectedEmail.badgeColor }}>
                                    {selectedEmail.threatLevel === "Phishing" ? `🚨 High Risk Phishing Warning (${selectedEmail.score}/100)` : `🛡️ Verified Clean Email (${selectedEmail.score}/100)`}
                                </h4>
                                <p style={{ fontSize: "0.82rem", color: "#475569" }}>
                                    {selectedEmail.threatLevel === "Phishing" ? "Sender domain mismatch and suspicious link detected." : "Sender domain and digital headers are legitimate."}
                                </p>
                            </div>
                        </div>

                        {selectedEmail.threatLevel === "Phishing" && (
                            <button
                                onClick={onGoToAnalyzer}
                                style={{ background: "#dc2626", color: "#ffffff", border: "none", padding: "0.6rem 1rem", borderRadius: "8px", fontWeight: "700", fontSize: "0.82rem", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
                            >
                                <Zap className="w-4 h-4" /> Inspect URL
                            </button>
                        )}
                    </div>

                    {/* Email Header info */}
                    <div>
                        <h2 style={{ fontSize: "1.4rem", fontWeight: "800", color: "#0f172a", marginBottom: "0.5rem" }}>{selectedEmail.subject}</h2>
                        <div style={{ fontSize: "0.85rem", color: "#64748b", display: "flex", gap: "0.5rem" }}>
                            <span>From: <strong>{selectedEmail.senderName}</strong> &lt;{selectedEmail.senderEmail}&gt;</span>
                        </div>
                    </div>

                    {/* Email Body */}
                    <div style={{ background: "#f8fafc", padding: "1.5rem", borderRadius: "12px", border: "1px solid #e2e8f0", fontFamily: "var(--font-body)", lineHeight: "1.6", color: "#334155", whiteSpace: "pre-wrap" }}>
                        {selectedEmail.body}
                    </div>
                </div>
            </div>
        </div>
    );
}
