import React, { useState } from "react";
import { X, Sparkles, Send, Bot, User, ShieldCheck, Zap } from "lucide-react";

export function AskAiModal({ isOpen, onClose }) {
    const [messages, setMessages] = useState([
        {
            role: "assistant",
            text: "Hello! I'm PhishGuard AI Threat Assistant. Ask me anything about suspicious links, email headers, homograph attacks, or explainable AI risk scoring."
        }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    if (!isOpen) return null;

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input;
        setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
        setInput("");
        setIsTyping(true);

        setTimeout(() => {
            let aiReply = "I analyzed your query against our phishing heuristics vector database. Look out for character substitutions (e.g. '0' for 'O'), missing SSL certificates, suspicious TLDs like .xyz, and non-official login endpoints.";
            if (userMsg.toLowerCase().includes("homograph") || userMsg.toLowerCase().includes("character")) {
                aiReply = "Homograph attacks use look-alike Unicode characters (such as Cyrillic 'а' or digit '0') to impersonate legitimate domains like google.com. PhishGuard uses Levenshtein and Jaro-Winkler string similarity to flag these instantly.";
            } else if (userMsg.toLowerCase().includes("shap") || userMsg.toLowerCase().includes("xai")) {
                aiReply = "Explainable AI (XAI) computes feature importance weights via SHAP values, showing you exactly how much each feature (URL length, IP host, TLD risk, brand match) contributed to the final 0-100 risk score.";
            }

            setMessages((prev) => [...prev, { role: "assistant", text: aiReply }]);
            setIsTyping(false);
        }, 700);
    };

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
                maxWidth: "600px",
                width: "100%",
                height: "600px",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                border: "1px solid #e2e8f0"
            }}>
                {/* Modal Header */}
                <div style={{
                    padding: "1.25rem 1.75rem",
                    borderBottom: "1px solid #e2e8f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
                    color: "#ffffff",
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "20px"
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                        <Sparkles className="w-5 h-5 text-[#38bdf8]" style={{ color: "#38bdf8" }} />
                        <h3 style={{ fontSize: "1.1rem", fontWeight: "800" }}>Ask PhishGuard AI Assistant</h3>
                    </div>
                    <button
                        onClick={onClose}
                        style={{ background: "transparent", border: "none", cursor: "pointer", color: "#94a3b8" }}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Chat Messages */}
                <div style={{ flex: 1, padding: "1.5rem", overflowY: "auto", display: "flex", flexDirection: "column", gap: "1rem", background: "#f8fafc" }}>
                    {messages.map((msg, index) => (
                        <div key={index} style={{
                            display: "flex",
                            justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                            gap: "0.6rem"
                        }}>
                            {msg.role === "assistant" && (
                                <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff", flexShrink: 0 }}>
                                    <Bot className="w-4 h-4" />
                                </div>
                            )}
                            <div style={{
                                padding: "0.85rem 1.15rem",
                                borderRadius: "14px",
                                maxWidth: "80%",
                                fontSize: "0.9rem",
                                lineHeight: "1.5",
                                background: msg.role === "user" ? "#2563eb" : "#ffffff",
                                color: msg.role === "user" ? "#ffffff" : "#0f172a",
                                border: msg.role === "assistant" ? "1px solid #e2e8f0" : "none",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
                            }}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div style={{ fontSize: "0.8rem", color: "#64748b", fontStyle: "italic", marginLeft: "2.5rem" }}>
                            PhishGuard AI is analyzing...
                        </div>
                    )}
                </div>

                {/* Chat Input */}
                <form onSubmit={handleSend} style={{ padding: "1rem 1.5rem", borderTop: "1px solid #e2e8f0", background: "#ffffff", borderBottomLeftRadius: "20px", borderBottomRightRadius: "20px", display: "flex", gap: "0.75rem" }}>
                    <input
                        type="text"
                        style={{ flex: 1, padding: "0.75rem 1rem", borderRadius: "10px", border: "1px solid #cbd5e1", outline: "none", fontSize: "0.9rem" }}
                        placeholder="Ask about threats, homograph algorithms, or heuristics..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button
                        type="submit"
                        style={{ background: "#2563eb", color: "#ffffff", border: "none", padding: "0.75rem 1.25rem", borderRadius: "10px", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.4rem" }}
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </form>
            </div>
        </div>
    );
}
