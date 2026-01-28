"use client";

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface InfoItem {
  icon: LucideIcon;
  label: string;
  value: string;
}

interface InfoSectionProps {
  title: string;
  action?: ReactNode;
  items: InfoItem[];
}

export function InfoSection({ title, action, items }: InfoSectionProps) {
  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        {action}
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100/80">
              <item.icon className="h-4 w-4 text-slate-600" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs text-muted-foreground">{item.label}</span>
              <p className="text-sm font-medium text-foreground truncate">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
