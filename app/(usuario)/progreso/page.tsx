import {
  ArrowDown,
  ArrowUp,
  CalendarCheck,
  Flame,
  Images,
  MessageSquareText,
  Ruler,
  Target,
  TrendingDown,
  Trophy,
} from "lucide-react"
import {
  CyberCard,
  NeonProgress,
  SectionTitle,
  StatTile,
  StatusBadge,
} from "@/components/cyber-ui"
import { WeightChart } from "@/components/weight-chart"
import {
  currentMember,
  goals,
  measurements,
  personalRecords,
  trainerNotes,
  weightHistory,
} from "@/lib/mock-data"

export default function ProgressPage() {
  const first = weightHistory[0]
  const last = weightHistory[weightHistory.length - 1]
  const pesoDelta = (last.peso - first.peso).toFixed(1)
  const grasaDelta = (last.grasa - first.grasa).toFixed(1)

  return (
    <div className="space-y-8">
      <section>
        <h1 className="font-display text-3xl font-bold text-foreground neon-text">
          Mi progreso
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Evolución de {currentMember.nombre} · últimos 6 meses
        </p>
      </section>

      {/* Top stats */}
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile
          label="Peso actual"
          value={`${last.peso} kg`}
          hint={`${pesoDelta} kg vs inicio`}
          icon={<TrendingDown className="size-4" />}
        />
        <StatTile
          label="% Grasa"
          value={`${last.grasa}%`}
          hint={`${grasaDelta}% vs inicio`}
          icon={<Flame className="size-4" />}
          tone="purple"
        />
        <StatTile
          label="Racha"
          value={`${currentMember.racha} días`}
          hint="Constancia"
          icon={<CalendarCheck className="size-4" />}
        />
        <StatTile
          label="Cumplimiento"
          value={`${currentMember.cumplimientoMes}%`}
          hint="Este mes"
          icon={<Trophy className="size-4" />}
          tone="purple"
        />
      </section>

      {/* Weight chart */}
      <section>
        <SectionTitle icon={<TrendingDown className="size-4" />}>
          Evolución de peso y grasa
        </SectionTitle>
        <CyberCard glow="blue">
          <div className="mb-4 flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <span className="size-2.5 rounded-full bg-accent" /> Peso (kg)
            </span>
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <span className="size-2.5 rounded-full bg-primary" /> % Grasa
            </span>
          </div>
          <WeightChart data={weightHistory} />
        </CyberCard>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* PRs */}
        <section>
          <SectionTitle icon={<Trophy className="size-4" />}>
            Récords personales (PRs)
          </SectionTitle>
          <CyberCard glow="purple" className="space-y-3">
            {personalRecords.map((pr) => (
              <div
                key={pr.ejercicio}
                className="flex items-center justify-between rounded-xl border border-border bg-background/40 px-4 py-3"
              >
                <div>
                  <p className="font-display text-sm font-bold text-foreground">
                    {pr.ejercicio}
                  </p>
                  <p className="text-xs text-muted-foreground">{pr.fecha}</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-xl font-bold text-accent neon-text">
                    {pr.peso} kg
                  </p>
                  <p className="flex items-center justify-end gap-0.5 text-xs text-emerald-300">
                    <ArrowUp className="size-3" /> +{(pr.peso - pr.anterior).toFixed(1)} kg
                  </p>
                </div>
              </div>
            ))}
          </CyberCard>
        </section>

        {/* Measurements */}
        <section>
          <SectionTitle icon={<Ruler className="size-4" />}>
            Medidas corporales
          </SectionTitle>
          <CyberCard className="space-y-3">
            {measurements.map((m) => {
              const diff = m.actual - m.anterior
              const isWaist = m.zona === "Cintura"
              const good = isWaist ? diff < 0 : diff > 0
              return (
                <div
                  key={m.zona}
                  className="flex items-center justify-between rounded-xl border border-border bg-background/40 px-4 py-3"
                >
                  <p className="font-display text-sm font-bold text-foreground">
                    {m.zona}
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground line-through">
                      {m.anterior} {m.unidad}
                    </span>
                    <span className="font-display text-lg font-bold text-foreground">
                      {m.actual} {m.unidad}
                    </span>
                    <span
                      className={`flex items-center gap-0.5 text-xs font-semibold ${
                        good ? "text-emerald-300" : "text-amber-300"
                      }`}
                    >
                      {diff < 0 ? (
                        <ArrowDown className="size-3" />
                      ) : (
                        <ArrowUp className="size-3" />
                      )}
                      {Math.abs(diff)} {m.unidad}
                    </span>
                  </div>
                </div>
              )
            })}
          </CyberCard>
        </section>
      </div>

      {/* Goals */}
      <section>
        <SectionTitle icon={<Target className="size-4" />}>Metas</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-3">
          {goals.map((g) => (
            <CyberCard key={g.meta} glow="blue">
              <div className="flex items-center justify-between">
                <p className="font-display text-sm font-bold text-foreground">
                  {g.meta}
                </p>
                <StatusBadge tone="muted">{g.fecha}</StatusBadge>
              </div>
              <p className="mt-3 font-display text-2xl font-bold text-accent neon-text">
                {g.progreso}%
              </p>
              <div className="mt-2">
                <NeonProgress value={g.progreso} tone="blue" />
              </div>
            </CyberCard>
          ))}
        </div>
      </section>

      {/* Progress photos */}
      <section>
        <SectionTitle icon={<Images className="size-4" />}>
          Fotos de progreso
        </SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { src: "/progress/before.png", label: "Antes", date: "Feb 2026", tone: "muted" as const },
            { src: "/progress/after.png", label: "Ahora", date: "Jul 2026", tone: "blue" as const },
          ].map((p) => (
            <CyberCard key={p.label} glow={p.tone === "blue" ? "blue" : undefined} className="p-3">
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={p.src || "/placeholder.svg"}
                  alt={`Foto de progreso ${p.label}`}
                  className="h-72 w-full object-cover"
                />
                <div className="absolute left-3 top-3">
                  <StatusBadge tone={p.tone}>{p.label}</StatusBadge>
                </div>
                <span className="absolute bottom-3 right-3 rounded-md bg-background/70 px-2 py-0.5 text-xs text-foreground backdrop-blur">
                  {p.date}
                </span>
              </div>
            </CyberCard>
          ))}
        </div>
      </section>

      {/* Trainer evaluations */}
      <section>
        <SectionTitle icon={<MessageSquareText className="size-4" />}>
          Evaluaciones del entrenador
        </SectionTitle>
        <CyberCard glow="purple" className="space-y-4">
          {trainerNotes.map((n, i) => (
            <div key={i} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span className="size-2.5 rounded-full bg-primary shadow-[0_0_8px_oklch(0.7_0.19_265)]" />
                {i < trainerNotes.length - 1 ? (
                  <span className="mt-1 w-px flex-1 bg-border" />
                ) : null}
              </div>
              <div className="pb-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  {n.fecha}
                </p>
                <p className="mt-0.5 text-sm text-foreground">{n.texto}</p>
              </div>
            </div>
          ))}
        </CyberCard>
      </section>
    </div>
  )
}
