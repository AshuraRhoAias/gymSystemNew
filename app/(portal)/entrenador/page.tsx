"use client"

import { useState } from "react"
import {
  AlertTriangle,
  ClipboardList,
  Dumbbell,
  FilePlus2,
  Lock,
  Search,
  Users,
  ClipboardCheck,
  CalendarClock,
} from "lucide-react"
import {
  CyberCard,
  NeonProgress,
  SectionTitle,
  StatTile,
  StatusBadge,
} from "@/components/cyber-ui"
import {
  evaluationHistory,
  students,
  trainerProfile,
} from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const statusLabel: Record<string, string> = {
  activa: "Activa",
  vencida: "Vencida",
  "por-vencer": "Por vencer",
}

export default function TrainerPage() {
  const [selectedId, setSelectedId] = useState(students[0].id)
  const [query, setQuery] = useState("")

  const filtered = students.filter((s) =>
    s.nombre.toLowerCase().includes(query.toLowerCase()),
  )
  const selected = students.find((s) => s.id === selectedId) ?? students[0]

  return (
    <div className="space-y-8">
      {/* Header */}
      <section>
        <CyberCard glow="purple">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <img
              src={trainerProfile.foto || "/placeholder.svg"}
              alt={`Foto de ${trainerProfile.nombre}`}
              className="size-16 rounded-full object-cover ring-2 ring-primary/50"
            />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                Panel del entrenador
              </p>
              <h1 className="font-display text-2xl font-bold text-foreground neon-text">
                {trainerProfile.nombre}
              </h1>
              <p className="text-sm text-primary">{trainerProfile.especialidad}</p>
            </div>
          </div>
        </CyberCard>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-3 gap-4">
        <StatTile
          label="Alumnos"
          value={trainerProfile.alumnosActivos}
          hint="Activos"
          icon={<Users className="size-4" />}
        />
        <StatTile
          label="Rutinas"
          value={trainerProfile.rutinasActivas}
          hint="En curso"
          icon={<Dumbbell className="size-4" />}
          tone="purple"
        />
        <StatTile
          label="Revisiones"
          value={trainerProfile.revisionesPendientes}
          hint="Pendientes"
          icon={<ClipboardList className="size-4" />}
        />
      </section>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        {/* Student list */}
        <section>
          <SectionTitle icon={<Users className="size-4" />}>
            Mis alumnos
          </SectionTitle>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar alumno…"
              className="w-full rounded-xl border border-border bg-muted/30 py-2.5 pl-9 pr-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-accent/60"
            />
          </div>
          <div className="space-y-3">
            {filtered.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelectedId(s.id)}
                className={cn(
                  "w-full rounded-2xl border p-3 text-left transition-colors",
                  s.id === selectedId
                    ? "border-primary/60 bg-primary/10 glow-purple"
                    : "border-border bg-muted/20 hover:bg-muted/40",
                )}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={s.foto || "/placeholder.svg"}
                    alt={`Foto de ${s.nombre}`}
                    className="size-11 rounded-full object-cover ring-1 ring-border"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate font-display text-sm font-bold text-foreground">
                        {s.nombre}
                      </p>
                      {s.alerta ? (
                        <AlertTriangle className="size-3.5 shrink-0 text-amber-300" />
                      ) : null}
                    </div>
                    <p className="truncate text-xs text-muted-foreground">
                      {s.disciplina} · {s.rutina}
                    </p>
                  </div>
                  <StatusBadge tone={s.estatus}>{statusLabel[s.estatus]}</StatusBadge>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <NeonProgress
                    value={s.cumplimiento}
                    tone={s.cumplimiento >= 80 ? "green" : s.cumplimiento >= 65 ? "blue" : "purple"}
                  />
                  <span className="w-10 shrink-0 text-right text-xs font-semibold text-foreground">
                    {s.cumplimiento}%
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Detail */}
        <section>
          <SectionTitle icon={<ClipboardCheck className="size-4" />}>
            Ficha del alumno
          </SectionTitle>

          <CyberCard glow="blue" className="space-y-5">
            {selected.alerta ? (
              <div className="flex items-center gap-2 rounded-xl border border-amber-400/40 bg-amber-400/10 px-3 py-2 text-sm text-amber-200">
                <AlertTriangle className="size-4" /> {selected.alerta}
              </div>
            ) : null}

            <div className="flex items-center gap-4">
              <img
                src={selected.foto || "/placeholder.svg"}
                alt={`Foto de ${selected.nombre}`}
                className="size-16 rounded-2xl object-cover ring-2 ring-accent/40"
              />
              <div>
                <p className="font-display text-xl font-bold text-foreground">
                  {selected.nombre}
                </p>
                <p className="text-sm text-accent">{selected.id} · {selected.disciplina}</p>
                <div className="mt-2 flex items-center gap-2">
                  <StatusBadge tone={selected.estatus}>
                    {statusLabel[selected.estatus]}
                  </StatusBadge>
                  <StatusBadge tone="purple">{selected.rutina}</StatusBadge>
                </div>
              </div>
            </div>

            {/* Meta */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-border bg-background/40 px-3 py-2.5">
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <CalendarClock className="size-3.5" /> Última revisión
                </p>
                <p className="mt-0.5 font-display text-sm font-bold text-foreground">
                  {selected.ultimaRevision}
                </p>
              </div>
              <div className="rounded-xl border border-border bg-background/40 px-3 py-2.5">
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <CalendarClock className="size-3.5" /> Próxima revisión
                </p>
                <p className="mt-0.5 font-display text-sm font-bold text-foreground">
                  {selected.proximaRevision}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 rounded-xl border border-primary/40 bg-primary/10 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/20">
                <Dumbbell className="size-4" /> Editar rutina
              </button>
              <button className="flex items-center justify-center gap-2 rounded-xl border border-accent/40 bg-accent/10 py-2.5 text-sm font-semibold text-accent transition-colors hover:bg-accent/20">
                <FilePlus2 className="size-4" /> Registrar avance
              </button>
            </div>

            {/* Private note */}
            <div className="rounded-xl border border-border bg-muted/30 p-3">
              <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                <Lock className="size-3.5" /> Nota privada
              </p>
              <p className="mt-1 text-sm text-foreground">{selected.notaPrivada}</p>
            </div>

            {/* Evaluation history */}
            <div>
              <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <ClipboardList className="size-3.5" /> Historial de evaluaciones
              </p>
              <div className="space-y-2">
                {evaluationHistory.map((e, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-border bg-background/40 px-3 py-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-accent">{e.fecha}</span>
                      <span className="text-xs text-muted-foreground">
                        {e.peso} · {e.grasa}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-foreground">{e.comentario}</p>
                  </div>
                ))}
              </div>
            </div>
          </CyberCard>
        </section>
      </div>
    </div>
  )
}
