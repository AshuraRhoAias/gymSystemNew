import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function CyberCard({
  children,
  className,
  glow,
}: {
  children: ReactNode
  className?: string
  glow?: "blue" | "purple"
}) {
  return (
    <div
      className={cn(
        "glass-panel relative rounded-2xl border border-border p-5",
        glow === "blue" && "glow-blue",
        glow === "purple" && "glow-purple",
        className,
      )}
    >
      {/* corner accents */}
      <span className="pointer-events-none absolute left-0 top-0 h-4 w-4 rounded-tl-2xl border-l-2 border-t-2 border-accent/60" />
      <span className="pointer-events-none absolute right-0 top-0 h-4 w-4 rounded-tr-2xl border-r-2 border-t-2 border-primary/60" />
      <span className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 rounded-bl-2xl border-b-2 border-l-2 border-primary/60" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 rounded-br-2xl border-b-2 border-r-2 border-accent/60" />
      {children}
    </div>
  )
}

export function SectionTitle({
  children,
  icon,
  className,
}: {
  children: ReactNode
  icon?: ReactNode
  className?: string
}) {
  return (
    <div className={cn("mb-4 flex items-center gap-2", className)}>
      {icon ? <span className="text-accent">{icon}</span> : null}
      <h2 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-foreground">
        {children}
      </h2>
      <span className="ml-2 h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
    </div>
  )
}

type BadgeTone = "activa" | "vencida" | "por-vencer" | "blue" | "purple" | "muted"

export function StatusBadge({
  tone = "muted",
  children,
}: {
  tone?: BadgeTone
  children: ReactNode
}) {
  const map: Record<BadgeTone, string> = {
    activa: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
    "por-vencer": "border-amber-400/40 bg-amber-400/10 text-amber-300",
    vencida: "border-red-400/40 bg-red-400/10 text-red-300",
    blue: "border-accent/40 bg-accent/10 text-accent",
    purple: "border-primary/40 bg-primary/10 text-primary",
    muted: "border-border bg-muted/40 text-muted-foreground",
  }
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider",
        map[tone],
      )}
    >
      {children}
    </span>
  )
}

export function StatTile({
  label,
  value,
  hint,
  icon,
  tone = "blue",
}: {
  label: string
  value: ReactNode
  hint?: string
  icon?: ReactNode
  tone?: "blue" | "purple"
}) {
  return (
    <CyberCard className="p-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </p>
          <p className="mt-1 font-display text-2xl font-bold text-foreground neon-text">
            {value}
          </p>
          {hint ? (
            <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
          ) : null}
        </div>
        {icon ? (
          <span
            className={cn(
              "grid size-9 place-items-center rounded-lg",
              tone === "blue"
                ? "bg-accent/15 text-accent"
                : "bg-primary/15 text-primary",
            )}
          >
            {icon}
          </span>
        ) : null}
      </div>
    </CyberCard>
  )
}

export function Field({
  label,
  children,
  hint,
  className,
}: {
  label: string
  children: ReactNode
  hint?: string
  className?: string
}) {
  return (
    <label className={cn("block space-y-1.5", className)}>
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
      {hint ? <span className="block text-xs text-muted-foreground">{hint}</span> : null}
    </label>
  )
}

const fieldClasses =
  "w-full rounded-xl border border-input bg-muted/40 px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent/70 focus:glow-blue"

export function CyberInput(
  props: React.InputHTMLAttributes<HTMLInputElement>,
) {
  const { className, ...rest } = props
  return <input className={cn(fieldClasses, className)} {...rest} />
}

export function CyberSelect(
  props: React.SelectHTMLAttributes<HTMLSelectElement>,
) {
  const { className, children, ...rest } = props
  return (
    <select className={cn(fieldClasses, "appearance-none", className)} {...rest}>
      {children}
    </select>
  )
}

export function CyberTextarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
  const { className, ...rest } = props
  return <textarea className={cn(fieldClasses, "min-h-24 resize-y", className)} {...rest} />
}

export function NeonProgress({
  value,
  tone = "blue",
}: {
  value: number
  tone?: "blue" | "purple" | "green"
}) {
  const grad =
    tone === "purple"
      ? "from-primary to-neon-purple"
      : tone === "green"
        ? "from-emerald-400 to-accent"
        : "from-accent to-primary"
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-muted/60">
      <div
        className={cn("h-full rounded-full bg-gradient-to-r", grad)}
        style={{
          width: `${Math.min(100, Math.max(0, value))}%`,
          boxShadow: "0 0 10px oklch(0.7 0.19 265 / 0.6)",
        }}
      />
    </div>
  )
}
