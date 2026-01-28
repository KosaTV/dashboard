"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, MessageSquare } from "lucide-react";

interface ReviewFormProps {
  onSubmit: (notes: string) => void;
}

export function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [notes, setNotes] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (!notes.trim()) {
      setError(true);
      return;
    }
    setError(false);
    onSubmit(notes);
    setNotes("");
  };

  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100/80">
          <MessageSquare className="h-4 w-4 text-slate-600" />
        </div>
        <h3 className="text-sm font-semibold text-foreground">Call Review</h3>
      </div>

      <div className="space-y-3">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-foreground">
            Review Notes <span className="text-rose-500">*</span>
          </label>
          <Textarea
            placeholder="Please enter your review comments (required)..."
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
              if (e.target.value.trim()) setError(false);
            }}
            className={`min-h-[100px] rounded-xl border-slate-200/60 bg-white/50 backdrop-blur-sm resize-none ${
              error ? "border-rose-400 focus-visible:ring-rose-400" : ""
            }`}
          />
          {error && (
            <p className="mt-1.5 text-xs font-medium text-rose-500">
              Review notes are required
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            className="rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 shadow-sm shadow-blue-500/20 hover:from-blue-600 hover:to-blue-700"
          >
            <CheckCircle className="mr-1.5 h-4 w-4" />
            Submit Review
          </Button>
        </div>
      </div>
    </div>
  );
}
