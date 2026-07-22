"use client"

import {
  AlertTriangle,
  BarChart3,
  Dumbbell,
  TrendingUp,
  UserCheck,
  UserX,
} from "lucide-react"
import {
  CyberCard,
  SectionTitle,
  StatTile,
  StatusBadge,
} from "@/components/cyber-ui"
import {
  membersDirectory,
  reportByDiscipline,
  reportDocsPending,
  revenueByMonth,
} from "@/lib/mock-data"

const currency = (n: number) => `$${n.toLocaleString("es-MX")}`

export default function ReportesPage() {
  const activos = membersDirectory.filter((m) => m.estatus === "activa").length
  const vencidos = membersDirectory.filter((m) => m.estatus === "vencida").length
  const maxIngreso = Math.max(...revenueByMonth.map((r) => r.ingresos))
  const maxDisciplina = Math.max(...reportByDiscipline.map((d) => d.miembros))

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-1">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          Analítica
        </p>
        <h1 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground neon-text lg:text-3xl">
          Reportes
        </h1>
        <p className="text-sm text-muted-foreground">
          Miembros, ingresos, asistencia y documentación.
        </p>
      </header>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile
          label="Miembros activos"
          value={activos}
          icon={<UserCheck className="size-4" />}
          tone="blue"
        />
        <StatTile
          label="Membresías vencidas"
          value={vencidos}
          icon={<UserX className="size-4" />}
          tone="purple"
        />
        <StatTile
          label="Docs. pendientes"
          value={reportDocsPending.length}
          icon={<AlertTriangle className="size-4" />}
          tone="blue"
        />
        <StatTile
          label="Ingresos del mes"
          value={currency(revenueByMonth[revenueByMonth.length - 1].ingresos)}
          icon={<TrendingUp className="size-4" />}
          tone="purple"
        />
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section>
          <SectionTitle icon={<TrendingUp className="size-4" />}>
            Ingresos por periodo
          </SectionTitle>
          <CyberCard glow="blue">
            <div className="flex items-end justify-between gap-2 lg:gap-4">
              {revenueByMonth.map((r) => (
                <div key={r.mes} className="flex flex-1 flex-col items-center gap-2">
                  <span className="text-xs font-semibold text-foreground">
                    {currency(r.ingresos)}
                  </span>
                  <div className="flex h-40 w-full items-end justify-center">
                    <div
                      className="w-full max-w-8 rounded-t-md bg-gradient-to-t from-primary/40 to-accent"
                      style={{
                        height: `${(r.ingresos / maxIngreso) * 100}%`,
                        boxShadow: "0 0 12px oklch(0.72 0.16 220 / 0.4)",
                      }}
                    />
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {r.mes}
                  </span>
                </div>
              ))}
            </div>
          </CyberCard>
        </section>

        <section>
          <SectionTitle icon={<Dumbbell className="size-4" />}>
            Miembros por disciplina
          </SectionTitle>
          <CyberCard glow="purple" className="space-y-4">
            {reportByDiscipline.map((d) => (
              <div key={d.disciplina}>
                <div className="mb-1.5 flex justify-between text-xs">
                  <span className="text-muted-foreground">{d.disciplina}</span>
                  <span className="font-semibold text-foreground">{d.miembros}</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted/60">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-accent to-primary"
                    style={{ width: `${(d.miembros / maxDisciplina) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </CyberCard>
        </section>
      </div>

      <section>
        <SectionTitle icon={<AlertTriangle className="size-4" />}>
          Documentación pendiente (plazo vencido)
        </SectionTitle>
        <CyberCard className="overflow-x-auto p-0">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3 font-semibold">Miembro</th>
                <th className="px-4 py-3 font-semibold">Documento faltante</th>
                <th className="px-4 py-3 font-semibold">Plazo</th>
              </tr>
            </thead>
            <tbody>
              {reportDocsPending.map((d) => (
                <tr
                  key={d.miembro}
                  className="border-b border-border/60 last:border-0 hover:bg-muted/30"
                >
                  <td className="px-4 py-3 font-semibold text-foreground">{d.miembro}</td>
                  <td className="px-4 py-3 text-muted-foreground">{d.falta}</td>
                  <td className="px-4 py-3">
                    <StatusBadge tone={d.plazo.startsWith("Vencido") ? "vencida" : "por-vencer"}>
                      {d.plazo}
                    </StatusBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CyberCard>
      </section>

      <section>
        <SectionTitle icon={<BarChart3 className="size-4" />}>
          Miembros activos vs. vencidos
        </SectionTitle>
        <CyberCard className="space-y-3">
          {membersDirectory.map((m) => (
            <div key={m.id} className="flex items-center gap-3">
              <img
                src={m.foto || "/placeholder.svg"}
                alt=""
                className="size-9 rounded-full object-cover ring-2 ring-primary/30"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">
                  {m.nombre}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {m.disciplina} · Vence {m.vencimiento}
                </p>
              </div>
              <StatusBadge tone={m.estatus}>
                {m.estatus === "por-vencer" ? "Por vencer" : m.estatus}
              </StatusBadge>
            </div>
          ))}
        </CyberCard>
      </section>
    </div>
  )
}
