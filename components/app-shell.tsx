"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  Activity,
  BarChart3,
  Bell,
  Contact,
  CreditCard,
  Dumbbell,
  Hexagon,
  LayoutDashboard,
  LineChart,
  LogOut,
  Menu,
  ScanLine,
  Settings,
  UserPlus,
  Users,
  UserRound,
  X,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ParticlesBackground } from "@/components/particles-background"

type NavItem = {
  href: string
  label: string
  icon: typeof Activity
}

type NavGroup = {
  title: string
  items: NavItem[]
}

const adminNavGroups: NavGroup[] = [
  {
    title: "Administración",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/registro", label: "Nuevo miembro", icon: UserPlus },
      { href: "/pagos", label: "Pagos", icon: CreditCard },
      { href: "/asistencia", label: "Asistencia", icon: ScanLine },
      { href: "/instructores", label: "Instructores", icon: Contact },
      { href: "/reportes", label: "Reportes", icon: BarChart3 },
      { href: "/notificaciones", label: "Notificaciones", icon: Bell },
      { href: "/configuracion", label: "Configuración", icon: Settings },
    ],
  },
  {
    title: "Entrenador",
    items: [{ href: "/entrenador", label: "Mis alumnos", icon: Users }],
  },
]

const usuarioNavGroups: NavGroup[] = [
  {
    title: "Mi cuenta",
    items: [
      { href: "/", label: "Mi perfil", icon: UserRound },
      { href: "/rutina", label: "Mi rutina", icon: Dumbbell },
      { href: "/progreso", label: "Mi progreso", icon: LineChart },
    ],
  },
]

function NavLink({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const pathname = usePathname()
  const active = pathname === item.href
  const Icon = item.icon
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors",
        active
          ? "bg-primary/15 text-foreground glow-purple"
          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
      )}
    >
      {active ? (
        <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-gradient-to-b from-accent to-primary" />
      ) : null}
      <Icon className="size-[18px]" />
      {item.label}
    </Link>
  )
}

type Persona = {
  nombre: string
  foto: string
  rol: string
}

const areaConfig = {
  admin: {
    label: "Administración",
    navGroups: adminNavGroups,
    persona: { nombre: "Roberto Díaz", foto: "/members/diego.png", rol: "Administrador" } as Persona,
  },
  usuario: {
    label: "Miembro",
    navGroups: usuarioNavGroups,
    persona: { nombre: "Carlos Mendoza", foto: "/members/carlos.png", rol: "Miembro activo" } as Persona,
  },
}

export function AppShell({
  children,
  area,
}: {
  children: React.ReactNode
  area: "admin" | "usuario"
}) {
  const [open, setOpen] = useState(false)
  const { label, navGroups, persona } = areaConfig[area]

  return (
    <div className="relative min-h-svh">
      <ParticlesBackground />

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-border bg-sidebar/85 backdrop-blur-xl transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center gap-3 border-b border-border px-5 py-5">
          <div className="relative grid size-10 place-items-center">
            <Hexagon className="absolute size-10 text-primary" />
            <Zap className="size-4 text-accent" />
          </div>
          <div>
            <p className="font-display text-sm font-bold uppercase tracking-widest text-foreground neon-text">
              Deportivo
            </p>
            <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              Morelos
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="ml-auto rounded-md p-1 text-muted-foreground hover:text-foreground lg:hidden"
            aria-label="Cerrar menú"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
          {navGroups.map((group) => (
            <div key={group.title}>
              <p className="px-3 pb-2 pt-5 text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground first:pt-0">
                {group.title}
              </p>
              {group.items.map((item) => (
                <NavLink key={item.href} item={item} onNavigate={() => setOpen(false)} />
              ))}
            </div>
          ))}
        </nav>

        <div className="space-y-2 border-t border-border p-4">
          <div className="flex items-center gap-3 rounded-xl bg-muted/40 p-3">
            <img
              src={persona.foto || "/placeholder.svg"}
              alt=""
              className="size-10 rounded-full object-cover ring-2 ring-primary/40"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">
                {persona.nombre}
              </p>
              <p className="truncate text-xs text-accent">{persona.rol}</p>
            </div>
          </div>
          <Link
            href="/login"
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
          >
            <LogOut className="size-[18px]" />
            Cerrar sesión
          </Link>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {open ? (
        <button
          type="button"
          aria-label="Cerrar menú"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-background/70 backdrop-blur-sm lg:hidden"
        />
      ) : null}

      {/* Main */}
      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-background/70 px-4 py-3 backdrop-blur-xl lg:px-8">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-md p-1.5 text-muted-foreground hover:text-foreground lg:hidden"
            aria-label="Abrir menú"
          >
            <Menu className="size-5" />
          </button>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            <Activity className="size-4 text-accent" />
            <span className="text-foreground">Portal</span>
            <span className="text-muted-foreground">/</span>
            <span className="text-accent">{label}</span>
          </div>
          <div className="ml-auto flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
            <span className="size-2 animate-pulse rounded-full bg-emerald-400" />
            En línea
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  )
}
