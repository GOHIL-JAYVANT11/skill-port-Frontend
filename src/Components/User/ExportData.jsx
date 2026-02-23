import React, { useState } from "react";
import { Download, FileSpreadsheet, Check, X } from "lucide-react";

const FIELD_CONFIG = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "location", label: "Location" },
  { key: "roles", label: "Roles" },
  { key: "accountStatus", label: "Account Status" },
  { key: "verificationStatus", label: "Verification Status" },
  { key: "joinedDate", label: "Joined Date" },
  { key: "lastActive", label: "Last Active" },
  { key: "skills", label: "Skills" },
  { key: "reportsCount", label: "Reports Count" },
  { key: "warningsCount", label: "Warnings Count" },
];

export const ExportData = ({ isOpen, onClose, users = [] }) => {
  const [format, setFormat] = useState("csv");
  const [scope, setScope] = useState("all");
  const [fields, setFields] = useState(
    FIELD_CONFIG.map((field) => ({ ...field, selected: true }))
  );

  const allSelected = fields.every((field) => field.selected);
  const selectedCount = fields.filter((field) => field.selected).length;
  const userCount = users.length;

  const handleToggleField = (key) => {
    setFields((prev) =>
      prev.map((field) =>
        field.key === key ? { ...field, selected: !field.selected } : field
      )
    );
  };

  const handleSelectAll = () => {
    setFields((prev) =>
      prev.map((field) => ({ ...field, selected: !allSelected }))
    );
  };

  const buildCsvContent = () => {
    const activeFields = fields.filter((field) => field.selected);
    if (!activeFields.length || !users.length) {
      return "";
    }

    const headerRow = activeFields
      .map((field) => `"${field.label.replace(/"/g, '""')}"`)
      .join(",");

    const rows = users.map((user) => {
      const values = activeFields.map((field) => {
        let value = user[field.key];
        if (value === undefined || value === null) {
          value = "";
        }
        if (Array.isArray(value)) {
          value = value.join(", ");
        }
        return `"${String(value).replace(/"/g, '""')}"`;
      });
      return values.join(",");
    });

    return [headerRow, ...rows].join("\n");
  };

  const handleExport = () => {
    if (format !== "csv") {
      return;
    }

    const csvContent = buildCsvContent();
    if (!csvContent) {
      return;
    }

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "users-export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    if (onClose) {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100">
        <div className="flex items-start justify-between px-6 pt-5 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Export Users
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Configure your export settings and download user data.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-6">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-800">
              Export Format
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormat("csv")}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                  format === "csv"
                    ? "border-amber-500 bg-amber-50 text-amber-700 shadow-sm"
                    : "border-slate-200 bg-white text-slate-600 hover:border-amber-400/70 hover:bg-amber-50/40"
                }`}
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white border border-amber-100">
                  <Download className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-left">
                  <div>CSV</div>
                  <p className="text-xs text-slate-500">Comma-separated</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFormat("excel")}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                  format === "excel"
                    ? "border-amber-500 bg-amber-50 text-amber-700 shadow-sm"
                    : "border-slate-200 bg-white text-slate-600 hover:border-amber-400/70 hover:bg-amber-50/40"
                }`}
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-amber-50 border border-amber-100">
                  <FileSpreadsheet className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-left">
                  <div>Excel</div>
                  <p className="text-xs text-slate-500">.xlsx format</p>
                </div>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-800">
              Export Scope
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setScope("all")}
                className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                  scope === "all"
                    ? "border-amber-500 bg-amber-50 text-amber-700 shadow-sm"
                    : "border-slate-200 bg-white text-slate-600 hover:border-amber-400/70 hover:bg-amber-50/40"
                }`}
              >
                <div className="text-left">
                  <div>All Users</div>
                  <p className="text-xs text-slate-500">
                    {userCount} users
                  </p>
                </div>
                {scope === "all" && (
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-500">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
              </button>

              <button
                type="button"
                onClick={() => setScope("filtered")}
                className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                  scope === "filtered"
                    ? "border-amber-500 bg-amber-50 text-amber-700 shadow-sm"
                    : "border-slate-200 bg-white text-slate-600 hover:border-amber-400/70 hover:bg-amber-50/40"
                }`}
              >
                <div className="text-left">
                  <div>Filtered Users</div>
                  <p className="text-xs text-slate-500">
                    {userCount} users matching current filters
                  </p>
                </div>
                {scope === "filtered" && (
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-500">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-800">
                Fields to Export
              </h3>
              <button
                type="button"
                onClick={handleSelectAll}
                className="inline-flex items-center gap-2 rounded-full border border-amber-500 px-3 py-1 text-xs font-medium text-amber-700 hover:bg-amber-50 transition-colors"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{allSelected ? "Deselect All" : "Select All"}</span>
              </button>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/60">
              <div className="max-h-56 overflow-y-auto px-4 py-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {fields.map((field) => (
                  <button
                    key={field.key}
                    type="button"
                    onClick={() => handleToggleField(field.key)}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-all border ${
                      field.selected
                        ? "border-amber-500 bg-white text-slate-800 shadow-sm"
                        : "border-slate-200 bg-white text-slate-600 hover:border-amber-400/70"
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full border text-[10px] ${
                        field.selected
                          ? "border-amber-500 bg-amber-500 text-white"
                          : "border-slate-300 bg-white text-transparent"
                      }`}
                    >
                      <Check className="w-3 h-3" />
                    </span>
                    <span>{field.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/80 rounded-b-2xl">
          <div className="text-xs text-slate-500">
            {userCount} users • {selectedCount} fields
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 rounded-lg border border-slate-200 hover:bg-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleExport}
              disabled={format !== "csv" || !selectedCount || !userCount}
              className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-amber-500/30 hover:bg-amber-700 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4" />
              <span>
                {format === "csv" ? "Export CSV" : "Export"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportData;
