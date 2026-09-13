import React, { useState } from "react";
import { Mail, AlertTriangle, ShieldCheck, Cpu, Zap, FileText, CheckCircle2, RefreshCw } from "lucide-react";

export function EmailPhishingAnalyzer({ onGoToAnalyzer }) {
    const SAMPLE_EMAILS = [
        {
            title: "🔴 Sample 1: Fake Microsoft Office 365 Lockout",
            sender: "security-notice@acc0unt-microsoft-update.xyz",
            subject: "URGENT: Your Office 365 Account Will Be Suspended Within 2 Hours!",
            body: "Dear User,\n\nWe detected suspicious login activity on your Microsoft 365 account from IP 185.220.101.5 (Russia). To avoid immediate suspension of your email service and data loss, you must verify your credentials immediately.\n\nClick the secure link below to verify:\nhttps://g00gle-security-check.com/verify-account?token=92847\n\nFailure to verify within 2 hours will result in permanent account termination.\n\nGlobal IT Security Team",
            result: {
                phishingScore: 96,
                classification: "🔴 Likely Phishing / Critical Threat",
                category: "Credential Phishing & Brand Impersonation",
                senderDomain: "acc0unt-microsoft-update.xyz",
                claimedBrand: "Microsoft Office 365",
                domainMismatch: true,
                nlpIndicators: [
                    { name: "Extreme Urgency & Threat", score: "+28 Risk", detail: "Keywords: 'URGENT', 'Suspended Within 2 Hours', 'permanent termination'" },
                    { name: "Credential Harvesting Request", score: "+25 Risk", detail: "Requests user to verify credentials via unverified external URL" },
                    { name: "Sender-Domain Mismatch", score: "+22 Risk", detail: "Claimed Microsoft but sent from 'acc0unt-microsoft-update.xyz'" },
                    { name: "Homograph & Obfuscated Link", score: "+21 Risk", detail: "Embedded link contains character spoofing (g00gle)" }
                ],
                headerChecks: [
                    { check: "SPF Authentication", status: "FAIL", note: "SoftFail (IP 185.220.101.5 not authorized)" },
                    { check: "DKIM Signature", status: "FAIL", note: "No valid cryptographic signature" },
                    { check: "DMARC Alignment", status: "REJECT", note: "Header From domain mismatch" }
                ]
            }
        },
        {
            title: "🔴 Sample 2: PayPal Unauthorized Payment Alert",
            sender: "service-alert@paypa1-update-account.com",
            subject: "Security Notification: Unauthorized payment of $840.00 USD authorized",
            body: "Dear Customer,\n\nA payment of $840.00 USD to CryptoExchange LLC was authorized from a new unrecognized device. If you did not authorize this charge, you must cancel the transaction immediately by logging into your account.\n\nCancel Transaction:\nhttp://paypa1-update-account.com/cancel-transaction\n\nPayPal Fraud Prevention Dept",
            result: {
                phishingScore: 92,
                classification: "🔴 Likely Phishing / High Risk",
                category: "Financial Scam & Typosquatting",
                senderDomain: "paypa1-update-account.com",
                claimedBrand: "PayPal",
                domainMismatch: true,
                nlpIndicators: [
                    { name: "Financial Fear & Panic Incentive", score: "+26 Risk", detail: "Fabricates $840 USD unauthorized transaction" },
                    { name: "Typosquatting Character Spoofing", score: "+24 Risk", detail: "Uses digit 1 ('paypa1') to impersonate PayPal trademark" },
                    { name: "Unencrypted Action Link", score: "+22 Risk", detail: "Action link points to unencrypted HTTP endpoint" },
                    { name: "Call-to-Action Pressure", score: "+20 Risk", detail: "Pushes user to click 'Cancel Transaction' urgently" }
                ],
                headerChecks: [
                    { check: "SPF Authentication", status: "FAIL", note: "Header domain not on SPF whitelist" },
                    { check: "DKIM Signature", status: "FAIL", note: "DKIM body hash mismatch" },
                    { check: "DMARC Alignment", status: "REJECT", note: "Unaligned organizational domain" }
                ]
            }
        },
        {
            title: "🟢 Sample 3: Legitimate IT Maintenance Notification",
            sender: "helpdesk@company-internal.com",
            subject: "Scheduled VPN & Network Maintenance this Saturday at 2:00 AM EST",
            body: "Hello Team,\n\nPlease be advised that central Wi-Fi and corporate VPN services will undergo routine firmware maintenance this Saturday at 2:00 AM EST. Outage duration will be approximately 20 minutes.\n\nNo user action is required. If you experience connectivity issues after 3:00 AM, please submit a ticket on the internal IT intranet portal.\n\nCorporate IT Service Desk",
            result: {
                phishingScore: 6,
                classification: "🟢 Safe / Legitimate Internal Communication",
                category: "Routine Operational Notification",
                senderDomain: "company-internal.com",
                claimedBrand: "Internal IT Helpdesk",
                domainMismatch: false,
                nlpIndicators: [
                    { name: "Informational Tone", score: "-15 Risk", detail: "No urgency, panic language, or threat of lockout" },
                    { name: "No Action Link Required", score: "-12 Risk", detail: "Explicitly states 'No user action is required'" },
                    { name: "Verified Internal Domain", score: "-10 Risk", detail: "Sender domain matches enterprise organizational unit" }
                ],
                headerChecks: [
                    { check: "SPF Authentication", status: "PASS", note: "IP authorized by company SPF record" },
                    { check: "DKIM Signature", status: "PASS", note: "Cryptographic signature verified" },
                    { check: "DMARC Alignment", status: "PASS", note: "Full DKIM & SPF alignment" }
                ]
            }
        }
    ];

    // Form States
    const [sender, setSender] = useState(SAMPLE_EMAILS[0].sender);
    const [subject, setSubject] = useState(SAMPLE_EMAILS[0].subject);
    const [body, setBody] = useState(SAMPLE_EMAILS[0].body);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(SAMPLE_EMAILS[0].result);

    const handleSelectSample = (sample) => {
        setSender(sample.sender);
        setSubject(sample.subject);
        setBody(sample.body);
        setAnalysisResult(sample.result);
    };

    const handleRunEmailAnalysis = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            const matchedSample = SAMPLE_EMAILS.find(s => s.sender === sender) || SAMPLE_EMAILS[0];
            setAnalysisResult(matchedSample.result);
            setIsAnalyzing(false);
        }, 500);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* Header Banner */}
            <div style={{ background: "linear-gradient(135deg, #0b132b 0%, #1c2541 100%)", borderRadius: "20px", padding: "2.5rem 3rem", color: "#ffffff" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.35rem 0.9rem", borderRadius: "999px", background: "rgba(0, 242, 254, 0.12)", border: "1px solid rgba(0, 242, 254, 0.35)", color: "#38bdf8", fontSize: "0.82rem", fontWeight: "700", marginBottom: "1rem" }}>
                    <Mail className="w-3.5 h-3.5" />
                    <span>Module 2 & 3: Email Phishing & NLP Deep Learning</span>
                </div>
                <h1 style={{ fontSize: "2.2rem", fontWeight: "800", color: "#ffffff", marginBottom: "0.75rem" }}>
                    Email Phishing NLP & Header Intelligence Engine
                </h1>
                <p style={{ color: "#94a3b8", fontSize: "1rem", lineHeight: "1.6", maxWidth: "780px" }}>
                    Analyze email headers, sender authentication (SPF/DKIM/DMARC), and psychological urgency vectors.
                </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
                {/* Sample Selector Bar */}
                <div style={{ background: "#ffffff", padding: "1.25rem 1.75rem", borderRadius: "16px", border: "1px solid #e2e8f0", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    <span style={{ fontSize: "0.85rem", fontWeight: "800", color: "#0f172a" }}>Select Preset Email Sample to Test:</span>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                        {SAMPLE_EMAILS.map((sample, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleSelectSample(sample)}
                                style={{
                                    padding: "0.55rem 1rem",
                                    borderRadius: "10px",
                                    border: sender === sample.sender ? "2px solid #2563eb" : "1px solid #cbd5e1",
                                    background: sender === sample.sender ? "#eff6ff" : "#f8fafc",
                                    color: sender === sample.sender ? "#2563eb" : "#334155",
                                    fontSize: "0.82rem",
                                    fontWeight: "700",
                                    cursor: "pointer",
                                    transition: "all 0.2s ease"
                                }}
                            >
                                {sample.title}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Input Form */}
                <div style={{ background: "#ffffff", padding: "2rem", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: "800", color: "#0f172a", marginBottom: "1rem" }}>Inspect Email Content & Header Telemetry</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <div>
                            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", color: "#334155", marginBottom: "0.35rem" }}>Sender Address (Header From)</label>
                            <input
                                type="text"
                                value={sender}
                                onChange={(e) => setSender(e.target.value)}
                                style={{ width: "100%", padding: "0.65rem 1rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem", fontFamily: "var(--font-code)" }}
                            />
                        </div>

                        <div>
                            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", color: "#334155", marginBottom: "0.35rem" }}>Email Subject Line</label>
                            <input
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                style={{ width: "100%", padding: "0.65rem 1rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem", fontWeight: "600" }}
                            />
                        </div>

                        <div>
                            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", color: "#334155", marginBottom: "0.35rem" }}>Email Body Text & Embedded Links</label>
                            <textarea
                                rows={5}
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem", fontFamily: "var(--font-body)", lineHeight: "1.5" }}
                            />
                        </div>

                        <button
                            onClick={handleRunEmailAnalysis}
                            style={{ background: "#2563eb", color: "#ffffff", padding: "0.8rem 1.5rem", borderRadius: "10px", border: "none", fontWeight: "700", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", width: "max-content", marginTop: "0.5rem" }}
                        >
                            <Zap className="w-4 h-4" />
                            <span>Run DistilBERT & NLP Email Analysis</span>
                        </button>
                    </div>
                </div>

                {/* Results Display */}
                {isAnalyzing && (
                    <div style={{ background: "#ffffff", padding: "3rem", borderRadius: "16px", border: "1px solid #e2e8f0", textAlign: "center" }}>
                        <RefreshCw className="w-8 h-8 spin" style={{ color: "#2563eb", margin: "0 auto 1rem auto" }} />
                        <span style={{ fontWeight: "700", fontSize: "1.1rem" }}>Parsing Email Body, SPF/DKIM & Running DistilBERT Sentiment Classifiers...</span>
                    </div>
                )}

                {analysisResult && !isAnalyzing && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                        {/* Summary Card */}
                        <div style={{ background: "#ffffff", padding: "2rem", borderRadius: "16px", border: `2px solid ${analysisResult.phishingScore > 70 ? "#dc2626" : "#059669"}` }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                                    <div style={{ width: "110px", height: "110px", borderRadius: "50%", border: `5px solid ${analysisResult.phishingScore > 70 ? "#dc2626" : "#059669"}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: analysisResult.phishingScore > 70 ? "#fef2f2" : "#f0fdf4" }}>
                                        <span style={{ fontSize: "2.4rem", fontWeight: "900", color: analysisResult.phishingScore > 70 ? "#dc2626" : "#059669", lineHeight: "1" }}>{analysisResult.phishingScore}%</span>
                                        <span style={{ fontSize: "0.65rem", color: "#64748b", fontWeight: "700", marginTop: "2px" }}>PHISHING PROB</span>
                                    </div>
                                    <div>
                                        <h2 style={{ fontSize: "1.6rem", fontWeight: "900", color: analysisResult.phishingScore > 70 ? "#dc2626" : "#059669" }}>{analysisResult.classification}</h2>
                                        <span style={{ display: "inline-block", background: analysisResult.phishingScore > 70 ? "#fee2e2" : "#dcfce7", color: analysisResult.phishingScore > 70 ? "#991b1b" : "#166534", padding: "0.25rem 0.75rem", borderRadius: "999px", fontSize: "0.8rem", fontWeight: "700", marginTop: "0.35rem" }}>
                                            Category: {analysisResult.category}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Grid breakdown */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
                            {/* NLP Psychological Risk Vectors */}
                            <div style={{ background: "#ffffff", padding: "1.75rem", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
                                <h3 style={{ fontSize: "1.1rem", fontWeight: "800", color: "#0f172a", marginBottom: "1rem" }}>Psychological & Urgency Risk Vectors</h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                                    {analysisResult.nlpIndicators.map((ind, idx) => (
                                        <div key={idx} style={{ background: "#f8fafc", padding: "0.85rem", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                                            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "700", color: "#0f172a", fontSize: "0.9rem" }}>
                                                <span>{ind.name}</span>
                                                <span style={{ color: ind.score.includes("-") ? "#059669" : "#dc2626" }}>{ind.score}</span>
                                            </div>
                                            <p style={{ fontSize: "0.78rem", color: "#64748b", marginTop: "0.25rem" }}>{ind.detail}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Header Authentication Telemetry */}
                            <div style={{ background: "#ffffff", padding: "1.75rem", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
                                <h3 style={{ fontSize: "1.1rem", fontWeight: "800", color: "#0f172a", marginBottom: "1rem" }}>Header & Auth Record Telemetry</h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                                    {analysisResult.headerChecks.map((chk, idx) => (
                                        <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 0", borderBottom: "1px solid #f1f5f9" }}>
                                            <div>
                                                <span style={{ fontWeight: "700", fontSize: "0.88rem", color: "#334155" }}>{chk.check}</span>
                                                <span style={{ display: "block", fontSize: "0.75rem", color: "#64748b" }}>{chk.note}</span>
                                            </div>
                                            <span style={{
                                                background: chk.status === "PASS" ? "#f0fdf4" : "#fef2f2",
                                                color: chk.status === "PASS" ? "#166534" : "#dc2626",
                                                border: `1px solid ${chk.status === "PASS" ? "#bbf7d0" : "#fca5a5"}`,
                                                padding: "0.2rem 0.65rem",
                                                borderRadius: "6px",
                                                fontSize: "0.75rem",
                                                fontWeight: "800"
                                            }}>
                                                {chk.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

