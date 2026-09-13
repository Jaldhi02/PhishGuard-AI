import React from "react";
import {
    Shield, Globe, Mail, Target, Zap, CornerDownRight, Inbox, Search,
    HelpCircle, Gamepad2, LayoutDashboard, Sparkles
} from "lucide-react";

export function Header({ activeTab, setActiveTab, onOpenAiAssistant }) {
    const navTabs = [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
        { id: "url-analyzer", label: "URL Analyzer", icon: Globe },
        { id: "email-phishing", label: "Email Phishing", icon: Mail },
        { id: "xai", label: "Explainable AI", icon: Target },
        { id: "homograph", label: "Homograph & Brands", icon: Zap },
        { id: "redirects", label: "Redirect Tracer", icon: CornerDownRight },
        { id: "inbox", label: "Simulated Inbox", icon: Inbox },
        { id: "extension", label: "Extension Demo", icon: Search },
        { id: "quiz", label: "Awareness Quiz", icon: HelpCircle },
        { id: "defender", label: "Defender Game", icon: Gamepad2 },
    ];

    return (
        <header className="header-bar" style={{ padding: "0.85rem 1.5rem" }}>
            <div className="header-content" style={{ flexDirection: "column", gap: "0.85rem", alignItems: "stretch" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div className="logo-brand" onClick={() => setActiveTab("dashboard")}>
                        <div className="logo-icon-wrap">
                            <Shield className="w-5 h-5 text-[#2563eb]" />
                        </div>
                        <div>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                <span className="logo-text-title" style={{ fontSize: "1.2rem" }}>PhishGuard AI</span>
                                <span className="logo-tag">Platform v2.4</span>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <button
                            className="cyber-btn cyber-btn-secondary"
                            style={{ padding: "0.45rem 1rem", fontSize: "0.82rem" }}
                            onClick={onOpenAiAssistant}
                        >
                            <Sparkles className="w-4 h-4 text-[#2563eb]" />
                            <span>Ask AI Assistant</span>
                        </button>

                        <div className="system-status">
                            <div className="pulse-dot"></div>
                            <span>LIVE DEFENSE ACTIVE</span>
                        </div>
                    </div>
                </div>

                {/* Scrollable Horizontal Pill Navbar */}
                <div style={{ overflowX: "auto", paddingBottom: "4px" }}>
                    <nav style={{ display: "flex", gap: "0.5rem", minWidth: "max-content", alignItems: "center" }}>
                        {navTabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "0.45rem",
                                        padding: "0.5rem 1.1rem",
                                        borderRadius: "999px",
                                        fontFamily: "var(--font-heading)",
                                        fontSize: "0.85rem",
                                        fontWeight: isActive ? "700" : "600",
                                        cursor: "pointer",
                                        transition: "all 0.2s ease",
                                        border: isActive ? "1px solid #0f172a" : "1px solid #e2e8f0",
                                        background: isActive ? "#0f172a" : "#ffffff",
                                        color: isActive ? "#ffffff" : "#475569",
                                    }}
                                >
                                    <Icon className="w-4 h-4" style={{ color: isActive ? "#38bdf8" : "#64748b" }} />
                                    <span>{tab.label}</span>
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </div>
        </header>
    );
}
