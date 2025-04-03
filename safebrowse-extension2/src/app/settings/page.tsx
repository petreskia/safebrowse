import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Shield, Settings, Key } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center">
          <Link href="/" className="text-white hover:text-white/80">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex-1 flex justify-center">
            <h1 className="text-xl font-bold text-white">Settings</h1>
          </div>
          <div className="w-5"></div> {/* Spacer for alignment */}
        </div>

        <div className="p-4 space-y-4">
          <Card className="p-4">
            <h2 className="text-lg font-medium mb-3 flex items-center">
              <Settings className="h-5 w-5 mr-2 text-gray-500" />
              General Settings
            </h2>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Auto-scan websites</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Automatically scan websites when you visit them
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Show notifications</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Display alerts for high-risk websites
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Dark mode</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Use dark theme for the extension
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <h2 className="text-lg font-medium mb-3 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-gray-500" />
              Security Settings
            </h2>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Enhanced protection</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Use additional security checks
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Block high-risk sites</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Prevent access to dangerous websites
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <h2 className="text-lg font-medium mb-3 flex items-center">
              <Key className="h-5 w-5 mr-2 text-gray-500" />
              API Settings
            </h2>

            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-medium mb-1">OpenAI API Key</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  Required for document summarization
                </p>
                <div className="flex space-x-2">
                  <input
                    type="password"
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="sk-..."
                    value="sk-••••••••••••••••••••••••••••••"
                  />
                  <Button variant="outline" size="sm">
                    Update
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <div className="text-center text-xs text-gray-500 dark:text-gray-400 pt-2">
            SafeBrowse v1.0.0
          </div>
        </div>
      </div>
    </main>
  );
}
