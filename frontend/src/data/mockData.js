export const URL_PRESETS = [
    {
        label: "🔴 Critical: Fake Google Verification",
        url: "https://g00gle-security-check.com/verify-account?token=92847",
        category: "Phishing"
    },
    {
        label: "🔴 High: PayPal Credential Harvest",
        url: "http://192.168.1.105/paypa1-update/login.php",
        category: "Phishing"
    },
    {
        label: "🟠 Suspicious: Shortened Bitly Redirect",
        url: "https://bit.ly/3xX9z8A",
        category: "Suspicious"
    },
    {
        label: "🟢 Safe: Official Microsoft Portal",
        url: "https://www.microsoft.com/en-us/security",
        category: "Safe"
    },
    {
        label: "🟢 Safe: Official GitHub Domain",
        url: "https://github.com/security",
        category: "Safe"
    }
];

export const MOCK_DASHBOARD_METRICS = {
    totalScansToday: 14280,
    phishingDetected: 3842,
    activeThreatsBlocked: 1290,
    avgDetectionTimeMs: 42,
    threatLevel: "Elevated (Level 3)",
    threatDistribution: [
        { name: "Homograph Spoofing", value: 35, color: "#dc2626" },
        { name: "Credential Harvesters", value: 28, color: "#ea580c" },
        { name: "Shortened Redirects", value: 20, color: "#d97706" },
        { name: "Typosquatting", value: 17, color: "#2563eb" }
    ],
    recentScans: [
        { id: "SCAN-9021", url: "https://g00gle-security-check.com/verify", score: 94, status: "Phishing", time: "2 mins ago" },
        { id: "SCAN-9020", url: "https://auth-microsoft-support.xyz/login", score: 88, status: "Phishing", time: "5 mins ago" },
        { id: "SCAN-9019", url: "https://bit.ly/secure-portal-302", score: 65, status: "Suspicious", time: "12 mins ago" },
        { id: "SCAN-9018", url: "https://www.amazon.com/dp/B08N5WRWNW", score: 8, status: "Safe", time: "18 mins ago" },
        { id: "SCAN-9017", url: "https://paypa1-update-account.com", score: 91, status: "Phishing", time: "25 mins ago" }
    ]
};
