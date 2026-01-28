"use client";

import {Badge} from "@/components/ui/badge";
import {Car, Sparkles} from "lucide-react";

interface VehicleInterestCardProps {
	make: string;
	model: string;
	year: string;
	colour: string;
	features: string[];
	additionalInfo?: string;
}

export function VehicleInterestCard({make, model, year, colour, features, additionalInfo}: VehicleInterestCardProps) {
	return (
		<div className="glass-premium relative overflow-hidden rounded-2xl">
			<div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-blue-400/20 to-cyan-400/20 blur-3xl" />
			<div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-gradient-to-br from-purple-400/10 to-pink-400/10 blur-2xl" />

			<div className="absolute right-4 top-4">
				<Badge className="rounded-lg border-blue-200/50 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-700 backdrop-blur-sm gap-1.5">
					<Sparkles className="h-3 w-3" />
					Vehicle of Interest
				</Badge>
			</div>

			<div className="relative p-6">
				<div className="mb-5 flex items-start gap-4">
					<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/20">
						<Car className="h-6 w-6 text-white" />
					</div>
					<div>
						<h3 className="text-xl font-semibold tracking-tight text-foreground">
							{make} {model}
						</h3>
						<p className="text-sm text-muted-foreground">Customer is interested in</p>
					</div>
				</div>

				<div className="mb-5 grid grid-cols-2 gap-3">
					<div className="rounded-xl bg-white/60 px-4 py-3 backdrop-blur-sm">
						<span className="text-xs font-medium text-muted-foreground">Make</span>
						<p className="text-sm font-semibold text-foreground">{make}</p>
					</div>
					<div className="rounded-xl bg-white/60 px-4 py-3 backdrop-blur-sm">
						<span className="text-xs font-medium text-muted-foreground">Model</span>
						<p className="text-sm font-semibold text-foreground">{model}</p>
					</div>
					<div className="rounded-xl bg-white/60 px-4 py-3 backdrop-blur-sm">
						<span className="text-xs font-medium text-muted-foreground">Year</span>
						<p className="text-sm font-semibold text-foreground">{year}</p>
					</div>
					<div className="rounded-xl bg-white/60 px-4 py-3 backdrop-blur-sm">
						<span className="text-xs font-medium text-muted-foreground">Colour</span>
						<p className="text-sm font-semibold capitalize text-foreground">{colour}</p>
					</div>
				</div>

				{features.length > 0 && (
					<div className="mb-5">
						<span className="mb-2.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Requested Features</span>
						<div className="flex flex-wrap gap-2">
							{features.map(feature => (
								<Badge
									key={feature}
									variant="secondary"
									className="rounded-lg border-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 px-3 py-1.5 text-xs font-medium text-blue-700"
								>
									{feature}
								</Badge>
							))}
						</div>
					</div>
				)}

				{additionalInfo && (
					<div className="rounded-xl border border-white/40 bg-white/40 p-4 backdrop-blur-sm">
						<span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Additional Notes</span>
						<p className="text-sm leading-relaxed text-foreground">{additionalInfo}</p>
					</div>
				)}
			</div>
		</div>
	);
}
