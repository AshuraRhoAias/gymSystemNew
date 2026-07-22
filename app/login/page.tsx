"use client"

import Link from "next/link"
import { useState } from "react"
import { Hexagon, Lock, ShieldCheck, User, Zap } from "lucide-react"
import { ParticlesBackground } from "@/components/particles-background"
import { cn } from "@/lib/utils"

const roles = [
  { id: "admin", label: "Admin", desc: "Control total del sistema", href: "/dashboard" },
  { id: "recepcion", label: "Recepción", desc: "Registros, pagos y asistencia", href: "/dashboard" },
  { id: "entrenador", label: "Entrenador", desc: "Gestión de alumnos y rutinas", href: "/entrenador" },
] as const

export default function LoginPage() {
  const [role, setRole] = useState<(typeof roles)[number]["id"]>("admin")
  const target = roles.find((r) => r.id === role)?.href ?? "/dashboard"

  return (
    <div className="relative grid min-h-svh place-items-center overflow-hidden px-4 py-10">
      <ParticlesBackground />
      <div className="cyber-grid pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="relative grid size-16 place-items-center">
            <Hexagon className="absolute size-16 text-primary" />
            <Zap className="size-6 text-accent" />
          </div>
          <h1 className="mt-4 font-display text-2xl font-bold uppercase tracking-[0.2em] text-foreground neon-text">
            Deportivo Morelos
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Portal de gestión · Acceso al sistema
          </p>
        </div>

        <div className="glass-panel relative rounded-2xl border border-border p-6 glow-purple">
          <span className="pointer-events-none absolute left-0 top-0 h-4 w-4 rounded-tl-2xl border-l-2 border-t-2 border-accent/60" />
          <span className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 rounded-br-2xl border-b-2 border-r-2 border-accent/60" />

          <form
            className="space-y-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Usuario o correo
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-input bg-muted/40 px-3 py-2.5 focus-within:border-accent/70 focus-within:glow-blue">
                <User className="size-4 text-accent" />
                <input
                  type="text"
                  defaultValue="roberto@dmorelos.mx"
                  className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                  placeholder="tu@correo.mx"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Contraseña
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-input bg-muted/40 px-3 py-2.5 focus-within:border-accent/70 focus-within:glow-blue">
                <Lock className="size-4 text-accent" />
                <input
                  type="password"
                  defaultValue="demo1234"
                  className="w-full bg-transparent text-sm text-foreground outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Rol de acceso
              </label>
              <div className="grid gap-2">
                {roles.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRole(r.id)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors",
                      role === r.id
                        ? "border-primary/60 bg-primary/10 glow-purple"
                        : "border-border bg-muted/30 hover:border-accent/40",
                    )}
                  >
                    <ShieldCheck
                      className={cn(
                        "size-4",
                        role === r.id ? "text-primary" : "text-muted-foreground",
                      )}
                    />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{r.label}</p>
                      <p className="text-xs text-muted-foreground">{r.desc}</p>
                    </div>
                    <span
                      className={cn(
                        "ml-auto size-3 rounded-full border",
                        role === r.id
                          ? "border-primary bg-primary"
                          : "border-muted-foreground",
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <input
                type="checkbox"
                defaultChecked
                className="size-4 rounded border-input accent-primary"
              />
              Recordar sesión
            </label>

            <Link
              href={target}
              className="block w-full rounded-xl bg-gradient-to-r from-primary to-neon-purple py-3 text-center text-sm font-bold uppercase tracking-widest text-primary-foreground transition-transform hover:scale-[1.01] glow-purple"
            >
              Entrar al sistema
            </Link>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Prototipo de demostración · datos ficticios
        </p>
      </div>
    </div>
  )
}
