"use client";

import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Clock, ListTodo } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActionItem {
  id: string;
  title: string;
  status: "pending" | "in-progress" | "completed";
  assignee: string;
}

interface ActionItemsProps {
  items: ActionItem[];
}

const statusConfig = {
  pending: {
    icon: Circle,
    label: "Pending",
    classes: "bg-slate-100/80 text-slate-600",
    iconClass: "text-slate-400",
  },
  "in-progress": {
    icon: Clock,
    label: "In Progress",
    classes: "bg-amber-100/80 text-amber-700",
    iconClass: "text-amber-500",
  },
  completed: {
    icon: CheckCircle2,
    label: "Completed",
    classes: "bg-slate-100 text-slate-700",
    iconClass: "text-slate-600",
  },
};

export function ActionItems({ items }: ActionItemsProps) {
  return (
    <div className="glass-card rounded-2xl p-5 h-full">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100/80">
          <ListTodo className="h-4 w-4 text-slate-600" />
        </div>
        <h3 className="text-sm font-semibold text-foreground">Action Items</h3>
        <Badge
          variant="secondary"
          className="ml-auto rounded-lg bg-white/60 text-xs"
        >
          {items.length} items
        </Badge>
      </div>

      <div className="space-y-3">
        {items.map((item) => {
          const config = statusConfig[item.status];
          const StatusIcon = config.icon;
          return (
            <div
              key={item.id}
              className="rounded-xl border border-white/40 bg-white/40 p-4 backdrop-blur-sm transition-all hover:bg-white/60"
            >
              <div className="mb-2 flex items-start gap-3">
                <StatusIcon className={cn("h-5 w-5 mt-0.5", config.iconClass)} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Assigned to {item.assignee}
                  </p>
                </div>
              </div>
              <div className="ml-8">
                <Badge className={cn("rounded-lg text-xs font-medium", config.classes)}>
                  {config.label}
                </Badge>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
