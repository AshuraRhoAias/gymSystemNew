import Link from "next/link"
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  CreditCard,
  Dumbbell,
  Flame,
  LineChart,
  Clock3,
  ShieldCheck,
  Sparkles,
} from "lucide-react"
import {
  CyberCard,
  NeonProgress,
  SectionTitle,
  StatTile,
  StatusBadge,
} from "@/components/cyber-ui"
import {
  assignedTrainer,
  currentMember,
  currentMembership,
} from "@/lib/mock-data"

const quickLinks = [
  { href: "/rutina", label: "Mi rutina", desc: "Fuerza · Semana 4", icon: Dumbbell, tone: "purple" as const },
  { href: "/progreso", label: "Mi progreso", desc: "Peso, PRs y medidas", icon: LineChart, tone: "blue" as const },
  { href: "#", label: "Historial de pagos", desc: "Últimos movimientos", icon: CreditCard, tone: "purple" as const },
  { href: "#", label: "Mis asistencias", desc: `Racha de ${currentMember.racha} días`, icon: CalendarClock, tone: "blue" as const },
]

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <section>
        <CyberCard glow="purple" className="overflow-hidden">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="relative shrink-0">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-accent to-primary opacity-70 blur-[6px]" />
              <img
                src={currentMember.foto || "/placeholder.svg"}
                alt={`Foto de ${currentMember.nombre}`}
                className="relative size-28 rounded-2xl object-cover"
              />
              <span className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full border border-emerald-400/40 bg-background px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                <BadgeCheck className="size-3" /> Activo
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                Miembro · {currentMember.id}
              </p>
              <h1 className="mt-1 font-display text-3xl font-bold text-foreground neon-text">
                {currentMember.nombre}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <StatusBadge tone="purple">
                  <Sparkles className="size-3" /> {currentMembership.tipo}
                </StatusBadge>
                <StatusBadge tone="blue">{currentMember.disciplina}</StatusBadge>
                <StatusBadge tone="muted">Miembro desde {currentMember.desde}</StatusBadge>
              </div>
            </div>

            <div className="shrink-0 rounded-xl border border-border bg-muted/30 p-4 text-center">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Vence en
              </p>
              <p className="font-display text-4xl font-bold text-accent neon-text">
                {currentMembership.diasRestantes}
              </p>
              <p className="text-xs text-muted-foreground">días</p>
              <p className="mt-1 text-xs font-medium text-foreground">
                {currentMembership.vencimiento}
              </p>
            </div>
          </div>
        </CyberCard>
      </section>

      {/* Quick stats */}
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile
          label="Racha actual"
          value={`${currentMember.racha} días`}
          hint="Sigue así"
          icon={<Flame className="size-4" />}
          tone="purple"
        />
        <StatTile
          label="Cumplimiento"
          value={`${currentMember.cumplimientoMes}%`}
          hint="Este mes"
          icon={<BadgeCheck className="size-4" />}
        />
        <StatTile
          label="Membresía"
          value={currentMembership.estatus === "activa" ? "Activa" : "Vencida"}
          hint={`Desde ${currentMembership.inicio}`}
          icon={<ShieldCheck className="size-4" />}
          tone="purple"
        />
        <StatTile
          label="Disciplina"
          value={currentMember.disciplina}
          hint={`${currentMember.edad} años`}
          icon={<Dumbbell className="size-4" />}
        />
      </section>

      {/* Membership + Trainer */}
      <div className="grid gap-6 lg:grid-cols-2">
        <section>
          <SectionTitle icon={<ShieldCheck className="size-4" />}>
            Membresía activa
          </SectionTitle>
          <CyberCard glow="blue">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-display text-xl font-bold text-foreground">
                  {currentMembership.tipo}
                </p>
                <p className="text-sm text-muted-foreground">
                  {currentMembership.inicio} → {currentMembership.vencimiento}
                </p>
              </div>
              <StatusBadge tone="activa">Al corriente</StatusBadge>
            </div>
            <div className="mt-5">
              <div className="mb-1.5 flex justify-between text-xs text-muted-foreground">
                <span>Periodo actual</span>
                <span>{currentMembership.diasRestantes} días restantes</span>
              </div>
              <NeonProgress value={100 - (currentMembership.diasRestantes / 30) * 100} tone="blue" />
            </div>
            <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-accent/40 bg-accent/10 py-2.5 text-sm font-semibold text-accent transition-colors hover:bg-accent/20">
              <CreditCard className="size-4" /> Renovar membresía
            </button>
          </CyberCard>
        </section>

        <section>
          <SectionTitle icon={<ShieldCheck className="size-4" />}>
            Entrenador asignado
          </SectionTitle>
          <CyberCard glow="purple">
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-primary to-accent opacity-70 blur-[4px]" />
                <img
                  src={assignedTrainer.foto || "/placeholder.svg"}
                  alt={`Foto de ${assignedTrainer.nombre}`}
                  className="relative size-16 rounded-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="font-display text-lg font-bold text-foreground">
                  {assignedTrainer.nombre}
                </p>
                <p className="text-sm text-primary">{assignedTrainer.especialidad}</p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <BadgeCheck className="size-3 text-accent" />
                  {assignedTrainer.certificacion}
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-border bg-muted/30 px-3 py-2.5 text-sm text-foreground">
              <Clock3 className="size-4 text-accent" />
              {assignedTrainer.horario}
            </div>
          </CyberCard>
        </section>
      </div>

      {/* Quick access */}
      <section>
        <SectionTitle icon={<ArrowRight className="size-4" />}>
          Accesos directos
        </SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map((q) => {
            const Icon = q.icon
            return (
              <Link key={q.label} href={q.href}>
                <CyberCard
                  className="h-full transition-transform hover:-translate-y-1"
                  glow={q.tone}
                >
                  <span
                    className={`grid size-11 place-items-center rounded-xl ${
                      q.tone === "blue"
                        ? "bg-accent/15 text-accent"
                        : "bg-primary/15 text-primary"
                    }`}
                  >
                    <Icon className="size-5" />
                  </span>
                  <p className="mt-4 font-display text-base font-bold text-foreground">
                    {q.label}
                  </p>
                  <p className="text-sm text-muted-foreground">{q.desc}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-accent">
                    Abrir <ArrowRight className="size-3" />
                  </span>
                </CyberCard>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
