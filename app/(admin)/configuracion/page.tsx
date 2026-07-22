"use client"

import {
  BookOpen,
  Building2,
  Clock3,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserCog,
} from "lucide-react"
import {
  CyberCard,
  Field,
  SectionTitle,
  StatusBadge,
} from "@/components/cyber-ui"
import { gymInfo, gymRules, systemUsers } from "@/lib/mock-data"

const roleTone: Record<string, "purple" | "blue" | "muted"> = {
  Admin: "purple",
  Recepción: "blue",
  Entrenador: "muted",
}

export default function ConfiguracionPage() {
  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-1">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          Sistema
        </p>
        <h1 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground neon-text lg:text-3xl">
          Configuración
        </h1>
        <p className="text-sm text-muted-foreground">
          Usuarios del sistema, reglamento y datos del gimnasio.
        </p>
      </header>

      <section>
        <SectionTitle icon={<UserCog className="size-4" />}>
          Usuarios del sistema
        </SectionTitle>
        <CyberCard className="overflow-x-auto p-0">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3 font-semibold">Nombre</th>
                <th className="px-4 py-3 font-semibold">Correo</th>
                <th className="px-4 py-3 font-semibold">Rol</th>
                <th className="px-4 py-3 font-semibold">Estatus</th>
              </tr>
            </thead>
            <tbody>
              {systemUsers.map((u) => (
                <tr
                  key={u.id}
                  className="border-b border-border/60 last:border-0 hover:bg-muted/30"
                >
                  <td className="px-4 py-3 font-semibold text-foreground">{u.nombre}</td>
                  <td className="px-4 py-3 text-muted-foreground">{u.correo}</td>
                  <td className="px-4 py-3">
                    <StatusBadge tone={roleTone[u.rol] ?? "muted"}>{u.rol}</StatusBadge>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge tone={u.estatus === "activo" ? "activa" : "vencida"}>
                      {u.estatus === "activo" ? "Activo" : "Inactivo"}
                    </StatusBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CyberCard>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section>
          <SectionTitle icon={<Building2 className="size-4" />}>
            Datos del gimnasio
          </SectionTitle>
          <CyberCard glow="blue" className="space-y-4">
            <Field label="Nombre">
              <p className="text-sm font-semibold text-foreground">{gymInfo.nombre}</p>
            </Field>
            <Field label="Ubicación">
              <p className="flex items-center gap-2 text-sm text-foreground">
                <MapPin className="size-4 text-accent" /> {gymInfo.direccion}
              </p>
            </Field>
            <Field label="Teléfono">
              <p className="flex items-center gap-2 text-sm text-foreground">
                <Phone className="size-4 text-accent" /> {gymInfo.telefono}
              </p>
            </Field>
            <Field label="Correo">
              <p className="flex items-center gap-2 text-sm text-foreground">
                <Mail className="size-4 text-accent" /> {gymInfo.correo}
              </p>
            </Field>
            <Field label="Horarios">
              <p className="flex items-center gap-2 text-sm text-foreground">
                <Clock3 className="size-4 text-accent" /> {gymInfo.horarios}
              </p>
            </Field>
          </CyberCard>
        </section>

        <section>
          <SectionTitle icon={<BookOpen className="size-4" />}>
            Reglamento interno
          </SectionTitle>
          <CyberCard glow="purple" className="space-y-3">
            {gymRules.map((rule, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-foreground">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{rule}</span>
              </div>
            ))}
          </CyberCard>
        </section>
      </div>
    </div>
  )
}
