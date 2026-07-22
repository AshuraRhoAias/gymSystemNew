"use client"

import { useState } from "react"
import {
  AlertTriangle,
  Fingerprint,
  QrCode,
  ScanLine,
  Search,
  UserCheck,
} from "lucide-react"
import {
  CyberCard,
  CyberInput,
  Field,
  SectionTitle,
  StatTile,
  StatusBadge,
} from "@/components/cyber-ui"
import { attendanceToday } from "@/lib/mock-data"

const methodIcon: Record<string, typeof Fingerprint> = {
  Huella: Fingerprint,
  QR: QrCode,
  Manual: ScanLine,
}

export default function AsistenciaPage() {
  const [query, setQuery] = useState("")
  const filtered = attendanceToday.filter((a) =>
    a.miembro.toLowerCase().includes(query.toLowerCase()),
  )
  const dentro = attendanceToday.filter((a) => !a.salida).length
  const alertas = attendanceToday.filter((a) => a.docAlerta).length

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-1">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          Control de acceso
        </p>
        <h1 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground neon-text lg:text-3xl">
          Asistencia
        </h1>
        <p className="text-sm text-muted-foreground">
          Registro de entradas y salidas del día.
        </p>
      </header>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        <StatTile
          label="Asistencias hoy"
          value={attendanceToday.length}
          icon={<ScanLine className="size-4" />}
          tone="blue"
        />
        <StatTile
          label="Dentro del gimnasio"
          value={dentro}
          icon={<UserCheck className="size-4" />}
          tone="purple"
        />
        <StatTile
          label="Alertas de documentación"
          value={alertas}
          icon={<AlertTriangle className="size-4" />}
          tone="blue"
        />
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <div>
          <SectionTitle icon={<Fingerprint className="size-4" />}>
            Registrar entrada
          </SectionTitle>
          <CyberCard glow="purple" className="space-y-4">
            <Field label="ID de miembro / huella / QR">
              <CyberInput placeholder="DM-0000" />
            </Field>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-neon-purple py-2.5 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-transform hover:scale-[1.01]"
            >
              <ScanLine className="size-4" />
              Registrar acceso
            </button>
          </CyberCard>
        </div>

        <div className="lg:col-span-2">
          <SectionTitle icon={<ScanLine className="size-4" />}>
            Registro de hoy
          </SectionTitle>
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-input bg-muted/40 px-3 py-2.5 focus-within:border-accent/70">
            <Search className="size-4 text-accent" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por miembro..."
              className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
          </div>
          <CyberCard className="space-y-3">
            {filtered.map((a) => {
              const Icon = methodIcon[a.metodo]
              return (
                <div
                  key={a.id}
                  className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 p-3"
                >
                  <img
                    src={a.foto || "/placeholder.svg"}
                    alt=""
                    className="size-10 rounded-full object-cover ring-2 ring-primary/30"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {a.miembro}
                    </p>
                    <p className="flex items-center gap-1.5 truncate text-xs text-muted-foreground">
                      <Icon className="size-3" /> {a.metodo} · Entrada {a.entrada}
                      {a.salida ? ` · Salida ${a.salida}` : ""}
                    </p>
                  </div>
                  {a.docAlerta ? (
                    <StatusBadge tone="vencida">
                      <AlertTriangle className="size-3" /> Docs
                    </StatusBadge>
                  ) : (
                    <StatusBadge tone={a.salida ? "muted" : "activa"}>
                      {a.salida ? "Salió" : "En gimnasio"}
                    </StatusBadge>
                  )}
                </div>
              )
            })}
            {filtered.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                Sin resultados para “{query}”.
              </p>
            ) : null}
          </CyberCard>
        </div>
      </div>
    </div>
  )
}
