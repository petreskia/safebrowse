import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WebsiteAnalyzer from "@/components/website-analyzer";
import DocumentAnalyzer from "@/components/document-analyzer";
import { Shield } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
          <Shield className="h-8 w-8 text-white mr-2" />
          <h1 className="text-xl font-bold text-white">SafeBrowse</h1>
        </div>

        <Tabs defaultValue="website" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="website">Website Check</TabsTrigger>
            <TabsTrigger value="document">Document Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="website" className="p-4">
            <WebsiteAnalyzer />
          </TabsContent>

          <TabsContent value="document" className="p-4">
            <DocumentAnalyzer />
          </TabsContent>
        </Tabs>
      </div>

      <footer className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        SafeBrowse • Protecting your online experience
      </footer>
    </main>
  );
}
