"use client";

import { FileText } from "lucide-react";

interface CallSummaryProps {
  summary: string;
}

export function CallSummary({ summary }: CallSummaryProps) {
  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100/80">
          <FileText className="h-4 w-4 text-slate-600" />
        </div>
        <h3 className="text-sm font-semibold text-foreground">Call Summary</h3>
      </div>
      <div className="rounded-xl bg-white/50 p-4 backdrop-blur-sm">
        <p className="text-sm leading-relaxed text-foreground">{summary}</p>
      </div>
    </div>
  );
}
