import React, { useState } from "react";
import { Mail, Target, Zap, CornerDownRight, Inbox, Search, HelpCircle, Gamepad2 } from "lucide-react";
import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import { UrlAnalyzer } from "./components/UrlAnalyzer";
import { ModulePlaceholder } from "./components/ModulePlaceholder";
import { SecurityReportModal } from "./components/SecurityReportModal";
import { AskAiModal } from "./components/AskAiModal";

export default function App() {
  const [activeTab, setActiveTab] = useState("url-analyzer");
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
    <div className="app-container">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} onOpenAiAssistant={() => setIsAiModalOpen(true)} />

      <main className="main-content">
        {activeTab === "dashboard" && <Dashboard onNavigateToAnalyzer={handleNavigateToAnalyzer} onOpenReportModal={(d) => { setReportData(d); setIsReportModalOpen(true); }} onOpenAiModal={() => setIsAiModalOpen(true)} />}
        {activeTab === "url-analyzer" && <UrlAnalyzer initialUrl={targetUrlForAnalyzer} onOpenReportModal={(d) => { setReportData(d); setIsReportModalOpen(true); }} />}
        {activeTab === "email-phishing" && <ModulePlaceholder title="Module 2: Email Phishing Detection" badge="Module 2" icon={Mail} description="Parse email headers, verify SPF/DKIM/DMARC, and score body urgency." onGoToAnalyzer={() => setActiveTab("url-analyzer")} />}
        {activeTab === "xai" && <ModulePlaceholder title="Module 4: Explainable AI (XAI)" badge="Module 4" icon={Target} description="SHAP/LIME feature contribution waterfall risk charts." onGoToAnalyzer={() => setActiveTab("url-analyzer")} />}
        {activeTab === "homograph" && <ModulePlaceholder title="Module 5 & 6: Homograph & Brand Impersonation" badge="Module 5 & 6" icon={Zap} description="Levenshtein & Jaro-Winkler string similarity look-alike detectors." onGoToAnalyzer={() => setActiveTab("url-analyzer")} />}
        {activeTab === "redirects" && <ModulePlaceholder title="Module 7: Multi-Hop Redirect Tracer" badge="Module 7" icon={CornerDownRight} description="Trace shortened URLs to final destination servers." onGoToAnalyzer={() => setActiveTab("url-analyzer")} />}
        {activeTab === "inbox" && <ModulePlaceholder title="Module 11: Simulated Email Client Inbox" badge="Module 11" icon={Inbox} description="Controlled email sandbox with threat tags." onGoToAnalyzer={() => setActiveTab("url-analyzer")} />}
        {activeTab === "extension" && <ModulePlaceholder title="Module 10: Browser Extension Overlay Demo" badge="Module 10" icon={Search} description="Simulated web extension popup." onGoToAnalyzer={() => setActiveTab("url-analyzer")} />}
        {activeTab === "quiz" && <ModulePlaceholder title="Module 12: Phishing Awareness Quiz" badge="Module 12" icon={HelpCircle} description="Educational awareness quizzes." onGoToAnalyzer={() => setActiveTab("url-analyzer")} />}
        {activeTab === "defender" && <ModulePlaceholder title="Module 13: Defender Simulation Game" badge="Module 13" icon={Gamepad2} description="Gamified security awareness simulation." onGoToAnalyzer={() => setActiveTab("url-analyzer")} />}
      </main>

      <SecurityReportModal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} reportData={reportData} />
      <AskAiModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} />
    </div>
  );
}
