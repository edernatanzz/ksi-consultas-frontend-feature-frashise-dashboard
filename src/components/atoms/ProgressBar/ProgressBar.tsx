interface ProgressBarProps {
  value: number
  max: number
  label?: string
}

export function ProgressBar({ value, max, label }: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  // Determina a cor baseada na porcentagem
  let colorClass = "bg-red-500"

  if (percentage >= 80) {
    colorClass = "bg-green-500"
  } else if (percentage >= 50) {
    colorClass = "bg-yellow-500"
  }

  return (
    <div>
      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
        <div
          className={`h-full ${colorClass}`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label || undefined}
        />
      </div>

      {label && <div className="text-sm mt-1">{label}</div>}
    </div>
  )
}
