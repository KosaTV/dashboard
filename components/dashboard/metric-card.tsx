"use client";

import {cn} from "@/lib/utils";
import type {LucideIcon} from "lucide-react";

interface MetricCardProps {
	title: string;
	value: string | number;
	subtitle?: string;
	icon: LucideIcon;
	isActive?: boolean;
	onClick?: () => void;
	variant?: "default" | "warning" | "success" | "accent";
}

export function MetricCard({title, value, subtitle, icon: Icon, isActive = false, onClick, variant = "default"}: MetricCardProps) {
	const iconStyles = {
		default: "bg-slate-100 text-slate-700",
		warning: "bg-amber-50 text-amber-700",
		success: "bg-slate-100 text-slate-700",
		accent: "bg-amber-50 text-amber-700"
	};

	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				"group relative flex flex-col items-start gap-2 rounded-2xl p-5 text-left transition-all duration-200 w-full",
				"hover:shadow-md hover:-translate-y-0.5",
				isActive && "ring-1 ring-slate-900/10 bg-white"
			)}
		>
			<div className={cn("flex h-9 w-9 items-center justify-center rounded-xl transition-transform group-hover:scale-105", iconStyles[variant])}>
				<Icon className="h-4 w-4" />
			</div>

			<div className="space-y-0.5">
				<span className="text-xs font-medium text-muted-foreground">{title}</span>
				<p className="text-2xl font-semibold tracking-tight text-foreground">{typeof value === "number" ? value.toLocaleString() : value}</p>
				{subtitle && <span className="text-xs text-muted-foreground">{subtitle}</span>}
			</div>

			{isActive && <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-amber-400 shadow-sm" />}
		</button>
	);
}
