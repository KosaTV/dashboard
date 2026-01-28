"use client";

import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Slider} from "@/components/ui/slider";
import {Play, Pause, SkipBack, SkipForward, Volume2, Download, Headphones} from "lucide-react";

interface AudioPlayerProps {
	duration: string;
}

export function AudioPlayer({duration}: AudioPlayerProps) {
	const [isPlaying, setIsPlaying] = useState(false);
	const [progress, setProgress] = useState(0);
	const [volume, setVolume] = useState(80);

	return (
		<div className="glass-premium rounded-2xl p-8">
			<div className="mb-8 flex items-center justify-center gap-3">
				<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/20">
					<Headphones className="h-6 w-6 text-white" />
				</div>
				<div className="text-center">
					<h3 className="text-lg font-semibold text-foreground">Call Recording</h3>
					<p className="text-sm text-muted-foreground">Duration: {duration}</p>
				</div>
			</div>

			<div className="mb-6 flex h-20 items-center justify-center gap-0.5 rounded-xl bg-white/50 px-4 backdrop-blur-sm">
				{Array.from({length: 60}).map((_, i) => (
					<div
						key={i}
						className="w-1 rounded-full bg-gradient-to-t from-blue-400 to-blue-500 transition-all"
						style={{
							height: `${Math.random() * 60 + 20}%`,
							opacity: i / 60 <= progress / 100 ? 1 : 0.3
						}}
					/>
				))}
			</div>

			<div className="mb-6">
				<Slider value={[progress]} onValueChange={value => setProgress(value[0])} max={100} step={1} className="mb-2" />
				<div className="flex justify-between text-xs font-medium text-muted-foreground">
					<span>
						{Math.floor((progress / 100) * 200)
							.toString()
							.padStart(2, "0")}
						:
						{Math.floor(((progress / 100) * 200 * 60) % 60)
							.toString()
							.padStart(2, "0")}
					</span>
					<span>{duration}</span>
				</div>
			</div>

			<div className="mb-6 flex items-center justify-center gap-3">
				<Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-white/60">
					<SkipBack className="h-5 w-5" />
				</Button>
				<Button
					size="icon"
					className="h-14 w-14 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30 hover:from-blue-600 hover:to-blue-700"
					onClick={() => setIsPlaying(!isPlaying)}
				>
					{isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
				</Button>
				<Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-white/60">
					<SkipForward className="h-5 w-5" />
				</Button>
			</div>

			<div className="flex items-center justify-between rounded-xl bg-white/40 p-3 backdrop-blur-sm">
				<div className="flex items-center gap-3">
					<Volume2 className="h-4 w-4 text-muted-foreground" />
					<Slider value={[volume]} onValueChange={value => setVolume(value[0])} max={100} step={1} className="w-24" />
					<span className="text-xs font-medium text-muted-foreground w-8">{volume}%</span>
				</div>
				<Button variant="ghost" size="sm" className="rounded-lg text-muted-foreground hover:bg-white/60 hover:text-foreground">
					<Download className="mr-1.5 h-4 w-4" />
					Download
				</Button>
			</div>
		</div>
	);
}
