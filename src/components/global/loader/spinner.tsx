import { cn } from "@/lib/utils"

interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl"
  color?: string
  className?: string
}

export function Spinner({ size = "md", color, className }: SpinnerProps) {
  const sizeMap = {
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
  }

  const actualSize = sizeMap[size]
  const strokeWidth = Math.max(2, actualSize / 12) // Responsive stroke width
  const spinnerColor = color || "currentColor"

  return (
    <div className={cn("inline-flex items-center justify-center", className)} role="status" aria-label="Loading">
      <svg
        width={actualSize}
        height={actualSize}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-spin"
      >
        <circle
          cx="12"
          cy="12"
          r={10 - strokeWidth / 2}
          stroke={spinnerColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray="56.5487"
          strokeDashoffset="15.5487"
          opacity="0.25"
        />
        <path
          d="M12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19"
          stroke={spinnerColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </svg>
      <span className="sr-only">Loading</span>
    </div>
  )
}
