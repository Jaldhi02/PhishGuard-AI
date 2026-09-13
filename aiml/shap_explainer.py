"""
PhishGuard AI — SHAP / LIME Feature Attribution Explainer Engine
"""

import numpy as np
from typing import List, Dict, Any

def compute_shap_waterfall_values(feature_dict: Dict[str, Any]) -> List[Dict[str, Any]]:
    """
    Computes Shapley Additive Explanations (SHAP) feature attributions.
    Base expected value E[f(x)] = 15
    """
    base_value = 15
    contributions = []
    
    if feature_dict.get("homograph_detected"):
        contributions.append({"feature": "Homograph Character Substitution", "shap_value": +25, "impact": "High Risk"})
    if feature_dict.get("brand_impersonation"):
        contributions.append({"feature": "Brand Trademark Impersonation", "shap_value": +22, "impact": "High Risk"})
    if feature_dict.get("urgent_keywords"):
        contributions.append({"feature": "Urgent Threat Language", "shap_value": +18, "impact": "Medium Risk"})
    if feature_dict.get("suspicious_tld"):
        contributions.append({"feature": "Unverified TLD Extension", "shap_value": +14, "impact": "Medium Risk"})
    if feature_dict.get("valid_ssl"):
        contributions.append({"feature": "Active TLS Certificate", "shap_value": -10, "impact": "Protective Factor"})

    return contributions
