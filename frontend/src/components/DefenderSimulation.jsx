import React, { useState } from "react";
import { Gamepad2, Layers, AlertTriangle, ShieldCheck, CheckCircle2, XCircle, RefreshCw, Zap } from "lucide-react";

export function DefenderSimulation({ onGoToAnalyzer }) {
    const [subTab, setSubTab] = useState("game");

    // Game state
    const [gameRound, setGameRound] = useState(0);
    const [score, setScore] = useState(0);
    const [gameFinished, setGameFinished] = useState(false);
    const [feedback, setFeedback] = useState(null);

    const SCENARIOS = [
        {
            sender: "IT Helpdesk <support@company-portal-verify.xyz>",
            subject: "Action Required: Password Expiration Notice",
            body: "Your domain password expires today. Click here to maintain access: http://company-portal-verify.xyz/login",
            isPhishing: true,
            reason: "Domain ends in .xyz and is an external look-alike domain not owned by company IT."
        },
        {
            sender: "GitHub Security <noreply@github.com>",
            subject: "[GitHub] A new personal access token was generated",
            body: "A new token was generated from IP 192.168.1.5. If you initiated this, no further action is needed.",
            isPhishing: false,
            reason: "Legitimate GitHub header and official github.com sender domain."
        },
        {
            sender: "PayPal Fraud Department <service@paypa1-update.com>",
            subject: "Account Temporarily Restricted",
            body: "We detected unauthorized transactions. Verify your identity at http://paypa1-update.com/verify to restore access.",
            isPhishing: true,
            reason: "Homograph digit substitution ('paypa1' instead of 'paypal')."
        }
    ];

    const handleChoice = (userThinksPhishing) => {
        const current = SCENARIOS[gameRound];
        const correct = userThinksPhishing === current.isPhishing;

        if (correct) setScore(prev => prev + 1);

        setFeedback({
            correct,
            reason: current.reason
        });
    };

    const handleNextRound = () => {
        setFeedback(null);
        if (gameRound + 1 < SCENARIOS.length) {
            setGameRound(prev => prev + 1);
        } else {
            setGameFinished(true);
        }
    };

    const handleResetGame = () => {
        setGameRound(0);
        setScore(0);
        setGameFinished(false);
        setFeedback(null);
    };

    // Campaign Clusters Data
    const CAMPAIGNS = [
        {
            id: "CAMP-2026-04",
            name: "Microsoft Office365 Credential Harvest Wave",
            threatActor: "APT-PhishGroup-9",
            detectedTargetDomains: ["acc0unt-microsoft-update.xyz", "g00gle-security-check.com"],
            affectedUsers: 1420,
            riskScore: 96,
            status: "Active Attack Wave"
        },
        {
            id: "CAMP-2026-03",
            name: "PayPal Account Restriction Typosquatting Campaign",
            threatActor: "FinScam Network",
            detectedTargetDomains: ["paypa1-update-account.com", "pay-pa1-verify.online"],
            affectedUsers: 890,
            riskScore: 91,
            status: "Mitigated / Blocked"
        }
    ];

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* Header */}
            <div style={{ background: "linear-gradient(135deg, #0b132b 0%, #1c2541 100%)", borderRadius: "20px", padding: "2.5rem 3rem", color: "#ffffff" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.35rem 0.9rem", borderRadius: "999px", background: "rgba(0, 242, 254, 0.12)", border: "1px solid rgba(0, 242, 254, 0.35)", color: "#38bdf8", fontSize: "0.82rem", fontWeight: "700", marginBottom: "1rem" }}>
                    <Gamepad2 className="w-3.5 h-3.5" />
                    <span>Module 13 & 17: Defender Game & Campaign Detection</span>
                </div>
                <h1 style={{ fontSize: "2.2rem", fontWeight: "800", color: "#ffffff", marginBottom: "0.75rem" }}>
                    Defender Simulation & Threat Campaign Clustering
                </h1>
                <p style={{ color: "#94a3b8", fontSize: "1rem", lineHeight: "1.6", maxWidth: "780px" }}>
                    Gamified security decision challenges for training users, alongside advanced campaign clustering to detect enterprise-wide attack waves.
                </p>

                <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
                    <button
                        onClick={() => setSubTab("game")}
                        style={{ padding: "0.6rem 1.25rem", borderRadius: "10px", border: "none", fontWeight: "700", cursor: "pointer", background: subTab === "game" ? "#2563eb" : "rgba(255,255,255,0.1)", color: "#ffffff" }}
                    >
                        🎮 Defender Simulation Game
                    </button>
                    <button
                        onClick={() => setSubTab("campaigns")}
                        style={{ padding: "0.6rem 1.25rem", borderRadius: "10px", border: "none", fontWeight: "700", cursor: "pointer", background: subTab === "campaigns" ? "#2563eb" : "rgba(255,255,255,0.1)", color: "#ffffff" }}
                    >
                        🔥 Phishing Campaign Cluster Engine
                    </button>
                </div>
            </div>

            {subTab === "game" ? (
                !gameFinished ? (
                    <div style={{ background: "#ffffff", padding: "2.5rem", borderRadius: "16px", border: "1px solid #e2e8f0", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", color: "#64748b", fontWeight: "700", fontSize: "0.85rem" }}>
                            <span>SCENARIO {gameRound + 1} OF {SCENARIOS.length}</span>
                            <span>SCORE: {score}</span>
                        </div>

                        <div style={{ background: "#f8fafc", padding: "1.5rem", borderRadius: "12px", border: "1px solid #cbd5e1" }}>
                            <div style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "0.5rem" }}>
                                Sender: <strong>{SCENARIOS[gameRound].sender}</strong>
                            </div>
                            <h3 style={{ fontSize: "1.2rem", fontWeight: "800", color: "#0f172a", marginBottom: "0.75rem" }}>
                                {SCENARIOS[gameRound].subject}
                            </h3>
                            <p style={{ fontSize: "0.92rem", color: "#334155", lineHeight: "1.5" }}>
                                {SCENARIOS[gameRound].body}
                            </p>
                        </div>

                        {feedback === null ? (
                            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "1rem" }}>
                                <button
                                    onClick={() => handleChoice(true)}
                                    style={{ background: "#dc2626", color: "#ffffff", padding: "0.85rem 2rem", borderRadius: "12px", border: "none", fontWeight: "800", cursor: "pointer", fontSize: "1rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
                                >
                                    <AlertTriangle className="w-5 h-5" /> Report as Phishing
                                </button>
                                <button
                                    onClick={() => handleChoice(false)}
                                    style={{ background: "#059669", color: "#ffffff", padding: "0.85rem 2rem", borderRadius: "12px", border: "none", fontWeight: "800", cursor: "pointer", fontSize: "1rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
                                >
                                    <ShieldCheck className="w-5 h-5" /> Trust & Allow Email
                                </button>
                            </div>
                        ) : (
                            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                <div style={{ background: feedback.correct ? "#f0fdf4" : "#fef2f2", border: `1.5px solid ${feedback.correct ? "#059669" : "#dc2626"}`, padding: "1.25rem", borderRadius: "12px", color: feedback.correct ? "#166534" : "#991b1b" }}>
                                    <h4 style={{ fontSize: "1.1rem", fontWeight: "900", marginBottom: "0.25rem" }}>
                                        {feedback.correct ? "✅ Correct Decision!" : "❌ Incorrect Decision!"}
                                    </h4>
                                    <p style={{ fontSize: "0.88rem" }}>{feedback.reason}</p>
                                </div>
                                <button
                                    onClick={handleNextRound}
                                    style={{ background: "#2563eb", color: "#ffffff", padding: "0.75rem 1.5rem", borderRadius: "10px", border: "none", fontWeight: "700", cursor: "pointer", alignSelf: "flex-end" }}
                                >
                                    Next Scenario
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div style={{ background: "#ffffff", padding: "3rem", borderRadius: "16px", border: "1px solid #e2e8f0", textCenter: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
                        <h2 style={{ fontSize: "2rem", fontWeight: "900", color: "#0f172a" }}>Defender Game Completed!</h2>
                        <div style={{ fontSize: "2.5rem", fontWeight: "900", color: "#2563eb" }}>Score: {score} / {SCENARIOS.length}</div>
                        <button onClick={handleResetGame} style={{ background: "#0f172a", color: "#ffffff", padding: "0.75rem 1.5rem", borderRadius: "10px", border: "none", fontWeight: "700", cursor: "pointer" }}>
                            Play Again
                        </button>
                    </div>
                )
            ) : (
                /* Campaign Clustering View */
                <div style={{ background: "#ffffff", padding: "2rem", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
                    <h2 style={{ fontSize: "1.4rem", fontWeight: "800", color: "#0f172a", marginBottom: "1rem" }}>Enterprise Threat Campaign Cluster Analysis</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        {CAMPAIGNS.map((camp, i) => (
                            <div key={i} style={{ background: "#f8fafc", padding: "1.5rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                                    <span style={{ fontWeight: "800", fontSize: "1.1rem", color: "#0f172a" }}>{camp.name}</span>
                                    <span style={{ background: "#fee2e2", color: "#dc2626", border: "1px solid #fca5a5", padding: "0.2rem 0.65rem", borderRadius: "699px", fontSize: "0.75rem", fontWeight: "800" }}>
                                        {camp.status} (Score {camp.riskScore})
                                    </span>
                                </div>
                                <div style={{ fontSize: "0.85rem", color: "#64748b", display: "flex", gap: "1.5rem" }}>
                                    <span>Cluster ID: <strong>{camp.id}</strong></span>
                                    <span>Attacker: <strong>{camp.threatActor}</strong></span>
                                    <span>Impacted Users: <strong>{camp.affectedUsers}</strong></span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
