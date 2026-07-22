"use client"

import { useState } from "react"
import {
  AlertTriangle,
  BadgeCheck,
  Clock3,
  Contact,
  Search,
  Users,
} from "lucide-react"
import {
  CyberCard,
  SectionTitle,
  StatTile,
  StatusBadge,
} from "@/components/cyber-ui"
import { instructors } from "@/lib/mock-data"

export default function InstructoresPage() {
  const [query, setQuery] = useState("")
  const filtered = instructors.filter((i) =>
    i.nombre.toLowerCase().includes(query.toLowerCase()),
  )
  const pendientes = instructors.filter((i) => !i.docsCompletos).length

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-1">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          Personal
        </p>
        <h1 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground neon-text lg:text-3xl">
          Entrenadores / Instructores
        </h1>
        <p className="text-sm text-muted-foreground">
          Especialidades, horarios y certificaciones del staff.
        </p>
      </header>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        <StatTile
          label="Instructores"
          value={instructors.length}
          icon={<Contact className="size-4" />}
          tone="blue"
        />
        <StatTile
          label="Alumnos asignados"
          value={instructors.reduce((s, i) => s + i.alumnos, 0)}
          icon={<Users className="size-4" />}
          tone="purple"
        />
        <StatTile
          label="Documentación pendiente"
          value={pendientes}
          icon={<AlertTriangle className="size-4" />}
          tone="blue"
        />
      </section>

      <div className="mb-2 flex items-center gap-2 rounded-xl border border-input bg-muted/40 px-3 py-2.5 focus-within:border-accent/70">
        <Search className="size-4 text-accent" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar instructor..."
          className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
      </div>

      <section>
        <SectionTitle icon={<Contact className="size-4" />}>
          Directorio
        </SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((i) => (
            <CyberCard key={i.id} glow="purple" className="space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={i.foto || "/placeholder.svg"}
                  alt={`Foto de ${i.nombre}`}
                  className="size-14 rounded-2xl object-cover ring-2 ring-primary/40"
                />
                <div className="min-w-0">
                  <p className="truncate font-display text-base font-bold text-foreground">
                    {i.nombre}
                  </p>
                  <p className="truncate text-xs text-primary">{i.especialidad}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock3 className="size-3.5 text-accent" /> {i.horario}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <BadgeCheck className="size-3.5 text-accent" /> {i.certificacion}
              </div>
              <div className="flex items-center justify-between pt-1">
                <StatusBadge tone="blue">{i.alumnos} alumnos</StatusBadge>
                <StatusBadge tone={i.docsCompletos ? "activa" : "vencida"}>
                  {i.docsCompletos ? "Docs completos" : "Docs pendientes"}
                </StatusBadge>
              </div>
            </CyberCard>
          ))}
          {filtered.length === 0 ? (
            <p className="col-span-full py-8 text-center text-sm text-muted-foreground">
              Sin resultados para “{query}”.
            </p>
          ) : null}
        </div>
      </section>
    </div>
  )
}
