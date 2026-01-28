"use client";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Calendar, ChevronLeft, ChevronRight, Search, X} from "lucide-react";
import {cn} from "@/lib/utils";

interface FilterBarProps {
	dateRange: {start: string; end: string};
	direction: "all" | "inbound" | "outbound";
	reviewStatus: "all" | "reviewed" | "not-reviewed";
	onDirectionChange: (value: "all" | "inbound" | "outbound") => void;
	onReviewStatusChange: (value: "all" | "reviewed" | "not-reviewed") => void;
	onResetFilters: () => void;
}

export function FilterBar({dateRange, direction, reviewStatus, onDirectionChange, onReviewStatusChange, onResetFilters}: FilterBarProps) {
	return (
		<div className="glass-card rounded-2xl p-5">
			<div className="flex flex-col gap-4">
				<div className="flex flex-wrap items-center gap-3">
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100/80">
							<Calendar className="h-4 w-4 text-slate-600" />
						</div>
						<span className="font-medium text-foreground">Date Range</span>
					</div>
					<div className="flex items-center gap-2">
						<div className="glass-input flex items-center rounded-xl px-3 py-2 text-sm font-medium">{dateRange.start}</div>
						<span className="text-muted-foreground">to</span>
						<div className="glass-input flex items-center rounded-xl px-3 py-2 text-sm font-medium">{dateRange.end}</div>
						<div className="flex items-center gap-1">
							<Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-white/60">
								<ChevronLeft className="h-4 w-4" />
							</Button>
							<Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-white/60">
								<ChevronRight className="h-4 w-4" />
							</Button>
						</div>
					</div>
					<div className="ml-auto flex items-center gap-2">
						<Button variant="outline" size="sm" className="rounded-xl border-slate-200/60 bg-white/50 hover:bg-white/80">
							Reset to Today
						</Button>
						<Button variant="ghost" size="sm" onClick={onResetFilters} className="rounded-xl text-muted-foreground hover:bg-white/60">
							<X className="mr-1 h-3 w-3" />
							Reset All
						</Button>
					</div>
				</div>

				<div className="flex flex-wrap items-center gap-3">
					<Select defaultValue="all">
						<SelectTrigger className="w-[160px] rounded-xl border-slate-200/60 bg-white/50 backdrop-blur-sm">
							<SelectValue placeholder="Select team..." />
						</SelectTrigger>
						<SelectContent className="glass-card">
							<SelectItem value="all">All Teams</SelectItem>
							<SelectItem value="sales">Sales</SelectItem>
							<SelectItem value="support">Support</SelectItem>
						</SelectContent>
					</Select>

					<Select defaultValue="all">
						<SelectTrigger className="w-[160px] rounded-xl border-slate-200/60 bg-white/50 backdrop-blur-sm">
							<SelectValue placeholder="Select agents..." />
						</SelectTrigger>
						<SelectContent className="glass-card">
							<SelectItem value="all">All Agents</SelectItem>
							<SelectItem value="henry">Henry Russell</SelectItem>
							<SelectItem value="sarah">Sarah Johnson</SelectItem>
						</SelectContent>
					</Select>

					<div className="relative">
						<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
						<Input placeholder="Search customer..." className="w-[200px] rounded-xl border-slate-200/60 bg-white/50 pl-9 backdrop-blur-sm" />
					</div>

					<div className="mx-2 h-6 w-px bg-slate-200/60" />

					<div className="glass-input flex items-center gap-0.5 rounded-xl p-1">
						{(["all", "inbound", "outbound"] as const).map(value => (
							<button
								key={value}
								type="button"
								onClick={() => onDirectionChange(value)}
								className={cn(
									"rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-all",
									direction === value ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
								)}
							>
								{value}
							</button>
						))}
					</div>

					<div className="glass-input flex items-center gap-0.5 rounded-xl p-1">
						{(["all", "reviewed", "not-reviewed"] as const).map(value => (
							<button
								key={value}
								type="button"
								onClick={() => onReviewStatusChange(value)}
								className={cn(
									"rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
									reviewStatus === value ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
								)}
							>
								{value === "not-reviewed" ? "Not Reviewed" : value.charAt(0).toUpperCase() + value.slice(1)}
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
