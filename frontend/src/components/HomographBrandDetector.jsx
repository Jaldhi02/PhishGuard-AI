import React, { useState } from "react";
import { Zap, ShieldAlert, CheckCircle2, ArrowRight, RefreshCw, Cpu, Layers, ShieldCheck } from "lucide-react";
import { calculateLevenshteinSimilarity, calculateJaroWinklerSimilarity } from "../utils/urlAnalyzerEngine";

export function HomographBrandDetector({ onGoToAnalyzer }) {
    const [domainInput, setDomainInput] = useState("apple-id-verify.online");
    const [selectedBrandName, setSelectedBrandName] = useState("Apple");

    const BRANDS = [
        { name: "Apple", officialDomain: "apple.com", keywords: ["apple", "icloud"] },
        { name: "Microsoft", officialDomain: "microsoft.com", keywords: ["microsoft", "msft", "office365", "azure", "outlook"] },
        { name: "Google", officialDomain: "google.com", keywords: ["google", "g00gle", "gmail", "goog1e", "drive"] },
        { name: "PayPal", officialDomain: "paypal.com", keywords: ["paypal", "paypa1", "pay-pal"] },
        { name: "Amazon", officialDomain: "amazon.com", keywords: ["amazon", "amzn", "aws"] },
        { name: "Netflix", officialDomain: "netflix.com", keywords: ["netflix", "net-flix"] },
    ];

    const cleanInputHost = domainInput.trim().toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, "").split("/")[0];
    const cleanSubHost = cleanInputHost.split(".")[0];

    // 1. Check if input domain is the EXACT official domain (e.g. apple.com or microsoft.com)
    const exactOfficialMatch = BRANDS.find(b => cleanInputHost === b.officialDomain || cleanInputHost.endsWith("." + b.officialDomain));

    // 2. Auto-detect which brand is being targeted by the domain name
    let detectedTargetBrand = BRANDS.find(b => b.name === selectedBrandName) || BRANDS[0];
    let highestSimilarityScore = 0;

    BRANDS.forEach(brand => {
        const brandClean = brand.name.toLowerCase();
        const lev = calculateLevenshteinSimilarity(cleanSubHost, brandClean);
        const jw = calculateJaroWinklerSimilarity(cleanSubHost, brandClean);
        const kwMatch = brand.keywords.some(kw => cleanInputHost.includes(kw));

        const bestSim = Math.max(lev, jw);
        if (kwMatch || bestSim > highestSimilarityScore) {
            if (kwMatch || bestSim > 0.45) {
                highestSimilarityScore = bestSim;
                // If domain contains keyword or high similarity, auto-detect this brand
                if (kwMatch || bestSim > 0.60) {
                    detectedTargetBrand = brand;
                }
            }
        }
    });

    const activeBrand = detectedTargetBrand;
    const cleanBrandName = activeBrand.name.toLowerCase();

    const levSim = calculateLevenshteinSimilarity(cleanSubHost, cleanBrandName);
    const jwSim = calculateJaroWinklerSimilarity(cleanSubHost, cleanBrandName);

    // Visual Spoofing Check
    let spoofDetails = [];
    if (cleanInputHost.includes("0")) spoofDetails.push({ char: "0", target: "O", type: "Digit 0 substitution for Letter O" });
    if (cleanInputHost.includes("1") && !/^(\d{1,3}\.){3}\d{1,3}$/.test(cleanInputHost)) spoofDetails.push({ char: "1", target: "I / L", type: "Digit 1 substitution for Letter L or I" });
    if (cleanInputHost.includes("vv")) spoofDetails.push({ char: "vv", target: "W", type: "Double 'V' visual spoofing for 'W'" });

    // Determine Verdict
    const isOfficialDomain = Boolean(exactOfficialMatch);
    const isBrandImpersonation = !isOfficialDomain && (levSim > 0.50 || jwSim > 0.55 || spoofDetails.length > 0 || activeBrand.keywords.some(kw => cleanInputHost.includes(kw)));

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* Header */}
            <div style={{ background: "linear-gradient(135deg, #0b132b 0%, #1c2541 100%)", borderRadius: "20px", padding: "2.5rem 3rem", color: "#ffffff" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.35rem 0.9rem", borderRadius: "999px", background: "rgba(0, 242, 254, 0.12)", border: "1px solid rgba(0, 242, 254, 0.35)", color: "#38bdf8", fontSize: "0.82rem", fontWeight: "700", marginBottom: "1rem" }}>
                    <Zap className="w-3.5 h-3.5" />
                    <span>Module 5 & 6: Brand Impersonation & Homograph Detector</span>
                </div>
                <h1 style={{ fontSize: "2.2rem", fontWeight: "800", color: "#ffffff", marginBottom: "0.75rem" }}>
                    Look-Alike String Similarity & Visual Spoofing Engine
                </h1>
                <p style={{ color: "#94a3b8", fontSize: "1rem", lineHeight: "1.6", maxWidth: "780px" }}>
                    Detect typosquatting, character substitution, and unauthorized domain spoofing across major brand trademarks.
                </p>
            </div>

            {/* Input Panel */}
            <div style={{ background: "#ffffff", padding: "2rem", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
                    <div>
                        <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", color: "#334155", marginBottom: "0.35rem" }}>Suspicious Domain Name</label>
                        <input
                            type="text"
                            value={domainInput}
                            onChange={(e) => setDomainInput(e.target.value)}
                            style={{ width: "100%", padding: "0.65rem 1rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.95rem", fontFamily: "var(--font-code)", fontWeight: "600" }}
                            placeholder="Enter domain (e.g. apple-id-verify.online, apple.com)..."
                        />
                    </div>
                    <div>
                        <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", color: "#334155", marginBottom: "0.35rem" }}>Target Brand Trademark (Auto-Detected)</label>
                        <select
                            value={activeBrand.name}
                            onChange={(e) => setSelectedBrandName(e.target.value)}
                            style={{ width: "100%", padding: "0.65rem 1rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.95rem", fontWeight: "600", background: "#ffffff" }}
                        >
                            {BRANDS.map((b, idx) => (
                                <option key={idx} value={b.name}>{b.name} ({b.officialDomain})</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "1rem", alignItems: "center" }}>
                    <span style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: "600" }}>Quick Demo Presets:</span>
                    {[
                        { label: "🔴 Fake Apple: apple-id-verify.online", domain: "apple-id-verify.online" },
                        { label: "🟢 Genuine Apple: apple.com", domain: "apple.com" },
                        { label: "🔴 Fake Google: g00gle-security-check.com", domain: "g00gle-security-check.com" },
                        { label: "🔴 Fake PayPal: paypa1-update-account.com", domain: "paypa1-update-account.com" },
                        { label: "🔴 Fake Microsoft: micros0ft-login.xyz", domain: "micros0ft-login.xyz" },
                        { label: "🟢 Genuine Microsoft: microsoft.com", domain: "microsoft.com" }
                    ].map((preset, i) => (
                        <button
                            key={i}
                            onClick={() => { setDomainInput(preset.domain); setSelectedBrandName(preset.domain.includes("apple") ? "Apple" : preset.domain.includes("micros") ? "Microsoft" : preset.domain.includes("g00gle") ? "Google" : "PayPal"); }}
                            style={{ padding: "0.3rem 0.7rem", borderRadius: "999px", background: "#f1f5f9", border: "1px solid #cbd5e1", fontSize: "0.78rem", fontWeight: "600", cursor: "pointer" }}
                        >
                            {preset.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
                {/* Impersonation Verdict */}
                <div style={{ background: "#ffffff", padding: "1.75rem", borderRadius: "16px", border: `2px solid ${isOfficialDomain ? "#059669" : isBrandImpersonation ? "#dc2626" : "#2563eb"}` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                        {isOfficialDomain ? (
                            <ShieldCheck className="w-7 h-7" style={{ color: "#059669" }} />
                        ) : isBrandImpersonation ? (
                            <ShieldAlert className="w-7 h-7" style={{ color: "#dc2626" }} />
                        ) : (
                            <CheckCircle2 className="w-7 h-7" style={{ color: "#2563eb" }} />
                        )}

                        <div>
                            <h3 style={{ fontSize: "1.3rem", fontWeight: "900", color: isOfficialDomain ? "#059669" : isBrandImpersonation ? "#dc2626" : "#2563eb" }}>
                                {isOfficialDomain
                                    ? "🟢 Verified Official Domain (Legitimate)"
                                    : isBrandImpersonation
                                        ? "🚨 High Risk Brand Impersonation"
                                        : "🟢 Safe / Clean Domain"}
                            </h3>
                            <span style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: "600" }}>
                                {isOfficialDomain
                                    ? `Authentic website owned by ${exactOfficialMatch.name}`
                                    : isBrandImpersonation
                                        ? `Detected unauthorized domain spoofing trademark '${activeBrand.name}'`
                                        : "No brand spoofing or character manipulation detected"}
                            </span>
                        </div>
                    </div>

                    <div style={{ background: "#f8fafc", padding: "1rem", borderRadius: "10px", border: "1px solid #e2e8f0", fontSize: "0.88rem", color: "#334155", lineHeight: "1.5" }}>
                        <p style={{ marginBottom: "0.4rem" }}>
                            Tested Domain: <code style={{ fontFamily: "var(--font-code)", fontWeight: "800", color: "#0f172a" }}>{cleanInputHost}</code>
                        </p>
                        <p style={{ marginBottom: "0.4rem" }}>
                            Official Brand Domain: <code style={{ fontFamily: "var(--font-code)", fontWeight: "800", color: "#2563eb" }}>{activeBrand.officialDomain}</code>
                        </p>
                        <p style={{ fontSize: "0.8rem", color: isOfficialDomain ? "#166534" : isBrandImpersonation ? "#991b1b" : "#1e40af", fontWeight: "700", marginTop: "0.5rem" }}>
                            {isOfficialDomain
                                ? `✅ MATCH: ${cleanInputHost} is the genuine, official domain for ${activeBrand.name}.`
                                : isBrandImpersonation
                                    ? `⚠️ MISMATCH: ${cleanInputHost} is NOT the official domain (${activeBrand.officialDomain}). This is a suspicious phishing link!`
                                    : `Clean domain.`}
                        </p>
                    </div>
                </div>
            </div>

            {/* Homograph Character Substitutions */}
            {spoofDetails.length > 0 && (
                <div style={{ background: "#fef2f2", padding: "1.5rem", borderRadius: "16px", border: "1px solid #fca5a5" }}>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: "800", color: "#991b1b", marginBottom: "0.75rem" }}>Detected Homograph Character Substitutions</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        {spoofDetails.map((spoof, idx) => (
                            <div key={idx} style={{ background: "#ffffff", padding: "0.75rem 1rem", borderRadius: "8px", border: "1px solid #fecaca", fontSize: "0.85rem", color: "#991b1b", fontWeight: "600" }}>
                                Replacing '<strong>{spoof.target}</strong>' with character '<strong>{spoof.char}</strong>' — {spoof.type}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
