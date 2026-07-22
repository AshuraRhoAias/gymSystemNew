import Link from "next/link"
import {
  AlertTriangle,
  BarChart3,
  Bell,
  CreditCard,
  ScanLine,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react"
import {
  CyberCard,
  NeonProgress,
  SectionTitle,
  StatTile,
  StatusBadge,
} from "@/components/cyber-ui"
import {
  attendanceByHour,
  dashboardStats,
  membersDirectory,
  reportDocsPending,
} from "@/lib/mock-data"

const quickActions = [
  { href: "/registro", label: "Nuevo registro", icon: UserPlus },
  { href: "/pagos", label: "Cobros", icon: CreditCard },
  { href: "/asistencia", label: "Asistencia", icon: ScanLine },
  { href: "/reportes", label: "Reportes", icon: BarChart3 },
]

const currency = (n: number) => `$${n.toLocaleString("es-MX")}`

export default function DashboardPage() {
  const maxHour = Math.max(...attendanceByHour.map((h) => h.personas))
  const metaPct = Math.round((dashboardStats.ingresosMes / dashboardStats.metaMes) * 100)

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-1">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          Panel de control
        </p>
        <h1 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground neon-text lg:text-3xl">
          Buen día, Roberto
        </h1>
        <p className="text-sm text-muted-foreground">
          Resumen operativo del Deportivo Morelos · hoy
        </p>
      </header>

      {/* KPIs */}
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile
          label="Miembros activos"
          value={dashboardStats.miembrosActivos}
          hint="+12 este mes"
          icon={<Users className="size-4" />}
          tone="blue"
        />
        <StatTile
          label="Inscripciones hoy"
          value={dashboardStats.inscripcionesHoy}
          hint="Meta diaria: 5"
          icon={<UserPlus className="size-4" />}
          tone="purple"
        />
        <StatTile
          label="Pagos pendientes"
          value={dashboardStats.pagosPendientes}
          hint="Requieren seguimiento"
          icon={<CreditCard className="size-4" />}
          tone="blue"
        />
        <StatTile
          label="Asistencias hoy"
          value={dashboardStats.asistenciasHoy}
          hint="En tiempo real"
          icon={<ScanLine className="size-4" />}
          tone="purple"
        />
      </section>

      {/* Quick actions */}
      <section>
        <SectionTitle icon={<TrendingUp className="size-4" />}>
          Accesos rápidos
        </SectionTitle>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {quickActions.map((a) => {
            const Icon = a.icon
            return (
              <Link key={a.href} href={a.href}>
                <CyberCard className="group flex items-center gap-3 p-4 transition-transform hover:scale-[1.02] hover:glow-purple">
                  <span className="grid size-10 place-items-center rounded-xl bg-primary/15 text-primary transition-colors group-hover:bg-primary/25">
                    <Icon className="size-5" />
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {a.label}
                  </span>
                </CyberCard>
              </Link>
            )
          })}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Attendance by hour */}
        <div className="lg:col-span-2">
          <SectionTitle icon={<ScanLine className="size-4" />}>
            Asistencia por hora
          </SectionTitle>
          <CyberCard>
            <div className="flex items-end justify-between gap-2 lg:gap-4">
              {attendanceByHour.map((h) => (
                <div key={h.hora} className="flex flex-1 flex-col items-center gap-2">
                  <span className="text-xs font-semibold text-foreground">
                    {h.personas}
                  </span>
                  <div className="flex h-40 w-full items-end justify-center">
                    <div
                      className="w-full max-w-8 rounded-t-md bg-gradient-to-t from-primary/40 to-accent"
                      style={{
                        height: `${(h.personas / maxHour) * 100}%`,
                        boxShadow: "0 0 12px oklch(0.72 0.16 220 / 0.4)",
                      }}
                    />
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {h.hora}
                  </span>
                </div>
              ))}
            </div>
          </CyberCard>
        </div>

        {/* Revenue goal */}
        <div>
          <SectionTitle icon={<TrendingUp className="size-4" />}>
            Ingresos del mes
          </SectionTitle>
          <CyberCard glow="purple" className="space-y-4">
            <div>
              <p className="font-display text-3xl font-bold text-foreground neon-text">
                {currency(dashboardStats.ingresosMes)}
              </p>
              <p className="text-xs text-muted-foreground">
                Meta: {currency(dashboardStats.metaMes)}
              </p>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Progreso</span>
                <span className="font-semibold text-accent">{metaPct}%</span>
              </div>
              <NeonProgress value={metaPct} tone="purple" />
            </div>
            <p className="text-xs text-muted-foreground">
              Faltan {currency(dashboardStats.metaMes - dashboardStats.ingresosMes)} para
              alcanzar la meta mensual.
            </p>
          </CyberCard>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent members */}
        <div>
          <SectionTitle icon={<Users className="size-4" />}>
            Últimos miembros
          </SectionTitle>
          <CyberCard className="space-y-3">
            {membersDirectory.slice(0, 4).map((m) => (
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
                    {m.disciplina} · {m.membresia}
                  </p>
                </div>
                <StatusBadge tone={m.estatus}>
                  {m.estatus === "por-vencer" ? "Por vencer" : m.estatus}
                </StatusBadge>
              </div>
            ))}
          </CyberCard>
        </div>

        {/* Pending docs */}
        <div>
          <SectionTitle icon={<AlertTriangle className="size-4" />}>
            Documentación pendiente
          </SectionTitle>
          <CyberCard glow="blue" className="space-y-3">
            {reportDocsPending.map((d) => (
              <div
                key={d.miembro}
                className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 p-3"
              >
                <span className="grid size-8 place-items-center rounded-lg bg-amber-400/15 text-amber-300">
                  <AlertTriangle className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {d.miembro}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">{d.falta}</p>
                </div>
                <span className="shrink-0 text-xs font-medium text-amber-300">
                  {d.plazo}
                </span>
              </div>
            ))}
            <Link
              href="/notificaciones"
              className="flex items-center justify-center gap-2 rounded-xl border border-primary/40 bg-primary/10 py-2 text-xs font-semibold uppercase tracking-wider text-primary transition-colors hover:bg-primary/20"
            >
              <Bell className="size-4" />
              Enviar recordatorios
            </Link>
          </CyberCard>
        </div>
      </div>
    </div>
  )
}
