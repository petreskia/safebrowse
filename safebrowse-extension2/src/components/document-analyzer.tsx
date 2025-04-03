"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Upload, AlertTriangle, CheckCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

export default function DocumentAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [summary, setSummary] = useState<string | null>(null);
  const [inputMethod, setInputMethod] = useState<"upload" | "paste">("upload");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const analyzePdf = async () => {
    setIsAnalyzing(true);
    setProgress(0);
    setSummary(null);

    // Simulate analysis with progressive loading
    for (let i = 0; i <= 95; i += 5) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      setProgress(i);
    }

    // Mock API response
    setTimeout(() => {
      setProgress(100);
      setSummary(`
## Key Points in This Document

1. **Data Collection**
   - Your browsing history is collected
   - Personal information including name, email, and location is stored
   - Third-party cookies track your activity across websites

2. **Data Sharing**
   - Information is shared with advertising partners
   - Data may be sold to data brokers
   - Law enforcement can request access without warrant in some cases

3. **User Rights**
   - Limited ability to delete your data
   - Opt-out available for some tracking features
   - Changes to terms can happen without direct notification

4. **Potential Concerns**
   - Automatic renewal with 24-hour cancellation window
   - Dispute resolution limited to arbitration
   - Service can be terminated without prior notice
      `);
      setIsAnalyzing(false);
    }, 1000);
  };

  const canAnalyze =
    (inputMethod === "upload" && file) ||
    (inputMethod === "paste" && text.length > 50);

  return (
    <div className="space-y-4">
      <Tabs
        value={inputMethod}
        onValueChange={(v) => setInputMethod(v as "upload" | "paste")}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload PDF</TabsTrigger>
          <TabsTrigger value="paste">Paste Text</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4 pt-2">
          <Card className="border-dashed border-2 p-6 flex flex-col items-center justify-center">
            <FileText className="h-10 w-10 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center">
              Upload a legal document (PDF) to analyze
            </p>
            <label htmlFor="file-upload" className="cursor-pointer">
              <input
                id="file-upload"
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleFileChange}
              />
              <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <Upload className="h-4 w-4" />
                <span className="text-sm">Select PDF</span>
              </div>
            </label>
            {file && (
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Selected: {file.name}
              </p>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="paste" className="space-y-4 pt-2">
          <Textarea
            placeholder="Paste the terms & conditions or legal text here..."
            value={text}
            onChange={handleTextChange}
            className="min-h-[150px]"
          />
        </TabsContent>
      </Tabs>

      <Button
        onClick={analyzePdf}
        className="w-full bg-emerald-600 hover:bg-emerald-700"
        disabled={isAnalyzing || !canAnalyze}
      >
        {isAnalyzing ? "Analyzing..." : "Analyze Document"}
      </Button>

      {isAnalyzing && (
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Analyzing document...</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}

      {summary && (
        <Card className="p-4 border-2 bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800">
          <div className="flex items-center space-x-2 mb-3">
            <CheckCircle className="h-5 w-5 text-emerald-500" />
            <h3 className="font-medium text-emerald-700 dark:text-emerald-400">
              Document Summary
            </h3>
          </div>

          <div className="prose prose-sm dark:prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-sm">{summary}</div>
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-200 dark:border-emerald-800 flex items-start">
            <AlertTriangle className="h-4 w-4 text-amber-500 mr-2 mt-0.5" />
            <p className="text-xs text-gray-600 dark:text-gray-400">
              This is an AI-generated summary. Always review the original
              document for complete details.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
