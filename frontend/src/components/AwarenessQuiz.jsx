import React, { useState } from "react";
import { HelpCircle, CheckCircle2, XCircle, Award, ArrowRight, Shield, RefreshCw } from "lucide-react";

export function AwarenessQuiz({ onGoToAnalyzer }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    const QUESTIONS = [
        {
            question: "You receive an email claiming to be from Microsoft titled 'URGENT: Verify Office 365 Account'. The sender is 'security@acc0unt-microsoft-update.xyz'. What is the biggest red flag?",
            options: [
                "The subject line uses capital letters.",
                "The sender domain 'acc0unt-microsoft-update.xyz' is a homograph look-alike domain not owned by Microsoft.",
                "The email was sent in the morning.",
                "Microsoft never sends security emails."
            ],
            correct: 1,
            explanation: "Legitimate Microsoft communications originate from official microsoft.com domains. Spammers use numbers ('0' for 'O') and low-cost TLDs (.xyz) to deceive users."
        },
        {
            question: "Which of the following URL structures poses the highest phishing risk?",
            options: [
                "https://www.paypal.com/signin",
                "http://192.168.1.105/paypa1-update/login.php",
                "https://support.google.com/accounts",
                "https://github.com/security"
            ],
            correct: 1,
            explanation: "Raw IP addresses combined with unencrypted HTTP protocol and digit substitution ('paypa1') are classic indicators of a credential harvesting site."
        },
        {
            question: "What is the primary purpose of a Multi-Hop HTTP Redirect (301/302) in phishing campaigns?",
            options: [
                "To speed up website loading times for mobile devices.",
                "To bypass security filters by hiding the final malicious landing site behind a legitimate URL shortener.",
                "To encrypt user password transmissions.",
                "To generate ad revenue for search engines."
            ],
            correct: 1,
            explanation: "Phishers use URL shorteners and redirect chains to mask the final destination server from email security crawlers."
        }
    ];

    const handleSelectOption = (index) => {
        if (selectedAnswer !== null) return;
        setSelectedAnswer(index);
        if (index === QUESTIONS[currentQuestion].correct) {
            setScore(prev => prev + 1);
        }
    };

    const handleNext = () => {
        if (currentQuestion + 1 < QUESTIONS.length) {
            setCurrentQuestion(prev => prev + 1);
            setSelectedAnswer(null);
        } else {
            setQuizFinished(true);
        }
    };

    const handleReset = () => {
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setScore(0);
        setQuizFinished(false);
    };

    const percentageScore = Math.round((score / QUESTIONS.length) * 100);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* Header */}
            <div style={{ background: "linear-gradient(135deg, #0b132b 0%, #1c2541 100%)", borderRadius: "20px", padding: "2.5rem 3rem", color: "#ffffff" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.35rem 0.9rem", borderRadius: "999px", background: "rgba(0, 242, 254, 0.12)", border: "1px solid rgba(0, 242, 254, 0.35)", color: "#38bdf8", fontSize: "0.82rem", fontWeight: "700", marginBottom: "1rem" }}>
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Module 12: Phishing Awareness Training & Quiz</span>
                </div>
                <h1 style={{ fontSize: "2.2rem", fontWeight: "800", color: "#ffffff", marginBottom: "0.75rem" }}>
                    Enterprise Cyber Awareness & Phishing Defense Quiz
                </h1>
                <p style={{ color: "#94a3b8", fontSize: "1rem", lineHeight: "1.6", maxWidth: "780px" }}>
                    Test your ability to spot homographs, sender spoofing, multi-hop redirects, and credential harvesting indicators.
                </p>
            </div>

            {/* Quiz Body */}
            {!quizFinished ? (
                <div style={{ background: "#ffffff", padding: "2.5rem", borderRadius: "16px", border: "1px solid #e2e8f0", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "#64748b", fontSize: "0.85rem", fontWeight: "700" }}>
                        <span>QUESTION {currentQuestion + 1} OF {QUESTIONS.length}</span>
                        <span>CURRENT SCORE: {score}</span>
                    </div>

                    <h2 style={{ fontSize: "1.35rem", fontWeight: "800", color: "#0f172a", lineHeight: "1.4" }}>
                        {QUESTIONS[currentQuestion].question}
                    </h2>

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        {QUESTIONS[currentQuestion].options.map((opt, idx) => {
                            let bg = "#f8fafc";
                            let border = "1px solid #cbd5e1";
                            let text = "#334155";

                            if (selectedAnswer !== null) {
                                if (idx === QUESTIONS[currentQuestion].correct) {
                                    bg = "#f0fdf4";
                                    border = "2px solid #059669";
                                    text = "#166534";
                                } else if (selectedAnswer === idx) {
                                    bg = "#fef2f2";
                                    border = "2px solid #dc2626";
                                    text = "#991b1b";
                                }
                            }

                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleSelectOption(idx)}
                                    style={{
                                        padding: "1rem 1.25rem",
                                        borderRadius: "12px",
                                        background: bg,
                                        border: border,
                                        color: text,
                                        textAlign: "left",
                                        fontWeight: "600",
                                        fontSize: "0.95rem",
                                        cursor: selectedAnswer === null ? "pointer" : "default"
                                    }}
                                >
                                    {opt}
                                </button>
                            );
                        })}
                    </div>

                    {selectedAnswer !== null && (
                        <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", padding: "1.25rem", borderRadius: "12px", color: "#1e40af", fontSize: "0.9rem", lineHeight: "1.5" }}>
                            <strong>Analysis Explanation:</strong> {QUESTIONS[currentQuestion].explanation}
                        </div>
                    )}

                    {selectedAnswer !== null && (
                        <button
                            onClick={handleNext}
                            style={{
                                background: "#2563eb",
                                color: "#ffffff",
                                padding: "0.75rem 1.5rem",
                                borderRadius: "10px",
                                border: "none",
                                fontWeight: "700",
                                cursor: "pointer",
                                alignSelf: "flex-end",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.5rem"
                            }}
                        >
                            <span>{currentQuestion + 1 === QUESTIONS.length ? "Finish Quiz" : "Next Question"}</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    )}
                </div>
            ) : (
                /* Results & Certificate */
                <div style={{ background: "#ffffff", padding: "3rem", borderRadius: "16px", border: "1px solid #e2e8f0", textCenter: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
                    <div style={{ background: "#f0fdf4", padding: "1.5rem", borderRadius: "50%", color: "#059669" }}>
                        <Award className="w-12 h-12" />
                    </div>

                    <h2 style={{ fontSize: "2rem", fontWeight: "900", color: "#0f172a" }}>Quiz Completed!</h2>

                    <div style={{ fontSize: "2.8rem", fontWeight: "900", color: percentageScore >= 70 ? "#059669" : "#dc2626" }}>
                        {percentageScore}% Awareness Rating
                    </div>

                    <p style={{ color: "#64748b", maxWidth: "500px", textAlign: "center" }}>
                        {percentageScore >= 70
                            ? "Congratulations! You possess high phishing threat awareness and can successfully identify obfuscated links and header mismatches."
                            : "Consider reviewing Module 1 (URL Feature Engine) and Module 5 (Homograph Detector) to improve your threat detection skills."}
                    </p>

                    <button
                        onClick={handleReset}
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
                            gap: "0.5rem"
                        }}
                    >
                        <RefreshCw className="w-4 h-4" />
                        <span>Retake Awareness Quiz</span>
                    </button>
                </div>
            )}
        </div>
    );
}
