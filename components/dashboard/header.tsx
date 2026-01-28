"use client";

import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Phone, Settings, Bell, ChevronDown, LogOut, User} from "lucide-react";

export function Header() {
	return (
		<header className="sticky top-0 z-50 glass-header">
			<div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-6">
				<div className="flex items-center gap-3">
					<div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 shadow-sm">
						<Phone className="h-4 w-4 text-white" />
					</div>
					<span className="text-lg font-semibold tracking-tight text-foreground">CallInsight</span>
				</div>

				<nav className="hidden items-center gap-1 md:flex">
					<Button variant="ghost" size="sm" className="rounded-lg bg-white/50 font-medium text-foreground shadow-sm">
						Dashboard
					</Button>
					<Button variant="ghost" size="sm" className="rounded-lg text-muted-foreground hover:bg-white/30">
						Analytics
					</Button>
					<Button variant="ghost" size="sm" className="rounded-lg text-muted-foreground hover:bg-white/30">
						Agents
					</Button>
					<Button variant="ghost" size="sm" className="rounded-lg text-muted-foreground hover:bg-white/30">
						Settings
					</Button>
				</nav>

				<div className="flex items-center gap-2">
					<Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-lg hover:bg-white/40">
						<Bell className="h-4 w-4 text-muted-foreground" />
						<span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[10px] font-medium text-white shadow-sm">
							3
						</span>
					</Button>
					<Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:bg-white/40">
						<Settings className="h-4 w-4 text-muted-foreground" />
					</Button>
					<div className="mx-2 h-6 w-px bg-slate-200/60" />
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="flex items-center gap-2 rounded-lg px-2 hover:bg-white/40">
								<Avatar className="h-8 w-8 border border-white/50 shadow-sm">
									<AvatarImage src="/avatar.png" />
									<AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-xs text-white">HR</AvatarFallback>
								</Avatar>
								<span className="hidden text-sm font-medium lg:inline">Henry Russell</span>
								<ChevronDown className="h-3 w-3 text-muted-foreground" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="glass-card w-48">
							<DropdownMenuItem>
								<User className="mr-2 h-4 w-4" />
								Profile
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Settings className="mr-2 h-4 w-4" />
								Settings
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem className="text-destructive">
								<LogOut className="mr-2 h-4 w-4" />
								Log out
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	);
}
