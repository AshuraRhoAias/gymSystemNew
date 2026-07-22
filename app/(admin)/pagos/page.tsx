"use client"

import { useState } from "react"
import {
  Banknote,
  CreditCard,
  Receipt,
  Search,
  Wallet,
} from "lucide-react"
import {
  CyberCard,
  CyberInput,
  CyberSelect,
  Field,
  SectionTitle,
  StatTile,
  StatusBadge,
} from "@/components/cyber-ui"
import { membershipTypes, payments } from "@/lib/mock-data"

const currency = (n: number) => `$${n.toLocaleString("es-MX")}`

const statusLabel: Record<string, string> = {
  pagado: "Pagado",
  pendiente: "Pendiente",
  vencido: "Vencido",
}
const statusTone: Record<string, "activa" | "por-vencer" | "vencida"> = {
  pagado: "activa",
  pendiente: "por-vencer",
  vencido: "vencida",
}

export default function PagosPage() {
  const [query, setQuery] = useState("")
  const filtered = payments.filter((p) =>
    p.miembro.toLowerCase().includes(query.toLowerCase()),
  )
  const totalPagado = payments
    .filter((p) => p.estatus === "pagado")
    .reduce((s, p) => s + p.monto, 0)
  const pendientes = payments.filter((p) => p.estatus !== "pagado").length

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-1">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          Cobranza
        </p>
        <h1 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground neon-text lg:text-3xl">
          Pagos y membresías
        </h1>
        <p className="text-sm text-muted-foreground">
          Registra cobros y consulta el historial por miembro.
        </p>
      </header>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        <StatTile
          label="Cobrado (mes)"
          value={currency(totalPagado)}
          icon={<Wallet className="size-4" />}
          tone="blue"
        />
        <StatTile
          label="Pagos pendientes"
          value={pendientes}
          icon={<Receipt className="size-4" />}
          tone="purple"
        />
        <StatTile
          label="Tickets hoy"
          value={payments.length}
          icon={<CreditCard className="size-4" />}
          tone="blue"
        />
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Nuevo cobro */}
        <div>
          <SectionTitle icon={<CreditCard className="size-4" />}>
            Registrar cobro
          </SectionTitle>
          <CyberCard glow="purple" className="space-y-4">
            <Field label="ID de miembro">
              <CyberInput placeholder="DM-0000" defaultValue="DM-0428" />
            </Field>
            <Field label="Tipo de pago">
              <CyberSelect defaultValue="Mensualidad">
                <option>Mensualidad</option>
                <option>Inscripción</option>
                <option>Visita</option>
              </CyberSelect>
            </Field>
            <Field label="Monto">
              <CyberInput type="number" defaultValue={650} />
            </Field>
            <Field label="Método de pago">
              <CyberSelect defaultValue="Efectivo">
                <option>Efectivo</option>
                <option>Transferencia</option>
              </CyberSelect>
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Fecha de pago">
                <CyberInput type="date" />
              </Field>
              <Field label="Vencimiento">
                <CyberInput type="date" />
              </Field>
            </div>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-neon-purple py-2.5 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-transform hover:scale-[1.01]"
            >
              <Banknote className="size-4" />
              Registrar pago
            </button>
          </CyberCard>

          <div className="mt-6">
            <SectionTitle>Tarifas</SectionTitle>
            <CyberCard className="space-y-2">
              {membershipTypes.map((m) => (
                <div
                  key={m.tipo}
                  className="flex items-center justify-between gap-2 rounded-lg border border-border bg-muted/30 px-3 py-2"
                >
                  <div>
                    <p className="text-sm font-semibold text-foreground">{m.tipo}</p>
                    <p className="text-xs text-muted-foreground">{m.desc}</p>
                  </div>
                  <span className="font-display text-sm font-bold text-accent">
                    {currency(m.precio)}
                  </span>
                </div>
              ))}
            </CyberCard>
          </div>
        </div>

        {/* Historial */}
        <div className="lg:col-span-2">
          <SectionTitle icon={<Receipt className="size-4" />}>
            Historial de pagos
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
          <CyberCard className="overflow-x-auto p-0">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 py-3 font-semibold">Folio</th>
                  <th className="px-4 py-3 font-semibold">Miembro</th>
                  <th className="px-4 py-3 font-semibold">Concepto</th>
                  <th className="px-4 py-3 font-semibold">Monto</th>
                  <th className="px-4 py-3 font-semibold">Método</th>
                  <th className="px-4 py-3 font-semibold">Estatus</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b border-border/60 last:border-0 hover:bg-muted/30"
                  >
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                      {p.id}
                    </td>
                    <td className="px-4 py-3 font-semibold text-foreground">
                      {p.miembro}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{p.concepto}</td>
                    <td className="px-4 py-3 font-semibold text-accent">
                      {currency(p.monto)}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{p.metodo}</td>
                    <td className="px-4 py-3">
                      <StatusBadge tone={statusTone[p.estatus]}>
                        {statusLabel[p.estatus]}
                      </StatusBadge>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-8 text-center text-sm text-muted-foreground"
                    >
                      Sin resultados para “{query}”.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </CyberCard>
        </div>
      </div>
    </div>
  )
}
