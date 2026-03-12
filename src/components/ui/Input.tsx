import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Input({
  label,
  error,
  helperText,
  className = "",
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-foreground"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full px-4 py-3 rounded-lg border bg-input-bg text-foreground placeholder:text-muted-foreground transition-all duration-150 focus:outline-none focus:ring-0 ${
          error
            ? "border-2 border-error focus:border-error"
            : "border-border focus:border-2 focus:border-primary"
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-error">{error}</p>}
      {helperText && !error && (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
}

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({
  label,
  error,
  className = "",
  id,
  ...props
}: TextareaProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-foreground"
        >
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        className={`w-full px-4 py-3 rounded-lg border bg-input-bg text-foreground placeholder:text-muted-foreground transition-all duration-150 resize-y min-h-[100px] focus:outline-none focus:ring-0 ${
          error
            ? "border-2 border-error focus:border-error"
            : "border-border focus:border-2 focus:border-primary"
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-error">{error}</p>}
    </div>
  );
}
