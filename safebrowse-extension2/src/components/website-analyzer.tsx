"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";

import { Card } from "@/components/ui/card";
import {
  AlertCircle,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";

type RiskLevel = "safe" | "caution" | "danger" | "default" | null;

interface WebsiteAnalysisResult {
  riskLevel: RiskLevel;
  summary: string;
  details: {
    https: boolean;
    domainAge: string;
    impersonation: boolean;
    reportedScam: boolean;
  };
  warnings: string[];
}

export default function WebsiteAnalyzer() {
  const [url, setUrl] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<WebsiteAnalysisResult | null>(null);

  // Simulating Chrome extension API call
  const getCurrentTab = useCallback(async () => {
    setCurrentUrl("https://example.com");
    setUrl("https://example.com");
  }, []);

  const analyzeWebsite = async () => {
    setIsAnalyzing(true);

    // Simulate API call (replace with actual analysis)
    setTimeout(() => {
      const mockResult: WebsiteAnalysisResult = {
        riskLevel:
          Math.random() > 0.7
            ? "danger"
            : Math.random() > 0.4
            ? "caution"
            : "safe",
        summary: "This website has some potential risk factors.",
        details: {
          https: true,
          domainAge: "2 years",
          impersonation: Math.random() > 0.7,
          reportedScam: Math.random() > 0.8,
        },
        warnings: [
          "Domain was registered recently",
          "Similar to known brand names",
        ],
      };

      setResult(mockResult);
      setIsAnalyzing(false);
    }, 1500);
  };

  // Helper function to reduce duplication
  const getRiskDetails = (riskLevel: RiskLevel) => {
    const riskDetails = {
      safe: {
        icon: <CheckCircle className="h-8 w-8 text-emerald-500" />,
        color:
          "bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800",
        text: "text-emerald-700 dark:text-emerald-400",
        label: "Safe to Browse",
      },
      caution: {
        icon: <AlertTriangle className="h-8 w-8 text-amber-500" />,
        color:
          "bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800",
        text: "text-amber-700 dark:text-amber-400",
        label: "Proceed with Caution",
      },
      danger: {
        icon: <AlertCircle className="h-8 w-8 text-red-500" />,
        color:
          "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800",
        text: "text-red-700 dark:text-red-400",
        label: "Potential Risk Detected",
      },
      default: {
        icon: null,
        color:
          "bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700",
        text: "text-gray-700 dark:text-gray-400",
        label: "Unknown Risk",
      },
    };

    return riskDetails[riskLevel || "default"];
  };

  const { icon, color, text, label } = getRiskDetails(
    result?.riskLevel || "default"
  );

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          placeholder="Enter website URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1"
        />
        <Button
          variant="outline"
          onClick={getCurrentTab}
          title="Use current tab"
        >
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>

      <Button
        onClick={analyzeWebsite}
        className="w-full bg-emerald-600 hover:bg-emerald-700"
        disabled={isAnalyzing || !url}
      >
        {isAnalyzing ? "Analyzing..." : "Analyze Website"}
      </Button>

      {result && (
        <Card className={cn("p-4 border-2", color)}>
          <div className="flex items-center space-x-3 mb-3">
            {icon}
            <div>
              <h3 className={cn("font-medium", text)}>{label}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {result.summary}
              </p>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>HTTPS Secure</span>
              <span>{result.details.https ? "Yes" : "No"}</span>
            </div>
            <div className="flex justify-between">
              <span>Domain Age</span>
              <span>{result.details.domainAge}</span>
            </div>
            <div className="flex justify-between">
              <span>Impersonation Risk</span>
              <span>{result.details.impersonation ? "Detected" : "None"}</span>
            </div>
            <div className="flex justify-between">
              <span>Reported as Scam</span>
              <span>{result.details.reportedScam ? "Yes" : "No"}</span>
            </div>
          </div>

          {result.warnings.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium mb-1">Warnings:</h4>
              <ul className="text-xs space-y-1">
                {result.warnings.map((warning, index) => (
                  <li key={index} className="flex items-start">
                    <AlertTriangle className="h-3 w-3 text-amber-500 mr-1 mt-0.5" />
                    <span>{warning}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
