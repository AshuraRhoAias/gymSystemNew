"use client"

import { useState } from "react"
import {
  CalendarClock,
  Dumbbell,
  History,
  RefreshCw,
  Repeat,
  StickyNote,
  Timer,
  User,
  Weight,
} from "lucide-react"
import {
  CyberCard,
  SectionTitle,
  StatusBadge,
} from "@/components/cyber-ui"
import { myRoutine, routineHistory } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export default function RoutinePage() {
  const [activeDay, setActiveDay] = useState(0)
  const day = myRoutine.dias[activeDay]

  return (
    <div className="space-y-8">
      {/* Header */}
      <section>
        <CyberCard glow="purple">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                Rutina asignada
              </p>
              <h1 className="mt-1 font-display text-3xl font-bold text-foreground neon-text">
                {myRoutine.nombre}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <StatusBadge tone="purple">
                  <User className="size-3" /> {myRoutine.entrenador}
                </StatusBadge>
                <StatusBadge tone="muted">
                  <CalendarClock className="size-3" /> Asignada {myRoutine.asignada}
                </StatusBadge>
              </div>
            </div>
            <div className="rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-center">
              <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
                <RefreshCw className="size-3" /> Próxima revisión
              </p>
              <p className="mt-1 font-display text-lg font-bold text-foreground">
                {myRoutine.proximaRevision}
              </p>
            </div>
          </div>
        </CyberCard>
      </section>

      {/* Day selector */}
      <section>
        <SectionTitle icon={<Dumbbell className="size-4" />}>
          Split de la semana
        </SectionTitle>
        <div className="mb-6 flex flex-wrap gap-2">
          {myRoutine.dias.map((d, i) => (
            <button
              key={d.dia}
              type="button"
              onClick={() => setActiveDay(i)}
              className={cn(
                "flex flex-col items-start rounded-xl border px-4 py-2.5 text-left transition-colors",
                i === activeDay
                  ? "border-primary/60 bg-primary/15 glow-purple"
                  : "border-border bg-muted/30 hover:bg-muted/50",
              )}
            >
              <span
                className={cn(
                  "text-sm font-bold",
                  i === activeDay ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {d.dia}
              </span>
              <span className="text-xs text-accent">{d.enfoque}</span>
            </button>
          ))}
        </div>

        {/* Exercises */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-foreground">
              {day.dia} · <span className="text-accent">{day.enfoque}</span>
            </h3>
            <StatusBadge tone="blue">{day.ejercicios.length} ejercicios</StatusBadge>
          </div>

          {day.ejercicios.map((ex, i) => (
            <CyberCard key={ex.nombre} className="p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/15 font-display text-sm font-bold text-primary">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-display text-base font-bold text-foreground">
                      {ex.nombre}
                    </p>
                    {ex.nota ? (
                      <p className="flex items-center gap-1 text-xs text-accent">
                        <StickyNote className="size-3" /> {ex.nota}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-4 sm:justify-items-end">
                  <Metric icon={<Repeat className="size-3.5" />} label="Series" value={`${ex.series}`} />
                  <Metric icon={<Dumbbell className="size-3.5" />} label="Reps" value={ex.reps} />
                  <Metric icon={<Weight className="size-3.5" />} label="Peso" value={ex.peso} />
                  <Metric icon={<Timer className="size-3.5" />} label="Descanso" value={ex.descanso} />
                </div>
              </div>
            </CyberCard>
          ))}
        </div>
      </section>

      {/* History */}
      <section>
        <SectionTitle icon={<History className="size-4" />}>
          Historial de rutinas
        </SectionTitle>
        <div className="grid gap-3 sm:grid-cols-3">
          {routineHistory.map((r) => (
            <CyberCard key={r.nombre} className="p-4">
              <p className="font-display text-sm font-bold text-foreground">{r.nombre}</p>
              <p className="mt-1 text-xs text-accent">{r.enfoque}</p>
              <p className="mt-2 text-xs text-muted-foreground">{r.periodo}</p>
            </CyberCard>
          ))}
        </div>
      </section>
    </div>
  )
}

function Metric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="rounded-lg border border-border bg-background/40 px-3 py-1.5 text-center">
      <p className="flex items-center justify-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground">
        {icon} {label}
      </p>
      <p className="font-display text-sm font-bold text-foreground">{value}</p>
    </div>
  )
}
