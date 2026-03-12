import React from "react";
import { X } from "lucide-react";

interface ChipProps {
  children: React.ReactNode;
  onRemove?: () => void;
  className?: string;
}

export function Chip({ children, onRemove, className = "" }: ChipProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm bg-muted text-muted-foreground border border-border ${className}`}
    >
      {children}
      {onRemove && (
        <button
          onClick={onRemove}
          className="hover:text-error transition-colors cursor-pointer"
          aria-label="Remove"
        >
          <X size={14} />
        </button>
      )}
    </span>
  );
}
