"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Inbox,
  Eye,
  Archive,
  Trash2,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Loader2,
} from "lucide-react";

type Submission = {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  service: string;
  vehicle: string | null;
  date: string;
  time: string | null;
  notes: string | null;
  status: "new" | "read" | "archived";
  created_at: string;
};

type Filter = "all" | "new" | "read" | "archived";

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/submissions");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setSubmissions(data);
    } catch (err) {
      console.error("Failed to load submissions:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  const updateStatus = async (id: string, status: "read" | "archived" | "new") => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/admin/submissions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update");
      setSubmissions((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status } : s))
      );
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setActionLoading(null);
    }
  };

  const deleteSubmission = async (id: string) => {
    if (!confirm("Are you sure you want to delete this submission?")) return;
    setActionLoading(id);
    try {
      const res = await fetch(`/api/admin/submissions?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
      if (expandedId === id) setExpandedId(null);
    } catch (err) {
      console.error("Failed to delete:", err);
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = filter === "all" ? submissions : submissions.filter((s) => s.status === filter);

  const counts = {
    all: submissions.length,
    new: submissions.filter((s) => s.status === "new").length,
    read: submissions.filter((s) => s.status === "read").length,
    archived: submissions.filter((s) => s.status === "archived").length,
  };

  const statusBadge = (status: Submission["status"]) => {
    const styles = {
      new: "bg-blue-100 text-blue-700",
      read: "bg-slate-100 text-slate-600",
      archived: "bg-slate-50 text-slate-400",
    };
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Inbox className="h-6 w-6 text-amber-500" />
            Form Submissions
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            View and manage booking form submissions
          </p>
        </div>
        <button
          onClick={fetchSubmissions}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-lg w-fit">
        {(["all", "new", "read", "archived"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              filter === f
                ? "bg-white text-slate-900 shadow-sm font-medium"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
            <span className="ml-1.5 text-xs text-slate-400">({counts[f]})</span>
          </button>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <Inbox className="h-10 w-10 mx-auto mb-3 opacity-50" />
          <p>No {filter === "all" ? "" : filter} submissions yet</p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left px-4 py-3 font-medium text-slate-500">Name</th>
                <th className="text-left px-4 py-3 font-medium text-slate-500 hidden md:table-cell">Email</th>
                <th className="text-left px-4 py-3 font-medium text-slate-500 hidden lg:table-cell">Service</th>
                <th className="text-left px-4 py-3 font-medium text-slate-500 hidden lg:table-cell">Date</th>
                <th className="text-left px-4 py-3 font-medium text-slate-500">Status</th>
                <th className="text-left px-4 py-3 font-medium text-slate-500 hidden sm:table-cell">Submitted</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((sub) => (
                <SubmissionRow
                  key={sub.id}
                  sub={sub}
                  expanded={expandedId === sub.id}
                  onToggle={() => setExpandedId(expandedId === sub.id ? null : sub.id)}
                  onUpdateStatus={updateStatus}
                  onDelete={deleteSubmission}
                  actionLoading={actionLoading === sub.id}
                  statusBadge={statusBadge}
                  formatDate={formatDate}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function SubmissionRow({
  sub,
  expanded,
  onToggle,
  onUpdateStatus,
  onDelete,
  actionLoading,
  statusBadge,
  formatDate,
}: {
  sub: Submission;
  expanded: boolean;
  onToggle: () => void;
  onUpdateStatus: (id: string, status: "read" | "archived" | "new") => void;
  onDelete: (id: string) => void;
  actionLoading: boolean;
  statusBadge: (status: Submission["status"]) => React.ReactNode;
  formatDate: (iso: string) => string;
}) {
  return (
    <>
      <tr
        onClick={onToggle}
        className={`border-b border-slate-50 cursor-pointer transition-colors hover:bg-slate-50 ${
          sub.status === "new" ? "bg-blue-50/30" : ""
        }`}
      >
        <td className="px-4 py-3 font-medium text-slate-900">{sub.full_name}</td>
        <td className="px-4 py-3 text-slate-600 hidden md:table-cell">{sub.email}</td>
        <td className="px-4 py-3 text-slate-600 hidden lg:table-cell">{sub.service}</td>
        <td className="px-4 py-3 text-slate-600 hidden lg:table-cell">{sub.date}</td>
        <td className="px-4 py-3">{statusBadge(sub.status)}</td>
        <td className="px-4 py-3 text-slate-400 text-xs hidden sm:table-cell">{formatDate(sub.created_at)}</td>
        <td className="px-4 py-3 text-right">
          {expanded ? (
            <ChevronUp className="h-4 w-4 text-slate-400 inline" />
          ) : (
            <ChevronDown className="h-4 w-4 text-slate-400 inline" />
          )}
        </td>
      </tr>
      {expanded && (
        <tr>
          <td colSpan={7} className="bg-slate-50 px-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <span className="text-slate-400 text-xs uppercase tracking-wide">Full Name</span>
                <p className="text-slate-900 mt-0.5">{sub.full_name}</p>
              </div>
              <div>
                <span className="text-slate-400 text-xs uppercase tracking-wide">Phone</span>
                <p className="text-slate-900 mt-0.5">{sub.phone}</p>
              </div>
              <div>
                <span className="text-slate-400 text-xs uppercase tracking-wide">Email</span>
                <p className="text-slate-900 mt-0.5">{sub.email}</p>
              </div>
              <div>
                <span className="text-slate-400 text-xs uppercase tracking-wide">Service</span>
                <p className="text-slate-900 mt-0.5">{sub.service}</p>
              </div>
              <div>
                <span className="text-slate-400 text-xs uppercase tracking-wide">Vehicle</span>
                <p className="text-slate-900 mt-0.5">{sub.vehicle || "Not specified"}</p>
              </div>
              <div>
                <span className="text-slate-400 text-xs uppercase tracking-wide">Preferred Date</span>
                <p className="text-slate-900 mt-0.5">{sub.date}</p>
              </div>
              <div>
                <span className="text-slate-400 text-xs uppercase tracking-wide">Preferred Time</span>
                <p className="text-slate-900 mt-0.5">{sub.time || "No preference"}</p>
              </div>
              <div>
                <span className="text-slate-400 text-xs uppercase tracking-wide">Notes</span>
                <p className="text-slate-900 mt-0.5">{sub.notes || "None"}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
              {sub.status === "new" && (
                <button
                  onClick={(e) => { e.stopPropagation(); onUpdateStatus(sub.id, "read"); }}
                  disabled={actionLoading}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
                >
                  <Eye className="h-3.5 w-3.5" /> Mark as Read
                </button>
              )}
              {sub.status === "read" && (
                <button
                  onClick={(e) => { e.stopPropagation(); onUpdateStatus(sub.id, "new"); }}
                  disabled={actionLoading}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
                >
                  <Inbox className="h-3.5 w-3.5" /> Mark as New
                </button>
              )}
              {sub.status !== "archived" && (
                <button
                  onClick={(e) => { e.stopPropagation(); onUpdateStatus(sub.id, "archived"); }}
                  disabled={actionLoading}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
                >
                  <Archive className="h-3.5 w-3.5" /> Archive
                </button>
              )}
              {sub.status === "archived" && (
                <button
                  onClick={(e) => { e.stopPropagation(); onUpdateStatus(sub.id, "new"); }}
                  disabled={actionLoading}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
                >
                  <Inbox className="h-3.5 w-3.5" /> Restore
                </button>
              )}
              <button
                onClick={(e) => { e.stopPropagation(); onDelete(sub.id); }}
                disabled={actionLoading}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50 ml-auto"
              >
                <Trash2 className="h-3.5 w-3.5" /> Delete
              </button>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
