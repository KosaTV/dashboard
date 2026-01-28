"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Textarea} from "@/components/ui/textarea";
import {ArrowLeft, Calendar, Clock, Phone, PhoneOutgoing, User, Mail, Car, CheckCircle2, Circle, Play, Pause, Volume2, ExternalLink} from "lucide-react";

export default function CallDetailPage() {
	const router = useRouter();
	const [isPlaying, setIsPlaying] = useState(false);
	const [reviewNotes, setReviewNotes] = useState("");

	return (
		<div className="min-h-screen bg-background">
			<header className="sticky top-0 z-50 border-b bg-white px-6 py-3">
				<div className="mx-auto flex max-w-[1600px] items-center justify-between">
					<div className="flex items-center gap-4">
						<Button variant="ghost" size="icon" onClick={() => router.push("/")} className="h-8 w-8">
							<ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
						</Button>
						<div>
							<h1 className="text-sm font-semibold text-slate-900">Call Details</h1>
							<p className="text-xs text-slate-500">Wed 21 Jan 2026 12:30</p>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<Badge variant="secondary" className="bg-slate-100 text-slate-700">
							<PhoneOutgoing className="mr-1 h-3 w-3" strokeWidth={1.5} />
							Outbound
						</Badge>
						<Badge variant="secondary" className="bg-blue-50 text-blue-700">
							Connected
						</Badge>
						<Badge variant="secondary" className="bg-slate-100 text-slate-700">
							Sales
						</Badge>
						<Button variant="outline" size="sm" className="gap-1.5 border-slate-200 text-xs bg-transparent">
							<ExternalLink className="h-3 w-3" strokeWidth={1.5} />
							Open in New Tab
						</Button>
					</div>
				</div>
			</header>

			<main className="p-8">
				<div className="mx-auto max-w-[1600px] space-y-8">
					<div className="grid grid-cols-3 gap-6">
						<div className="rounded-lg border border-slate-200 bg-white p-8">
							<h2 className="mb-6 text-sm font-semibold text-slate-900">Customer Details</h2>
							<div className="space-y-4">
								<div className="flex items-start gap-3">
									<User className="mt-0.5 h-4 w-4 text-slate-400" strokeWidth={1.5} />
									<div className="flex-1">
										<div className="text-xs text-slate-500">Customer</div>
										<div className="mt-1 text-sm font-medium text-slate-900">Miss Lisa Cooper</div>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<Car className="mt-0.5 h-4 w-4 text-slate-400" strokeWidth={1.5} />
									<div className="flex-1">
										<div className="text-xs text-slate-500">Vehicle</div>
										<div className="mt-1 text-sm font-medium text-slate-900">Unknown</div>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<Phone className="mt-0.5 h-4 w-4 text-slate-400" strokeWidth={1.5} />
									<div className="flex-1">
										<div className="text-xs text-slate-500">Number</div>
										<div className="mt-1 text-sm font-medium text-slate-900">0117 496 0164</div>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<Mail className="mt-0.5 h-4 w-4 text-slate-400" strokeWidth={1.5} />
									<div className="flex-1">
										<div className="text-xs text-slate-500">Email</div>
										<div className="mt-1 text-sm font-medium text-slate-900">lisa.cooper1@example.com</div>
									</div>
								</div>
							</div>
						</div>

						<div className="rounded-lg border border-slate-200 bg-white p-8">
							<h2 className="mb-6 text-sm font-semibold text-slate-900">Call Details</h2>
							<div className="space-y-4">
								<div className="flex items-start gap-3">
									<PhoneOutgoing className="mt-0.5 h-4 w-4 text-slate-400" strokeWidth={1.5} />
									<div className="flex-1">
										<div className="text-xs text-slate-500">Direction</div>
										<div className="mt-1 text-sm font-medium text-slate-900">Outbound</div>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<Clock className="mt-0.5 h-4 w-4 text-slate-400" strokeWidth={1.5} />
									<div className="flex-1">
										<div className="text-xs text-slate-500">Duration</div>
										<div className="mt-1 text-sm font-medium text-slate-900">3 minutes</div>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<User className="mt-0.5 h-4 w-4 text-slate-400" strokeWidth={1.5} />
									<div className="flex-1">
										<div className="text-xs text-slate-500">Initial Agent</div>
										<div className="mt-1 text-sm font-medium text-slate-900">Henry Russell</div>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<User className="mt-0.5 h-4 w-4 text-slate-400" strokeWidth={1.5} />
									<div className="flex-1">
										<div className="text-xs text-slate-500">Final Agent</div>
										<div className="mt-1 text-sm font-medium text-slate-900">Henry Russell</div>
									</div>
								</div>
							</div>
						</div>

						<div className="rounded-lg border border-slate-200 bg-white p-8">
							<h2 className="mb-6 text-sm font-semibold text-slate-900">Call Recording</h2>
							<div className="space-y-4">
								<div className="flex items-center gap-3">
									<Button variant="outline" size="icon" className="h-10 w-10 shrink-0 border-slate-200 bg-transparent" onClick={() => setIsPlaying(!isPlaying)}>
										{isPlaying ? <Pause className="h-4 w-4" strokeWidth={1.5} /> : <Play className="h-4 w-4" strokeWidth={1.5} />}
									</Button>
									<div className="flex-1">
										<div className="h-1.5 w-full rounded-full bg-slate-100">
											<div className="h-1.5 w-1/3 rounded-full bg-slate-900" />
										</div>
									</div>
									<Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
										<Volume2 className="h-4 w-4" strokeWidth={1.5} />
									</Button>
								</div>
								<div className="flex justify-between text-xs text-slate-500">
									<span>00:00</span>
									<span>03:30</span>
								</div>
							</div>
						</div>
					</div>

					<div className="rounded-lg border border-blue-200 bg-blue-50/30 p-10">
						<div className="flex items-start justify-between">
							<div className="flex-1">
								<Badge className="mb-4 bg-blue-600 text-white">Vehicle of Interest</Badge>
								<h2 className="mb-3 text-4xl font-bold text-slate-900">BMW X5</h2>
								<div className="mb-8 flex items-center gap-8 text-sm text-slate-600">
									<div>
										<span className="text-xs text-slate-500">Year:</span> <span className="font-semibold text-slate-900">2024</span>
									</div>
									<div>
										<span className="text-xs text-slate-500">Model:</span> <span className="font-semibold text-slate-900">X5</span>
									</div>
									<div>
										<span className="text-xs text-slate-500">Colour:</span> <span className="font-semibold text-slate-900">Black</span>
									</div>
								</div>
								<div className="mb-6">
									<div className="mb-2 text-xs font-medium text-slate-500">Features:</div>
									<div className="flex flex-wrap gap-2">
										<Badge variant="outline" className="border-slate-300 bg-white text-xs text-slate-700">
											panoramic opening roof
										</Badge>
										<Badge variant="outline" className="border-slate-300 bg-white text-xs text-slate-700">
											head-up display
										</Badge>
										<Badge variant="outline" className="border-slate-300 bg-white text-xs text-slate-700">
											nicer wheels
										</Badge>
									</div>
								</div>
								<div className="rounded-lg border border-slate-200 bg-white p-5">
									<div className="text-xs font-medium text-slate-500">Additional Information</div>
									<p className="mt-2 text-sm leading-relaxed text-slate-700">
										Customer is comparing two similar X5s, one is a year older but has more features; interested in a newer plate, has owned several X5s before, not interested
										in shopping around extensively.
									</p>
								</div>
							</div>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-6">
						<div className="rounded-lg border border-slate-200 bg-white p-10">
							<h2 className="mb-4 text-base font-semibold text-slate-900">Call Summary</h2>
							<p className="text-sm leading-relaxed text-slate-700">
								Customer comparing two BMW X5s (one at Williams, one in Glasgow), provided reg for comparison, wants a one-time best offer; rep to consult manager and call
								back.
							</p>
						</div>

						<div className="rounded-lg border border-slate-200 bg-white p-10">
							<h2 className="mb-4 text-base font-semibold text-slate-900">Action Items</h2>
							<div className="space-y-4">
								<div className="flex items-start gap-3">
									<CheckCircle2 className="mt-0.5 h-4 w-4 text-blue-600" strokeWidth={2} />
									<div className="flex-1">
										<div className="text-sm font-medium text-slate-900">Consult with manager</div>
										<div className="text-xs text-slate-500">Priority: High</div>
									</div>
									<Badge className="bg-blue-50 text-blue-700">Completed</Badge>
								</div>
								<div className="flex items-start gap-3">
									<Circle className="mt-0.5 h-4 w-4 text-amber-500" strokeWidth={2} fill="currentColor" />
									<div className="flex-1">
										<div className="text-sm font-medium text-slate-900">Prepare best offer</div>
										<div className="text-xs text-slate-500">Priority: High</div>
									</div>
									<Badge className="bg-amber-50 text-amber-700">In Progress</Badge>
								</div>
								<div className="flex items-start gap-3">
									<Circle className="mt-0.5 h-4 w-4 text-slate-300" strokeWidth={2} />
									<div className="flex-1">
										<div className="text-sm font-medium text-slate-900">Schedule callback</div>
										<div className="text-xs text-slate-500">Priority: Medium</div>
									</div>
									<Badge className="bg-slate-50 text-slate-600">Pending</Badge>
								</div>
							</div>
						</div>
					</div>

					<div className="rounded-lg border border-slate-200 bg-white p-10">
						<h2 className="mb-6 text-base font-semibold text-slate-900">Call Review</h2>
						<div className="space-y-4">
							<div>
								<label className="mb-2 block text-xs font-medium text-slate-500">
									Review Notes <span className="text-red-600">*</span>
								</label>
								<Textarea
									placeholder="Please enter your review comments (required)..."
									value={reviewNotes}
									onChange={e => setReviewNotes(e.target.value)}
									className="min-h-[120px] resize-none border-slate-200 bg-white text-sm"
								/>
							</div>
							<div className="flex items-center justify-between">
								<p className="text-xs text-slate-500">Review notes are required before submission</p>
								<Button className="bg-slate-900 text-white hover:bg-slate-800">Submit Review</Button>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
