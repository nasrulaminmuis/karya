import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "accent" | "success" | "warning" | "error";
  className?: string;
}

const variants = {
  primary: "bg-primary-light text-primary",
  secondary: "bg-secondary-light text-secondary",
  accent: "bg-accent-light text-accent",
  success: "bg-green-50 text-success dark:bg-green-900/20",
  warning: "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-warning",
  error: "bg-red-50 text-error dark:bg-red-900/20",
};

export function Badge({ children, variant = "primary", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
