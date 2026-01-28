"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  PhoneOutgoing,
  PhoneIncoming,
  PhoneMissed,
  Check,
  X,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface CallRecord {
  id: string;
  dateTime: string;
  relativeTime: string;
  agent: string;
  customer: {
    name: string;
    phone: string;
  };
  category: string;
  categoryIcon: "retail" | "no-answer" | "parts" | "finance" | "callback";
  direction: "inbound" | "outbound";
  coachingPoints: string[];
  reviewed: boolean | null;
  enquiryLogged: "yes" | "no" | "n/a";
  audioDuration: string;
  audioProgress: number;
}

interface CallsTableProps {
  calls: CallRecord[];
  currentPage: number;
  totalPages: number;
  totalCalls: number;
  onPageChange: (page: number) => void;
  onCallClick: (callId: string) => void;
}

const categoryStyles: Record<string, { bg: string; text: string }> = {
  "Retail Enquiry": { bg: "bg-slate-100", text: "text-slate-700" },
  "No Answer": { bg: "bg-slate-100", text: "text-slate-600" },
  "Parts Exchange": { bg: "bg-slate-100", text: "text-slate-700" },
  "Finance/Payment": { bg: "bg-amber-50", text: "text-amber-700" },
  "Callback Request": { bg: "bg-slate-100", text: "text-slate-700" },
};

const coachingPointLabels: Record<string, { label: string; type: "positive" | "negative" | "neutral" }> = {
  "good-opener": { label: "Opener", type: "positive" },
  "good-opening": { label: "Opening", type: "positive" },
  "excellent-close": { label: "Close", type: "positive" },
  "excellent-closing": { label: "Closing", type: "positive" },
  "good-closing": { label: "Closing", type: "positive" },
  "needs-improvement": { label: "Improve", type: "negative" },
  "needs-improvement-pace": { label: "Pace", type: "negative" },
  "needs-improvement-closing": { label: "Closing", type: "negative" },
  "excellent-greeting": { label: "Greeting", type: "positive" },
  "good-product-knowledge": { label: "Product", type: "positive" },
  "good-product-demo": { label: "Demo", type: "positive" },
  "excellent-rapport": { label: "Rapport", type: "positive" },
  "good-needs-analysis": { label: "Analysis", type: "positive" },
  "excellent-objection-handling": { label: "Objections", type: "positive" },
  "excellent-finance-explanation": { label: "Finance", type: "positive" },
};

const coachingTypeStyles = {
  positive: "bg-slate-100 text-slate-700",
  negative: "bg-red-50 text-red-700",
  neutral: "bg-slate-100 text-slate-600",
};

const coachingPointColors = [
  "bg-green-500",
  "bg-blue-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
];

export function CallsTable({
  calls,
  currentPage,
  totalPages,
  totalCalls,
  onPageChange,
  onCallClick,
}: CallsTableProps) {
  return (
    <div className="glass-card overflow-hidden rounded-2xl">
      
      <div className="flex items-center justify-between border-b border-slate-200/40 px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-foreground">
            Sales Calls
          </span>
          <Badge
            variant="secondary"
            className="rounded-lg bg-slate-100/80 text-xs font-medium"
          >
            {totalCalls.toLocaleString()} calls
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="rounded-lg hover:bg-white/60"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <span className="rounded-lg bg-white/50 px-3 py-1 text-sm font-medium text-muted-foreground">
            {currentPage} / {totalPages}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="rounded-lg hover:bg-white/60"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200/40 bg-white/30">
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Date & Time
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Agent
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Customer
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Category
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Direction
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Coaching
              </th>
              <th className="px-5 py-3 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Reviewed
              </th>
              <th className="px-5 py-3 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Logged
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Audio
              </th>
              <th className="px-5 py-3 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
                View
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/30">
            {calls.map((call) => (
              <tr
                key={call.id}
                className="transition-colors hover:bg-white/40"
              >
                <td className="px-5 py-4">
                  <div className="flex flex-col">
                    <span className="text-xs font-normal text-slate-900">
                      {call.relativeTime}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {call.dateTime}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="text-sm font-medium text-foreground">
                    {call.agent}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">
                      {call.customer.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {call.customer.phone}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium",
                      categoryStyles[call.category]?.bg || "bg-slate-100",
                      categoryStyles[call.category]?.text || "text-slate-700"
                    )}
                  >
                    {call.categoryIcon === "no-answer" && (
                      <PhoneMissed className="h-3 w-3" />
                    )}
                    {call.category}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1.5">
                    {call.direction === "outbound" ? (
                      <PhoneOutgoing className="h-3.5 w-3.5 text-muted-foreground" />
                    ) : (
                      <PhoneIncoming className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                    <span className="text-xs font-medium capitalize text-muted-foreground">
                      {call.direction}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap items-center gap-1">
                    {call.coachingPoints.length > 0 ? (
                      call.coachingPoints.slice(0, 3).map((point) => {
                        const config = coachingPointLabels[point] || { label: point.split("-").pop() || point, type: "neutral" as const };
                        return (
                          <span
                            key={`${call.id}-${point}`}
                            className={cn(
                              "rounded px-1.5 py-0.5 text-[10px] font-medium cursor-default",
                              coachingTypeStyles[config.type]
                            )}
                            title={point.replace(/-/g, " ")}
                          >
                            {config.label}
                          </span>
                        );
                      })
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                    {call.coachingPoints.length > 3 && (
                      <span className="text-[10px] text-muted-foreground">+{call.coachingPoints.length - 3}</span>
                    )}
                  </div>
                </td>
                <td className="px-5 py-4 text-center">
                  {call.reviewed === true && (
                    <div className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-slate-100">
                      <Check className="h-3.5 w-3.5 text-slate-700" />
                    </div>
                  )}
                  {call.reviewed === false && (
                    <div className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-slate-100">
                      <X className="h-3.5 w-3.5 text-slate-400" />
                    </div>
                  )}
                  {call.reviewed === null && (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
                </td>
                <td className="px-5 py-4 text-center">
                  {call.enquiryLogged === "yes" && (
                    <span className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-normal text-slate-700">
                      Yes
                    </span>
                  )}
                  {call.enquiryLogged === "no" && (
                    <span className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-normal text-slate-500">
                      No
                    </span>
                  )}
                  {call.enquiryLogged === "n/a" && (
                    <span className="text-xs text-muted-foreground">N/A</span>
                  )}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-lg bg-white/50 shadow-sm hover:bg-white/80"
                    >
                      <Play className="h-3.5 w-3.5" />
                    </Button>
                    <div className="flex flex-col gap-1">
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-200/60">
                        <div
                          className="h-full rounded-full bg-amber-400 transition-all"
                          style={{ width: `${call.audioProgress}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-medium text-muted-foreground">
                        {call.audioDuration}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-lg hover:bg-slate-100"
                    onClick={() => onCallClick(call.id)}
                  >
                    <ExternalLink className="h-3.5 w-3.5 text-slate-600" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
