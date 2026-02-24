"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchApi, API_BASE } from "@/lib/api";
import { useAuth } from "@/components/AuthProvider";
import { CheckCircle, FileText, Video, Terminal } from "lucide-react";

export function generateStaticParams() {
    return [{ id: 'Carter' }];
}

interface CaseDetail {
    case_id: string;
    case_name: string;
}

interface EvidenceFile {
    filename: string;
    content_type: string;
    status: string;
    gcs_uri: string;
}

export default function CaseView() {
    const { id } = useParams();
    const { user } = useAuth();
    const [caseData, setCaseData] = useState<CaseDetail | null>(null);
    const [evidence, setEvidence] = useState<EvidenceFile[]>([]);
    const [exportUrls, setExportUrls] = useState<Record<string, string>>({});
    const [activeTab, setActiveTab] = useState("evidence");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;
        Promise.all([
            fetchApi(`/cases/${id}`),
            fetchApi(`/cases/${id}/inventory`),
            fetchApi(`/cases/${id}/exports/latest`).catch(() => ({ urls: {} }))
        ])
            .then(([c, ev, exp]) => {
                setCaseData(c);
                setEvidence(ev);
                setExportUrls(exp.urls || {});
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [id, user]);

    const handleExport = (filename: string) => {
        if (exportUrls[filename]) {
            window.open(exportUrls[filename], "_blank");
        } else {
            alert(`${filename} not available yet. Please run the analysis.`);
        }
    };

    const copyRunnerCommand = () => {
        const cmd = `python tools/runner/run_all.py`;
        navigator.clipboard.writeText(cmd);
        alert("Runner command copied to clipboard!");
    };

    if (loading) return <div className="p-8 text-center animate-pulse">Loading case data...</div>;
    if (!caseData) return <div className="p-8 text-center">Case not found.</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">{caseData.case_name}</h1>
                <div className="flex gap-3">
                    <button onClick={() => handleExport("case_report.md")} className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-inset ring-brand-300 hover:bg-brand-50">Expert Report</button>
                    <button onClick={() => handleExport("relevant_clips.csv")} className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Relevant Clips</button>
                    <button onClick={() => handleExport("case_timeline.csv")} className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Timeline</button>
                    <button onClick={() => handleExport("evidence_inventory.csv")} className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Inventory</button>
                    <button onClick={() => handleExport("doc_fact_index.csv")} className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Doc Facts</button>
                    <button onClick={copyRunnerCommand} className="inline-flex items-center rounded-md bg-brand-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-500">
                        <Terminal className="h-4 w-4 mr-2" /> Run Analysis
                    </button>
                </div>
            </div>

            <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8">
                    {["evidence"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`${activeTab === tab
                                ? "border-brand-500 text-brand-600 border-b-2"
                                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                } whitespace-nowrap py-4 px-1 text-sm font-medium capitalize`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>

            {activeTab === "evidence" && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {evidence.length === 0 && <div className="text-gray-500 text-sm p-4">No evidence recorded. Run case sync.</div>}
                    {evidence.map((e, idx) => (
                        <div key={idx} className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-gray-400">
                            <div className="flex-shrink-0">
                                {e.content_type?.includes("video") ? <Video className="h-6 w-6 text-brand-500" /> : <FileText className="h-6 w-6 text-brand-500" />}
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-gray-900 truncate" title={e.filename}>{e.filename}</p>
                                <p className="text-xs text-gray-500 mt-1 capitalize">{e.status}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
