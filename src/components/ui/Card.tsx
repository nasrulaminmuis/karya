import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({
  children,
  className = "",
  hover = false,
  onClick,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-card border border-card-border rounded-xl p-6 shadow-[var(--shadow)] transition-all duration-250 ${
        hover
          ? "hover:shadow-[var(--shadow-lg)] hover:scale-[1.005] cursor-pointer"
          : ""
      } ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
