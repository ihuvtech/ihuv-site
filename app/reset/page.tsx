"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleReset = async () => {
    if (!confirm("Are you sure you want to delete ALL user data? This cannot be undone!")) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/reset", {
        method: "POST",
      });

      const data = await res.json();
      setResult(data);

      if (data.ok) {
        alert("All user data deleted successfully! You can now register a new account.");
        setTimeout(() => {
          router.push("/auth/register");
        }, 2000);
      } else {
        alert(data.error || "Failed to delete data");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to delete data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-red-600 mb-4">⚠️ Reset Database</h1>
        <p className="text-gray-600 mb-6">
          This will permanently delete ALL users, portfolios, sessions, and accounts from the database.
        </p>
        
        <button
          onClick={handleReset}
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-medium transition-colors"
        >
          {loading ? "Deleting..." : "Delete All Data"}
        </button>

        {result && (
          <div className={`mt-4 p-4 rounded ${result.ok ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>
            {result.ok ? (
              <div>
                <p className="font-medium">✅ Success!</p>
                <p className="text-sm mt-2">Deleted:</p>
                <ul className="text-sm mt-1 ml-4 list-disc">
                  <li>{result.deleted.users} users</li>
                  <li>{result.deleted.portfolios} portfolios</li>
                  <li>{result.deleted.sessions} sessions</li>
                  <li>{result.deleted.accounts} accounts</li>
                </ul>
                <p className="text-sm mt-2">Redirecting to registration...</p>
              </div>
            ) : (
              <p>{result.error}</p>
            )}
          </div>
        )}

        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-gray-600 hover:text-gray-900">
            ← Back to home
          </a>
        </div>
      </div>
    </div>
  );
}
