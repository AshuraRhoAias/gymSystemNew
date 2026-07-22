"use client"

import { useState } from "react"
import { Bell, History, Send } from "lucide-react"
import {
  CyberCard,
  CyberInput,
  CyberSelect,
  CyberTextarea,
  Field,
  SectionTitle,
  StatTile,
  StatusBadge,
} from "@/components/cyber-ui"
import { notificationHistory, notificationTemplates } from "@/lib/mock-data"

export default function NotificacionesPage() {
  const [templateId, setTemplateId] = useState(notificationTemplates[0].id)
  const template =
    notificationTemplates.find((t) => t.id === templateId) ?? notificationTemplates[0]
  const enviados = notificationHistory.filter((n) => n.estatus === "Enviado").length

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-1">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          Comunicación
        </p>
        <h1 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground neon-text lg:text-3xl">
          Notificaciones
        </h1>
        <p className="text-sm text-muted-foreground">
          Plantillas de WhatsApp / avisos y su historial de envío.
        </p>
      </header>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        <StatTile
          label="Plantillas"
          value={notificationTemplates.length}
          icon={<Bell className="size-4" />}
          tone="blue"
        />
        <StatTile
          label="Enviados"
          value={enviados}
          icon={<Send className="size-4" />}
          tone="purple"
        />
        <StatTile
          label="Historial"
          value={notificationHistory.length}
          icon={<History className="size-4" />}
          tone="blue"
        />
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <div>
          <SectionTitle icon={<Send className="size-4" />}>
            Enviar aviso
          </SectionTitle>
          <CyberCard glow="purple" className="space-y-4">
            <Field label="ID de miembro">
              <CyberInput placeholder="DM-0000" defaultValue="DM-0428" />
            </Field>
            <Field label="Plantilla">
              <CyberSelect
                value={templateId}
                onChange={(e) => setTemplateId(e.target.value)}
              >
                {notificationTemplates.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.nombre}
                  </option>
                ))}
              </CyberSelect>
            </Field>
            <Field label="Mensaje" hint="Variables: {nombre}, {fecha}, {documento}">
              <CyberTextarea value={template.mensaje} readOnly />
            </Field>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-neon-purple py-2.5 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-transform hover:scale-[1.01]"
            >
              <Send className="size-4" />
              Enviar mensaje
            </button>
          </CyberCard>
        </div>

        <div className="lg:col-span-2">
          <SectionTitle icon={<History className="size-4" />}>
            Historial de envíos
          </SectionTitle>
          <CyberCard className="overflow-x-auto p-0">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 py-3 font-semibold">Miembro</th>
                  <th className="px-4 py-3 font-semibold">Plantilla</th>
                  <th className="px-4 py-3 font-semibold">Fecha</th>
                  <th className="px-4 py-3 font-semibold">Estatus</th>
                </tr>
              </thead>
              <tbody>
                {notificationHistory.map((n, i) => (
                  <tr
                    key={i}
                    className="border-b border-border/60 last:border-0 hover:bg-muted/30"
                  >
                    <td className="px-4 py-3 font-semibold text-foreground">{n.miembro}</td>
                    <td className="px-4 py-3 text-muted-foreground">{n.plantilla}</td>
                    <td className="px-4 py-3 text-muted-foreground">{n.fecha}</td>
                    <td className="px-4 py-3">
                      <StatusBadge tone={n.estatus === "Enviado" ? "activa" : "vencida"}>
                        {n.estatus}
                      </StatusBadge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CyberCard>
        </div>
      </div>

      <section>
        <SectionTitle icon={<Bell className="size-4" />}>
          Plantillas disponibles
        </SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {notificationTemplates.map((t) => (
            <CyberCard key={t.id} className="space-y-2">
              <StatusBadge tone="blue">{t.tipo}</StatusBadge>
              <p className="font-display text-sm font-bold text-foreground">{t.nombre}</p>
              <p className="text-xs text-muted-foreground">{t.mensaje}</p>
            </CyberCard>
          ))}
        </div>
      </section>
    </div>
  )
}
