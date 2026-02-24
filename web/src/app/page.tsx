"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { fetchApi } from "@/lib/api";
import Link from "next/link";
import { format } from "date-fns";
import { FolderOpen, ArrowRight, Scale } from "lucide-react";

interface Case {
  case_id: string;
  case_name: string;
  last_seen?: any;
}

export default function Dashboard() {
  const { user, signIn, loading: authLoading } = useAuth();
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetchApi("/cases")
      .then((data) => setCases(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [user]);

  if (authLoading) return <div className="text-center py-12">Loading...</div>;

  if (!user) {
    return (
      <div className="text-center py-20 max-w-md mx-auto">
        <Scale className="h-16 w-16 mx-auto text-brand-600 mb-6" />
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
          Evidence Analyzer
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Sign in to access case files, review AI-generated timelines, and export evidence summaries.
        </p>
        <button
          onClick={signIn}
          className="rounded-md bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 w-full"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Case Files</h1>
      {loading ? (
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                  Name
                </th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Created
                </th>
                <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Open</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {cases.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-8 text-center text-sm text-gray-500">
                    <FolderOpen className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    No cases available. Upload via local ingestor.
                  </td>
                </tr>
              ) : (
                cases.map((c) => (
                  <tr key={c.case_id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {c.case_name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {c.last_seen ? format(new Date(c.last_seen._seconds ? c.last_seen._seconds * 1000 : c.last_seen), "MMM d, yyyy") : "N/A"}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <Link
                        href={`/cases/${c.case_id}`}
                        className="text-brand-600 hover:text-brand-900 flex items-center justify-end"
                      >
                        Open <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
