import React, { useState } from "react";
import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import { UrlAnalyzer } from "./components/UrlAnalyzer";
import { EmailPhishingAnalyzer } from "./components/EmailPhishingAnalyzer";
import { XaiDeepDive } from "./components/XaiDeepDive";
import { HomographBrandDetector } from "./components/HomographBrandDetector";
import { RedirectTracer } from "./components/RedirectTracer";
import { SimulatedInbox } from "./components/SimulatedInbox";
import { BrowserExtensionDemo } from "./components/BrowserExtensionDemo";
import { AwarenessQuiz } from "./components/AwarenessQuiz";
import { DefenderSimulation } from "./components/DefenderSimulation";
import { SecurityReportModal } from "./components/SecurityReportModal";
import { AskAiModal } from "./components/AskAiModal";

export default function App() {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [targetUrlForAnalyzer, setTargetUrlForAnalyzer] = useState("https://g00gle-security-check.com/verify-account");

    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [reportData, setReportData] = useState(null);
    const [isAiModalOpen, setIsAiModalOpen] = useState(false);

    const handleNavigateToAnalyzer = (url = "") => {
        if (url) setTargetUrlForAnalyzer(url);
        setActiveTab("url-analyzer");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="app-container" style={{ minHeight: "100vh", background: "#f8fafc" }}>
            <Header activeTab={activeTab} setActiveTab={setActiveTab} onOpenAiAssistant={() => setIsAiModalOpen(true)} />

            <main className="main-content" style={{ maxWidth: "1280px", margin: "0 auto", padding: "2rem 1.5rem" }}>
                {activeTab === "dashboard" && (
                    <Dashboard
                        onNavigateToAnalyzer={handleNavigateToAnalyzer}
                        onOpenReportModal={(d) => { setReportData(d); setIsReportModalOpen(true); }}
                        onOpenAiModal={() => setIsAiModalOpen(true)}
                    />
                )}
                {activeTab === "url-analyzer" && (
                    <UrlAnalyzer
                        initialUrl={targetUrlForAnalyzer}
                        onOpenReportModal={(d) => { setReportData(d); setIsReportModalOpen(true); }}
                    />
                )}
                {activeTab === "email-phishing" && (
                    <EmailPhishingAnalyzer onGoToAnalyzer={() => handleNavigateToAnalyzer()} />
                )}
                {activeTab === "xai" && (
                    <XaiDeepDive onGoToAnalyzer={() => handleNavigateToAnalyzer()} />
                )}
                {activeTab === "homograph" && (
                    <HomographBrandDetector onGoToAnalyzer={() => handleNavigateToAnalyzer()} />
                )}
                {activeTab === "redirects" && (
                    <RedirectTracer onGoToAnalyzer={() => handleNavigateToAnalyzer()} />
                )}
                {activeTab === "inbox" && (
                    <SimulatedInbox onGoToAnalyzer={() => handleNavigateToAnalyzer("https://g00gle-security-check.com/verify-account")} />
                )}
                {activeTab === "extension" && (
                    <BrowserExtensionDemo onGoToAnalyzer={() => handleNavigateToAnalyzer()} />
                )}
                {activeTab === "quiz" && (
                    <AwarenessQuiz onGoToAnalyzer={() => handleNavigateToAnalyzer()} />
                )}
                {activeTab === "defender" && (
                    <DefenderSimulation onGoToAnalyzer={() => handleNavigateToAnalyzer()} />
                )}
            </main>

            <SecurityReportModal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} reportData={reportData} />
            <AskAiModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} />
        </div>
    );
}
