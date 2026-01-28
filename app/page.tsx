"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  PhoneIncoming,
  PhoneOutgoing,
  CheckCircle2,
  XCircle,
  Filter,
  Calendar as CalendarIcon,
  RefreshCw,
  Settings,
  Search,
  Play,
  ArrowDownRight,
  Car,
  Wrench,
  CreditCard,
  Accessibility,
  Building2,
  PhoneCall,
  AlertCircle,
  HelpCircle,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";

const agents = [
  { id: 1, name: "Henry Russell", status: "available", aht: "03:24" },
  { id: 2, name: "Sarah Mitchell", status: "available", aht: "02:58" },
  { id: 3, name: "James Carter", status: "on-call", aht: "04:12" },
  { id: 4, name: "Emily Davis", status: "available", aht: "03:06" },
];

const allCalls = [
  {
    id: 1,
    date: "6 days ago",
    dateTime: "Wed 21 Jan 2026 12:30",
    agent: "Henry Russell",
    customer: { name: "Miss Lisa Cooper", phone: "0117 496 0164" },
    category: "Retail Enquiry",
    direction: "outbound" as const,
    coaching: ["good-opener", "needs-improvement", "excellent-close"],
    reviewed: true,
    enquiryLogged: true,
    duration: "00:00 / 03:30",
  },
  {
    id: 2,
    date: "6 days ago",
    dateTime: "Wed 21 Jan 2026 12:30",
    agent: "Henry Russell",
    customer: { name: "Jacob Jones", phone: "0118 496 0148" },
    category: "No Answer",
    direction: "outbound" as const,
    coaching: [],
    reviewed: false,
    enquiryLogged: false,
    duration: "00:00 / 00:17",
  },
  {
    id: 3,
    date: "6 days ago",
    dateTime: "Wed 21 Jan 2026 12:30",
    agent: "Henry Russell",
    customer: { name: "Ms Emily Scott", phone: "0118 496 0148" },
    category: "No Answer",
    direction: "outbound" as const,
    coaching: [],
    reviewed: false,
    enquiryLogged: false,
    duration: "00:00 / 00:16",
  },
  {
    id: 4,
    date: "5 days ago",
    dateTime: "Thu 22 Jan 2026 09:15",
    agent: "Sarah Mitchell",
    customer: { name: "Mr David Brown", phone: "0121 555 0199" },
    category: "Retail Enquiry",
    direction: "inbound" as const,
    coaching: ["excellent-greeting", "good-product-knowledge"],
    reviewed: true,
    enquiryLogged: true,
    duration: "00:00 / 05:42",
  },
  {
    id: 5,
    date: "5 days ago",
    dateTime: "Thu 22 Jan 2026 10:30",
    agent: "James Carter",
    customer: { name: "Mrs Jennifer White", phone: "0131 667 8900" },
    category: "Finance/Payment",
    direction: "inbound" as const,
    coaching: ["needs-improvement-pace"],
    reviewed: true,
    enquiryLogged: true,
    duration: "00:00 / 08:15",
  },
  {
    id: 6,
    date: "5 days ago",
    dateTime: "Thu 22 Jan 2026 11:45",
    agent: "Emily Davis",
    customer: { name: "Mr Robert Taylor", phone: "0141 332 4455" },
    category: "Parts Exchange",
    direction: "outbound" as const,
    coaching: ["good-closing"],
    reviewed: false,
    enquiryLogged: true,
    duration: "00:00 / 04:22",
  },
  {
    id: 7,
    date: "4 days ago",
    dateTime: "Fri 23 Jan 2026 14:00",
    agent: "Henry Russell",
    customer: { name: "Ms Amanda Clark", phone: "0151 709 3300" },
    category: "Retail Enquiry",
    direction: "inbound" as const,
    coaching: ["excellent-rapport", "good-needs-analysis"],
    reviewed: true,
    enquiryLogged: true,
    duration: "00:00 / 06:18",
  },
  {
    id: 8,
    date: "4 days ago",
    dateTime: "Fri 23 Jan 2026 15:30",
    agent: "Sarah Mitchell",
    customer: { name: "Mr Thomas Wilson", phone: "0161 236 7788" },
    category: "Callback Request",
    direction: "outbound" as const,
    coaching: [],
    reviewed: false,
    enquiryLogged: false,
    duration: "00:00 / 01:45",
  },
  {
    id: 9,
    date: "3 days ago",
    dateTime: "Sat 24 Jan 2026 10:00",
    agent: "James Carter",
    customer: { name: "Mrs Patricia Moore", phone: "0171 234 5678" },
    category: "Retail Enquiry",
    direction: "inbound" as const,
    coaching: ["good-product-demo", "excellent-objection-handling"],
    reviewed: true,
    enquiryLogged: true,
    duration: "00:00 / 12:30",
  },
  {
    id: 10,
    date: "2 days ago",
    dateTime: "Sun 25 Jan 2026 11:15",
    agent: "Emily Davis",
    customer: { name: "Mr Michael Anderson", phone: "0181 987 6543" },
    category: "No Answer",
    direction: "outbound" as const,
    coaching: [],
    reviewed: false,
    enquiryLogged: false,
    duration: "00:00 / 00:22",
  },
  {
    id: 11,
    date: "1 day ago",
    dateTime: "Mon 26 Jan 2026 09:00",
    agent: "Henry Russell",
    customer: { name: "Ms Rachel Green", phone: "0191 456 7890" },
    category: "Finance/Payment",
    direction: "inbound" as const,
    coaching: ["excellent-finance-explanation"],
    reviewed: true,
    enquiryLogged: true,
    duration: "00:00 / 09:45",
  },
  {
    id: 12,
    date: "Today",
    dateTime: "Tue 27 Jan 2026 08:30",
    agent: "Sarah Mitchell",
    customer: { name: "Mr Christopher Lee", phone: "0113 245 6789" },
    category: "Retail Enquiry",
    direction: "inbound" as const,
    coaching: ["good-opening", "needs-improvement-closing"],
    reviewed: false,
    enquiryLogged: true,
    duration: "00:00 / 07:20",
  },
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
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2025, 11, 1),
    to: new Date(2026, 0, 27),
  });

  const filteredCalls = useMemo(() => {
    return allCalls.filter((call) => {
      if (directionFilter !== "all" && call.direction !== directionFilter) return false;
      if (selectedCategory && call.category !== selectedCategory) return false;
      if (reviewFilter === "reviewed" && !call.reviewed) return false;
      if (reviewFilter === "not-reviewed" && call.reviewed) return false;
      if (selectedAgent !== "all" && call.agent !== selectedAgent) return false;
      if (
        customerSearch &&
        !call.customer.name.toLowerCase().includes(customerSearch.toLowerCase()) &&
        !call.customer.phone.includes(customerSearch)
      )
        return false;
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
    other: 2097,
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
    "No Answer": XCircle,
  };

  const resetFilters = () => {
    setDirectionFilter("all");
    setReviewFilter("all");
    setSelectedTeam("all");
    setSelectedAgent("all");
    setCustomerSearch("");
    setSelectedCategory(null);
    setDateRange({
      from: new Date(2025, 11, 1),
      to: new Date(2026, 0, 27),
    });
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
            
            <Popover open={showFilters} onOpenChange={setShowFilters}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="cursor-pointer gap-2 border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                >
                  <Filter className="h-3.5 w-3.5" strokeWidth={1.5} />
                  Filter
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[420px] p-0" align="end" sideOffset={8}>
                <div className="border-b border-slate-100 px-4 py-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-slate-900">Filters</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetFilters}
                      className="h-7 cursor-pointer text-xs text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                    >
                      Reset all
                    </Button>
                  </div>
                </div>
                <div className="space-y-4 p-4">
                  
                  <div>
                    <label className="mb-1.5 block text-xs font-light text-slate-500">Date Range</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="h-9 w-full cursor-pointer justify-start border-slate-200 bg-white text-left text-xs font-normal"
                        >
                          <CalendarIcon className="mr-2 h-3.5 w-3.5 text-slate-400" strokeWidth={1.5} />
                          {dateRange?.from ? (
                            dateRange.to ? (
                              <>
                                {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                              </>
                            ) : (
                              format(dateRange.from, "LLL dd, y")
                            )
                          ) : (
                            <span className="text-slate-400">Select date range</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="range"
                          defaultMonth={dateRange?.from}
                          selected={dateRange}
                          onSelect={setDateRange}
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1.5 block text-xs font-light text-slate-500">Team</label>
                      <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                        <SelectTrigger className="h-9 cursor-pointer border-slate-200 bg-white text-xs">
                          <SelectValue placeholder="All Teams" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all" className="cursor-pointer">All Teams</SelectItem>
                          <SelectItem value="sales" className="cursor-pointer">Sales Team</SelectItem>
                          <SelectItem value="support" className="cursor-pointer">Support Team</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-light text-slate-500">Agent</label>
                      <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                        <SelectTrigger className="h-9 cursor-pointer border-slate-200 bg-white text-xs">
                          <SelectValue placeholder="All Agents" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all" className="cursor-pointer">All Agents</SelectItem>
                          {agents.map((agent) => (
                            <SelectItem key={agent.id} value={agent.name} className="cursor-pointer">
                              {agent.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  
                  <div>
                    <label className="mb-1.5 block text-xs font-light text-slate-500">Customer Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" strokeWidth={1.5} />
                      <Input
                        type="text"
                        placeholder="Name or phone number..."
                        value={customerSearch}
                        onChange={(e) => setCustomerSearch(e.target.value)}
                        className="h-9 border-slate-200 bg-white pl-9 text-xs"
                      />
                    </div>
                  </div>

                  
                  <div>
                    <label className="mb-1.5 block text-xs font-light text-slate-500">Direction</label>
                    <div className="flex gap-1">
                      {(["all", "inbound", "outbound"] as const).map((dir) => (
                        <Button
                          key={dir}
                          variant={directionFilter === dir ? "default" : "outline"}
                          size="sm"
                          onClick={() => setDirectionFilter(dir)}
                          className={`h-8 flex-1 cursor-pointer text-xs ${
                            directionFilter === dir
                              ? "bg-slate-900 text-white hover:bg-slate-800"
                              : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          {dir === "all" ? "All" : dir === "inbound" ? "Inbound" : "Outbound"}
                        </Button>
                      ))}
                    </div>
                  </div>

                  
                  <div>
                    <label className="mb-1.5 block text-xs font-light text-slate-500">Review Status</label>
                    <div className="flex gap-1">
                      {(["all", "reviewed", "not-reviewed"] as const).map((status) => (
                        <Button
                          key={status}
                          variant={reviewFilter === status ? "default" : "outline"}
                          size="sm"
                          onClick={() => setReviewFilter(status)}
                          className={`h-8 flex-1 cursor-pointer text-xs ${
                            reviewFilter === status
                              ? "bg-slate-900 text-white hover:bg-slate-800"
                              : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          {status === "all" ? "All" : status === "reviewed" ? "Reviewed" : "Not Reviewed"}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="cursor-pointer gap-2 border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                >
                  <CalendarIcon className="h-3.5 w-3.5" strokeWidth={1.5} />
                  <span className="text-xs">
                    {dateRange?.from && dateRange?.to
                      ? `${format(dateRange.from, "MMM d")} - ${format(dateRange.to, "MMM d, y")}`
                      : "Select dates"}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 cursor-pointer text-slate-500 hover:bg-slate-50 hover:text-slate-700"
            >
              <RefreshCw className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 cursor-pointer text-slate-500 hover:bg-slate-50 hover:text-slate-700"
            >
              <Settings className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Button>
          </div>
        </div>
      </header>

      
      <main className="p-4 md:p-6">
        <div className="mx-auto max-w-[1800px]">
          
          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4">
            
            <div className="col-span-1 md:col-span-2 lg:col-span-2 rounded-lg border border-slate-200 bg-white p-4">
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

            <div className="col-span-1 md:col-span-2 lg:col-span-4 rounded-lg border border-slate-200 bg-white p-4">
              <div className="mb-1 text-xs font-light text-slate-400">Not Logged</div>
              <div className="text-2xl font-light text-slate-900">{metrics.enquiryNotLogged}</div>
              <div className="mt-1 text-xs text-slate-500">24% of enquiries</div>
            </div>

            
            <div className="col-span-1 md:col-span-6 lg:col-span-6 rounded-lg border border-slate-200 bg-white p-5">
              <div className="mb-3 text-sm font-medium text-slate-900">Agent Performance</div>
              <div className="space-y-2">
                <div className="grid grid-cols-12 gap-2 border-b border-slate-100 pb-2 text-xs font-light text-slate-400">
                  <div className="col-span-4">Agent</div>
                  <div className="col-span-3">Status</div>
                  <div className="col-span-2 text-right">Inbound</div>
                  <div className="col-span-3 text-right">AHT</div>
                </div>
                {agents.map((agent) => (
                  <div key={agent.id} className="grid grid-cols-12 items-center gap-2 py-1.5 text-xs">
                    <div className="col-span-4 font-normal text-slate-900">{agent.name}</div>
                    <div className="col-span-3">
                      <Badge
                        variant="secondary"
                        className={
                          agent.status === "available"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-amber-50 text-amber-700"
                        }
                      >
                        {agent.status === "available" ? "Available" : "On Call"}
                      </Badge>
                    </div>
                    <div className="col-span-2 text-right text-slate-600">
                      {Math.floor(Math.random() * 10) + 5}
                    </div>
                    <div className="col-span-3 text-right">
                      <Badge
                        variant="secondary"
                        className={
                          agent.aht < "03:30" ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-700"
                        }
                      >
                        {agent.aht}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            
            <div className="col-span-1 md:col-span-6 lg:col-span-6 rounded-lg border border-slate-200 bg-white p-5">
              <div className="mb-3 text-sm font-medium text-slate-900">Call Categories</div>
              <div className="flex items-center gap-6">
                
                <div className="relative h-32 w-32">
                  <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#f1f5f9"
                      strokeWidth="12"
                    />
                    
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
                      stroke="#94a3b8"
                      strokeWidth="12"
                      strokeDasharray={`${(metrics.parts / metrics.totalCalls) * 251.2} 251.2`}
                      strokeDashoffset={`-${(metrics.retail / metrics.totalCalls) * 251.2}`}
                    />
                    
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="12"
                      strokeDasharray={`${(metrics.finance / metrics.totalCalls) * 251.2} 251.2`}
                      strokeDashoffset={`-${((metrics.retail + metrics.parts) / metrics.totalCalls) * 251.2}`}
                    />
                    
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#64748b"
                      strokeWidth="12"
                      strokeDasharray={`${(metrics.other / metrics.totalCalls) * 251.2} 251.2`}
                      strokeDashoffset={`-${((metrics.retail + metrics.parts + metrics.finance) / metrics.totalCalls) * 251.2}`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-xl font-medium text-slate-900">{metrics.totalCalls.toLocaleString()}</div>
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
                    <h2 className="text-sm font-medium text-slate-900">
                      Recent Calls ({filteredCalls.length})
                    </h2>
                    <p className="text-xs text-slate-500">Showing {filteredCalls.length} of {allCalls.length} calls</p>
                  </div>
                  <div className="flex gap-2">
                    {(["all", "inbound", "outbound"] as const).map((dir) => (
                      <Button
                        key={dir}
                        variant={directionFilter === dir ? "default" : "outline"}
                        size="sm"
                        onClick={() => setDirectionFilter(dir)}
                        className={`h-7 cursor-pointer text-xs ${
                          directionFilter === dir
                            ? "bg-slate-900 text-white hover:bg-slate-800"
                            : "border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
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
                    {filteredCalls.map((call) => {
                      const Icon = categoryIcons[call.category as keyof typeof categoryIcons] || HelpCircle;
                      return (
                        <tr
                          key={call.id}
                          className="cursor-pointer hover:bg-slate-50"
                          onClick={() => router.push(`/call/${call.id}`)}
                        >
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
                                <div
                                  key={idx}
                                  className={`h-5 w-5 rounded ${
                                    point.includes("good") || point.includes("excellent")
                                      ? "bg-blue-100"
                                      : "bg-amber-100"
                                  }`}
                                />
                              ))}
                              {call.coaching.length === 0 && (
                                <span className="text-xs text-slate-400">N/A</span>
                              )}
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
                            {call.enquiryLogged ? (
                              <span className="text-xs font-normal text-blue-600">Yes</span>
                            ) : (
                              <span className="text-xs text-slate-400">N/A</span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon" className="h-6 w-6 cursor-pointer">
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
