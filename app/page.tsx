"use client";

import {useState, useMemo} from "react";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {
	Phone,
	TrendingUp,
	TrendingDown,
	Users,
	Clock,
	PhoneIncoming,
	PhoneOutgoing,
	CheckCircle2,
	XCircle,
	Filter,
	Calendar,
	RefreshCw,
	Settings,
	ChevronLeft,
	ChevronRight,
	Search,
	Play,
	ArrowUpRight,
	ArrowDownRight,
	Car,
	Wrench,
	CreditCard,
	Accessibility,
	Building2,
	PhoneCall,
	AlertCircle,
	HelpCircle
} from "lucide-react";
import {Badge} from "@/components/ui/badge";

const agents = [
	{id: 1, name: "Henry Russell", status: "available", aht: "03:24"},
	{id: 2, name: "Sarah Mitchell", status: "available", aht: "02:58"},
	{id: 3, name: "James Carter", status: "on-call", aht: "04:12"},
	{id: 4, name: "Emily Davis", status: "available", aht: "03:06"}
];

const allCalls = [
	{
		id: 1,
		date: "6 days ago",
		dateTime: "Wed 21 Jan 2026 12:30",
		agent: "Henry Russell",
		customer: {name: "Miss Lisa Cooper", phone: "0117 496 0164"},
		category: "Retail Enquiry",
		direction: "outbound" as const,
		coaching: ["good-opener", "needs-improvement", "excellent-close"],
		reviewed: true,
		enquiryLogged: true,
		duration: "00:00 / 03:30"
	},
	{
		id: 2,
		date: "6 days ago",
		dateTime: "Wed 21 Jan 2026 12:30",
		agent: "Henry Russell",
		customer: {name: "Jacob Jones", phone: "0118 496 0148"},
		category: "No Answer",
		direction: "outbound" as const,
		coaching: [],
		reviewed: false,
		enquiryLogged: false,
		duration: "00:00 / 00:17"
	},
	{
		id: 3,
		date: "6 days ago",
		dateTime: "Wed 21 Jan 2026 12:30",
		agent: "Henry Russell",
		customer: {name: "Ms Emily Scott", phone: "0118 496 0148"},
		category: "No Answer",
		direction: "outbound" as const,
		coaching: [],
		reviewed: false,
		enquiryLogged: false,
		duration: "00:00 / 00:16"
	}
];

export default function DashboardPage() {
	const router = useRouter();
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [directionFilter, setDirectionFilter] = useState<"all" | "inbound" | "outbound">("all");
	const [showFilters, setShowFilters] = useState(false);
	const [reviewFilter, setReviewFilter] = useState<"all" | "reviewed" | "not-reviewed">("all");
	const [selectedTeam, setSelectedTeam] = useState<string>("all");
	const [selectedAgent, setSelectedAgent] = useState<string>("all");
	const [customerSearch, setCustomerSearch] = useState("");

	console.log("[v0] showFilters state:", showFilters);

	const filteredCalls = useMemo(() => {
		return allCalls.filter(call => {
			if (directionFilter !== "all" && call.direction !== directionFilter) return false;
			if (selectedCategory && call.category !== selectedCategory) return false;
			if (reviewFilter === "reviewed" && !call.reviewed) return false;
			if (reviewFilter === "not-reviewed" && call.reviewed) return false;
			if (selectedAgent !== "all" && call.agent !== selectedAgent) return false;
			if (customerSearch && !call.customer.name.toLowerCase().includes(customerSearch.toLowerCase()) && !call.customer.phone.includes(customerSearch)) return false;
			return true;
		});
	}, [directionFilter, selectedCategory, reviewFilter, selectedAgent, customerSearch]);

	const metrics = {
		totalCalls: 4137,
		allEnquiries: 1558,
		enquiryLogged: 1187,
		enquiryNotLogged: 371,
		retail: 1283,
		parts: 137,
		finance: 106,
		motability: 30,
		business: 2,
		callbacks: 441,
		complaints: 19,
		vehicleSale: 22,
		other: 2097
	};

	const categoryIcons = {
		"Retail Enquiry": Car,
		"Parts Exchange": Wrench,
		"Finance/Payment": CreditCard,
		Motability: Accessibility,
		Business: Building2,
		"Callback Request": PhoneCall,
		Complaints: AlertCircle,
		"Vehicle Sale": Car,
		Other: HelpCircle,
		"No Answer": XCircle
	};

	return (
		<div className="min-h-screen bg-background">
			<header className="sticky top-0 z-50 border-b bg-white px-6 py-3">
				<div className="mx-auto flex max-w-[1800px] items-center justify-between">
					<div className="flex items-center gap-6">
						<h1 className="text-base font-light text-slate-900">CallInsight</h1>
						<span className="text-sm text-slate-600">Sales Call Dashboard</span>
					</div>
					<div className="flex items-center gap-2">
						<Button
							variant="outline"
							size="sm"
							className="gap-2 border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
							onClick={() => {
								console.log("[v0] Filter button clicked, current state:", showFilters);
								setShowFilters(!showFilters);
							}}
						>
							<Filter className="h-3.5 w-3.5" strokeWidth={1.5} />
							Filter
						</Button>
						<Button variant="outline" size="sm" className="gap-2 border-slate-200 bg-white text-slate-700 hover:bg-slate-50">
							<Calendar className="h-3.5 w-3.5" strokeWidth={1.5} />
							<span className="text-xs">Jan 27, 2026</span>
						</Button>
						<Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:bg-slate-50 hover:text-slate-700">
							<RefreshCw className="h-3.5 w-3.5" strokeWidth={1.5} />
						</Button>
						<Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:bg-slate-50 hover:text-slate-700">
							<Settings className="h-3.5 w-3.5" strokeWidth={1.5} />
						</Button>
					</div>
				</div>
			</header>

			{showFilters && (
				<div className="border-b bg-white px-6 py-5 shadow-sm">
					<div className="mx-auto max-w-[1800px]">
						<div className="grid grid-cols-12 gap-4">
							<div className="col-span-4">
								<label className="mb-1.5 block text-xs font-light text-slate-400">Date Range</label>
								<div className="flex items-center gap-2">
									<div className="relative flex-1">
										<Calendar className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" strokeWidth={1.5} />
										<Input type="text" defaultValue="Dec 1, 2025 00:00" className="h-9 border-slate-200 bg-white pl-9 text-xs" />
									</div>
									<span className="text-xs text-slate-400">to</span>
									<div className="relative flex-1">
										<Calendar className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" strokeWidth={1.5} />
										<Input type="text" defaultValue="Jan 27, 2026 23:59" className="h-9 border-slate-200 bg-white pl-9 text-xs" />
									</div>
									<Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
										<ChevronLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
									</Button>
									<Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
										<ChevronRight className="h-3.5 w-3.5" strokeWidth={1.5} />
									</Button>
								</div>
							</div>

							<div className="col-span-2">
								<label className="mb-1.5 block text-xs font-light text-slate-400">Team</label>
								<Select value={selectedTeam} onValueChange={setSelectedTeam}>
									<SelectTrigger className="h-9 border-slate-200 bg-white text-xs">
										<SelectValue placeholder="All Teams" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="all">All Teams</SelectItem>
										<SelectItem value="sales">Sales Team</SelectItem>
										<SelectItem value="support">Support Team</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="col-span-2">
								<label className="mb-1.5 block text-xs font-light text-slate-400">Agents</label>
								<Select value={selectedAgent} onValueChange={setSelectedAgent}>
									<SelectTrigger className="h-9 border-slate-200 bg-white text-xs">
										<SelectValue placeholder="All Agents" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="all">All Agents</SelectItem>
										{agents.map(agent => (
											<SelectItem key={agent.id} value={agent.name}>
												{agent.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							<div className="col-span-4">
								<label className="mb-1.5 block text-xs font-light text-slate-400">Customer Search</label>
								<div className="relative">
									<Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" strokeWidth={1.5} />
									<Input
										type="text"
										placeholder="Name or phone number..."
										value={customerSearch}
										onChange={e => setCustomerSearch(e.target.value)}
										className="h-9 border-slate-200 bg-white pl-9 text-xs"
									/>
								</div>
							</div>

							<div className="col-span-3">
								<label className="mb-1.5 block text-xs font-light text-slate-400">Direction</label>
								<div className="flex gap-1">
									{(["all", "inbound", "outbound"] as const).map(dir => (
										<Button
											key={dir}
											variant={directionFilter === dir ? "default" : "outline"}
											size="sm"
											onClick={() => setDirectionFilter(dir)}
											className={
												directionFilter === dir
													? "h-8 flex-1 bg-slate-900 text-xs text-white hover:bg-slate-800"
													: "h-8 flex-1 border-slate-200 bg-white text-xs text-slate-600 hover:bg-slate-50"
											}
										>
											{dir === "all" ? "All" : dir === "inbound" ? "Inbound" : "Outbound"}
										</Button>
									))}
								</div>
							</div>

							<div className="col-span-3">
								<label className="mb-1.5 block text-xs font-light text-slate-400">Review Status</label>
								<div className="flex gap-1">
									{(["all", "reviewed", "not-reviewed"] as const).map(status => (
										<Button
											key={status}
											variant={reviewFilter === status ? "default" : "outline"}
											size="sm"
											onClick={() => setReviewFilter(status)}
											className={
												reviewFilter === status
													? "h-8 flex-1 bg-slate-900 text-xs text-white hover:bg-slate-800"
													: "h-8 flex-1 border-slate-200 bg-white text-xs text-slate-600 hover:bg-slate-50"
											}
										>
											{status === "all" ? "All" : status === "reviewed" ? "Reviewed" : "Not Reviewed"}
										</Button>
									))}
								</div>
							</div>

							<div className="col-span-6 flex items-end justify-end gap-2">
								<Button variant="outline" size="sm" className="h-8 border-slate-200 bg-white text-xs text-slate-600 hover:bg-slate-50">
									Reset to Today
								</Button>
								<Button
									variant="outline"
									size="sm"
									className="h-8 border-slate-200 bg-white text-xs text-slate-600 hover:bg-slate-50"
									onClick={() => {
										setDirectionFilter("all");
										setReviewFilter("all");
										setSelectedTeam("all");
										setSelectedAgent("all");
										setCustomerSearch("");
										setSelectedCategory(null);
									}}
								>
									Reset All Filters
								</Button>
							</div>
						</div>
					</div>
				</div>
			)}

			<main className="p-4 md:p-6">
				<div className="mx-auto max-w-[1800px]">
					<div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4">
						<div className="col-span-1 md:col-span-4 lg:col-span-4 rounded-lg border border-slate-200 bg-white p-4">
							<div className="mb-1 text-xs font-light text-slate-400">Average Handling Time</div>
							<div className="text-2xl font-light text-slate-900">03:17</div>
							<div className="mt-1 flex items-center gap-1 text-xs text-blue-600">
								<ArrowDownRight className="h-3 w-3" strokeWidth={2} />
								<span>-8 seconds</span>
							</div>
						</div>

						<div className="col-span-1 md:col-span-2 lg:col-span-2 rounded-lg border border-slate-200 bg-white p-4">
							<div className="mb-1 text-xs font-light text-slate-400">Answered Calls</div>
							<div className="text-2xl font-light text-slate-900">75</div>
							<div className="mt-1 flex items-center gap-1 text-xs text-red-600">
								<ArrowDownRight className="h-3 w-3" strokeWidth={2} />
								<span>-5</span>
							</div>
						</div>

						<div className="col-span-1 md:col-span-2 lg:col-span-2 rounded-lg border border-slate-200 bg-white p-4">
							<div className="mb-1 text-xs font-light text-slate-400">Abandon Rate</div>
							<div className="text-2xl font-light text-slate-900">6%</div>
							<div className="mt-1 flex items-center gap-1 text-xs text-blue-600">
								<ArrowDownRight className="h-3 w-3" strokeWidth={2} />
								<span>-2%</span>
							</div>
						</div>

						<div className="col-span-1 md:col-span-2 lg:col-span-2 rounded-lg border border-slate-200 bg-white p-4">
							<div className="mb-1 text-xs font-light text-slate-400">Enquiry Logged</div>
							<div className="text-2xl font-light text-slate-900">{metrics.enquiryLogged.toLocaleString()}</div>
							<div className="mt-1 text-xs text-slate-500">76% of enquiries</div>
						</div>

						<div className="col-span-1 md:col-span-2 lg:col-span-2 rounded-lg border border-slate-200 bg-white p-4">
							<div className="mb-1 text-xs font-light text-slate-400">Not Logged</div>
							<div className="text-2xl font-light text-slate-900">{metrics.enquiryNotLogged}</div>
							<div className="mt-1 text-xs text-slate-500">24% of enquiries</div>
						</div>

						<div className="col-span-1 md:col-span-6 lg:col-span-6 rounded-lg border border-slate-200 bg-white p-5">
							<div className="mb-3 text-sm font-semibold text-slate-900">Agent Performance</div>
							<div className="space-y-2">
								<div className="grid grid-cols-12 gap-2 border-b border-slate-100 pb-2 text-xs font-light text-slate-400">
									<div className="col-span-4">Agent</div>
									<div className="col-span-3">Status</div>
									<div className="col-span-2 text-right">Inbound</div>
									<div className="col-span-3 text-right">AHT</div>
								</div>
								{agents.map(agent => (
									<div key={agent.id} className="grid grid-cols-12 items-center gap-2 py-1.5 text-xs">
										<div className="col-span-4 font-normal text-slate-900">{agent.name}</div>
										<div className="col-span-3">
											<Badge variant="secondary" className={agent.status === "available" ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-700"}>
												{agent.status === "available" ? "Available" : "On Call"}
											</Badge>
										</div>
										<div className="col-span-2 text-right text-slate-600">{Math.floor(Math.random() * 10) + 5}</div>
										<div className="col-span-3 text-right">
											<Badge variant="secondary" className={agent.aht < "03:30" ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-700"}>
												{agent.aht}
											</Badge>
										</div>
									</div>
								))}
							</div>
						</div>

						<div className="col-span-1 md:col-span-6 lg:col-span-6 rounded-lg border border-slate-200 bg-white p-5">
							<div className="mb-3 text-sm font-semibold text-slate-900">Call Categories</div>
							<div className="flex items-center gap-6">
								<div className="relative h-32 w-32">
									<svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
										<circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" strokeWidth="12" />
										<circle
											cx="50"
											cy="50"
											r="40"
											fill="none"
											stroke="#2563eb"
											strokeWidth="12"
											strokeDasharray={`${(metrics.retail / metrics.totalCalls) * 251.2} 251.2`}
											strokeDashoffset="0"
										/>
										<circle
											cx="50"
											cy="50"
											r="40"
											fill="none"
											stroke="#64748b"
											strokeWidth="12"
											strokeDasharray={`${(metrics.other / metrics.totalCalls) * 251.2} 251.2`}
											strokeDashoffset={`-${(metrics.retail / metrics.totalCalls) * 251.2}`}
										/>
									</svg>
									<div className="absolute inset-0 flex items-center justify-center">
										<div className="text-center">
											<div className="text-xl font-bold text-slate-900">{metrics.totalCalls.toLocaleString()}</div>
											<div className="text-[10px] text-slate-500">Total</div>
										</div>
									</div>
								</div>

								<div className="flex-1 space-y-2">
									<div className="flex items-center justify-between text-xs">
										<div className="flex items-center gap-2">
											<div className="h-2 w-2 rounded-full bg-blue-600" />
											<span className="text-slate-600">Retail Enquiry</span>
										</div>
										<span className="font-normal text-slate-900">{metrics.retail}</span>
									</div>
									<div className="flex items-center justify-between text-xs">
										<div className="flex items-center gap-2">
											<div className="h-2 w-2 rounded-full bg-slate-400" />
											<span className="text-slate-600">Parts Exchange</span>
										</div>
										<span className="font-normal text-slate-900">{metrics.parts}</span>
									</div>
									<div className="flex items-center justify-between text-xs">
										<div className="flex items-center gap-2">
											<div className="h-2 w-2 rounded-full bg-amber-500" />
											<span className="text-slate-600">Finance/Payment</span>
										</div>
										<span className="font-normal text-slate-900">{metrics.finance}</span>
									</div>
									<div className="flex items-center justify-between text-xs">
										<div className="flex items-center gap-2">
											<div className="h-2 w-2 rounded-full bg-slate-500" />
											<span className="text-slate-600">Other</span>
										</div>
										<span className="font-normal text-slate-900">{metrics.other}</span>
									</div>
								</div>
							</div>
						</div>

						<div className="col-span-1 md:col-span-6 lg:col-span-12 rounded-lg border border-slate-200 bg-white overflow-x-auto">
							<div className="border-b border-slate-200 p-4">
								<div className="flex items-center justify-between">
									<div>
										<h2 className="text-sm font-semibold text-slate-900">Recent Calls ({filteredCalls.length})</h2>
										<p className="text-xs text-slate-500">
											Showing {filteredCalls.length} of {allCalls.length} calls
										</p>
									</div>
									<div className="flex gap-2">
										{(["all", "inbound", "outbound"] as const).map(dir => (
											<Button
												key={dir}
												variant={directionFilter === dir ? "default" : "outline"}
												size="sm"
												onClick={() => setDirectionFilter(dir)}
												className={
													directionFilter === dir ? "h-7 bg-slate-900 text-xs text-white hover:bg-slate-800" : "h-7 border-slate-200 text-xs text-slate-600 hover:bg-slate-50"
												}
											>
												{dir === "all" ? "All" : dir === "inbound" ? "Inbound" : "Outbound"}
											</Button>
										))}
									</div>
								</div>
							</div>
							<div className="overflow-x-auto">
								<table className="w-full">
									<thead className="border-b border-slate-100 bg-slate-50">
										<tr>
											<th className="px-4 py-2.5 text-left text-xs font-light text-slate-400">Date & Time</th>
											<th className="px-4 py-2.5 text-left text-xs font-light text-slate-400">Agent</th>
											<th className="px-4 py-2.5 text-left text-xs font-light text-slate-400">Customer</th>
											<th className="px-4 py-2.5 text-left text-xs font-light text-slate-400">Call Category</th>
											<th className="px-4 py-2.5 text-left text-xs font-light text-slate-400">Direction</th>
											<th className="px-4 py-2.5 text-left text-xs font-light text-slate-400">Coaching Points</th>
											<th className="px-4 py-2.5 text-left text-xs font-light text-slate-400">Reviewed</th>
											<th className="px-4 py-2.5 text-left text-xs font-light text-slate-400">Enquiry Logged</th>
											<th className="px-4 py-2.5 text-left text-xs font-light text-slate-400">Audio</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-slate-100">
										{filteredCalls.map(call => {
											const Icon = categoryIcons[call.category as keyof typeof categoryIcons] || HelpCircle;
											return (
												<tr key={call.id} className="cursor-pointer hover:bg-slate-50" onClick={() => router.push(`/call/${call.id}`)}>
													<td className="px-4 py-3">
														<div className="text-xs text-slate-600">{call.date}</div>
														<div className="text-xs text-slate-500">{call.dateTime}</div>
													</td>
													<td className="px-4 py-3 text-xs font-normal text-slate-900">{call.agent}</td>
													<td className="px-4 py-3">
														<div className="text-xs font-normal text-slate-900">{call.customer.name}</div>
														<div className="text-xs text-slate-500">{call.customer.phone}</div>
													</td>
													<td className="px-4 py-3">
														<div className="flex items-center gap-2">
															<Icon className="h-3.5 w-3.5 text-slate-400" strokeWidth={1.5} />
															<span className="text-xs text-slate-700">{call.category}</span>
														</div>
													</td>
													<td className="px-4 py-3">
														{call.direction === "outbound" ? (
															<Badge variant="secondary" className="bg-slate-100 text-slate-700">
																<PhoneOutgoing className="mr-1 h-3 w-3" strokeWidth={1.5} />
																Outbound
															</Badge>
														) : (
															<Badge variant="secondary" className="bg-slate-100 text-slate-700">
																<PhoneIncoming className="mr-1 h-3 w-3" strokeWidth={1.5} />
																Inbound
															</Badge>
														)}
													</td>
													<td className="px-4 py-3">
														<div className="flex gap-1">
															{call.coaching.map((point, idx) => (
																<div key={idx} className={`h-5 w-5 rounded ${point.includes("good") || point.includes("excellent") ? "bg-blue-100" : "bg-amber-100"}`} />
															))}
															{call.coaching.length === 0 && <span className="text-xs text-slate-400">N/A</span>}
														</div>
													</td>
													<td className="px-4 py-3">
														{call.reviewed ? (
															<CheckCircle2 className="h-4 w-4 text-blue-600" strokeWidth={2} />
														) : (
															<XCircle className="h-4 w-4 text-slate-300" strokeWidth={2} />
														)}
													</td>
													<td className="px-4 py-3">
														{call.enquiryLogged ? <span className="text-xs font-medium text-blue-600">Yes</span> : <span className="text-xs text-slate-400">N/A</span>}
													</td>
													<td className="px-4 py-3">
														<div className="flex items-center gap-2">
															<Button variant="ghost" size="icon" className="h-6 w-6">
																<Play className="h-3 w-3 text-slate-600" strokeWidth={1.5} />
															</Button>
															<span className="text-xs text-slate-500">{call.duration}</span>
														</div>
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
