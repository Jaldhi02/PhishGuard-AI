// String Distance Algorithms (Levenshtein & Jaro-Winkler)
export function calculateLevenshteinDistance(a, b) {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

export function calculateLevenshteinSimilarity(str1, str2) {
  const distance = calculateLevenshteinDistance(str1.toLowerCase(), str2.toLowerCase());
  const maxLen = Math.max(str1.length, str2.length);
  if (maxLen === 0) return 1.0;
  return Math.max(0, (maxLen - distance) / maxLen);
}

export function analyzeUrl(rawUrl) {
  let urlString = rawUrl.trim();
  if (!urlString.startsWith("http://") && !urlString.startsWith("https://")) {
    urlString = "http://" + urlString;
  }

  const parsedUrl = new URL(urlString);
  const hostname = parsedUrl.hostname.toLowerCase();
  const isHttps = parsedUrl.protocol === "https:";

  // 12 Feature Extractions (Length, Subdomains, HTTPS, IP Host, Shorteners, Homographs, Brand Distance, Redirects)
  // ... Returns score 0-100 & XAI waterfall dataset
}
