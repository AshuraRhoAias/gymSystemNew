"use client"

import { useMemo, useState } from "react"
import {
  BadgeCheck,
  CalendarDays,
  Camera,
  Contact,
  Fingerprint,
  FileText,
  HeartPulse,
  IdCard,
  PenLine,
  Save,
  ScrollText,
  ShieldAlert,
  ShieldCheck,
  UserPlus,
  Users,
} from "lucide-react"
import {
  CyberCard,
  CyberInput,
  CyberSelect,
  CyberTextarea,
  Field,
  SectionTitle,
} from "@/components/cyber-ui"
import { cn } from "@/lib/utils"
import {
  cartaResponsivaTexto,
  diasSemana,
  estadosMexico,
  gymInfo,
  membershipTypes,
  reglamentoInternoTexto,
} from "@/lib/mock-data"

const nextRegistro = "DM-0429"
const hoy = new Date().toLocaleDateString("es-MX", { day: "2-digit", month: "short", year: "numeric" })

function UploadTile({
  label,
  icon,
  hint,
}: {
  label: string
  icon: React.ReactNode
  hint: string
}) {
  return (
    <button
      type="button"
      className="flex w-full flex-col items-center gap-2 rounded-xl border border-dashed border-primary/40 bg-muted/30 p-5 text-center transition-colors hover:border-accent/60 hover:bg-muted/50"
    >
      <span className="grid size-11 place-items-center rounded-xl bg-primary/15 text-primary">
        {icon}
      </span>
      <span className="text-sm font-semibold text-foreground">{label}</span>
      <span className="text-xs text-muted-foreground">{hint}</span>
    </button>
  )
}

function LegalBox({ text }: { text: string }) {
  return (
    <div className="max-h-40 overflow-y-auto rounded-xl border border-border bg-background/50 p-3 text-xs leading-relaxed text-muted-foreground">
      {text.split("\n\n").map((p, i) => (
        <p key={i} className={i > 0 ? "mt-2" : undefined}>
          {p}
        </p>
      ))}
    </div>
  )
}

export default function RegistroPage() {
  const [saved, setSaved] = useState(false)
  const [disciplina, setDisciplina] = useState("Musculación")
  const [dias, setDias] = useState<string[]>(["Lun", "Mié", "Vie"])
  const [esMenorDeEdad, setEsMenorDeEdad] = useState(false)
  const [docStatus, setDocStatus] = useState<"completa" | "pendiente">("pendiente")

  const [aceptaCarta, setAceptaCarta] = useState(false)
  const [firmaCarta, setFirmaCarta] = useState("")
  const [fechaAceptacionCarta, setFechaAceptacionCarta] = useState("")

  const [aceptaReglamento, setAceptaReglamento] = useState(false)
  const [fechaAceptacionReglamento, setFechaAceptacionReglamento] = useState("")

  const toggleDia = (dia: string) => {
    setDias((prev) => (prev.includes(dia) ? prev.filter((d) => d !== dia) : [...prev, dia]))
  }

  const puedeGuardar = useMemo(
    () => aceptaCarta && firmaCarta.trim().length > 0 && aceptaReglamento,
    [aceptaCarta, firmaCarta, aceptaReglamento],
  )

  return (
    <form
      className="space-y-8"
      onSubmit={(e) => {
        e.preventDefault()
        if (!puedeGuardar) return
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      }}
    >
      <header className="flex flex-col gap-1">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          Alta de miembro
        </p>
        <h1 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground neon-text lg:text-3xl">
          Registro de nuevo miembro
        </h1>
        <p className="text-sm text-muted-foreground">
          Captura los datos, la carta responsiva y el reglamento interno para generar el expediente.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Datos de registro */}
          <div>
            <SectionTitle icon={<CalendarDays className="size-4" />}>
              Datos de registro
            </SectionTitle>
            <CyberCard className="grid gap-4 sm:grid-cols-2">
              <Field label="No. de registro">
                <CyberInput value={nextRegistro} readOnly />
              </Field>
              <Field label="Fecha de inscripción">
                <CyberInput type="date" defaultValue={new Date().toISOString().slice(0, 10)} />
              </Field>
              <Field label="Actividad / disciplina">
                <CyberSelect value={disciplina} onChange={(e) => setDisciplina(e.target.value)}>
                  <option>Musculación</option>
                  <option>Funcional</option>
                  <option>Yoga / Movilidad</option>
                  <option>CrossFit</option>
                </CyberSelect>
              </Field>
              <Field label="Horario">
                <CyberInput placeholder="Ej. 07:00 - 09:00" />
              </Field>
              <Field label="Días" className="sm:col-span-2">
                <div className="flex flex-wrap gap-2">
                  {diasSemana.map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => toggleDia(d)}
                      className={cn(
                        "rounded-lg border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors",
                        dias.includes(d)
                          ? "border-primary/60 bg-primary/15 text-foreground glow-purple"
                          : "border-border bg-muted/30 text-muted-foreground hover:bg-muted/50",
                      )}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </Field>
            </CyberCard>
          </div>

          {/* Datos del usuario */}
          <div>
            <SectionTitle icon={<UserPlus className="size-4" />}>
              Datos del usuario
            </SectionTitle>
            <CyberCard className="grid gap-4 sm:grid-cols-2">
              <Field label="Nombre(s)">
                <CyberInput placeholder="Nombre(s)" required />
              </Field>
              <Field label="Apellido paterno">
                <CyberInput placeholder="Apellido paterno" required />
              </Field>
              <Field label="Apellido materno">
                <CyberInput placeholder="Apellido materno" />
              </Field>
              <Field label="Fecha de nacimiento">
                <CyberInput type="date" />
              </Field>
              <Field label="CURP">
                <CyberInput placeholder="18 caracteres" maxLength={18} className="uppercase" />
              </Field>
              <Field label="Edad">
                <CyberInput type="number" placeholder="28" />
              </Field>
              <Field label="Entidad federativa">
                <CyberSelect defaultValue="">
                  <option value="" disabled>
                    Selecciona
                  </option>
                  {estadosMexico.map((e) => (
                    <option key={e}>{e}</option>
                  ))}
                </CyberSelect>
              </Field>
              <Field label="Sexo">
                <CyberSelect defaultValue="">
                  <option value="" disabled>
                    Selecciona
                  </option>
                  <option>Femenino</option>
                  <option>Masculino</option>
                  <option>Otro</option>
                </CyberSelect>
              </Field>
              <Field label="Calle, número, colonia, alcaldía" className="sm:col-span-2">
                <CyberInput placeholder="Dirección completa" />
              </Field>
              <Field label="Teléfono">
                <CyberInput type="tel" placeholder="777 123 4567" />
              </Field>
              <Field label="Celular">
                <CyberInput type="tel" placeholder="777 123 4567" />
              </Field>
              <Field label="Correo electrónico" className="sm:col-span-2">
                <CyberInput type="email" placeholder="tu@correo.mx" />
              </Field>
            </CyberCard>
          </div>

          {/* Información médica */}
          <div>
            <SectionTitle icon={<HeartPulse className="size-4" />}>
              Información médica
            </SectionTitle>
            <CyberCard className="grid gap-4 sm:grid-cols-2">
              <Field label="Padecimiento o medicamento que toma" hint="Especificar, si aplica">
                <CyberTextarea placeholder="Especificar..." />
              </Field>
              <Field label="Alergias" hint="Especificar, si aplica">
                <CyberTextarea placeholder="Especificar..." />
              </Field>
            </CyberCard>
          </div>

          {/* Membresía */}
          <div>
            <SectionTitle icon={<CalendarDays className="size-4" />}>
              Membresía
            </SectionTitle>
            <CyberCard className="grid gap-4 sm:grid-cols-2">
              <Field label="Tipo de membresía">
                <CyberSelect defaultValue="Mensual">
                  {membershipTypes.map((m) => (
                    <option key={m.tipo}>
                      {m.tipo} · ${m.precio}
                    </option>
                  ))}
                </CyberSelect>
              </Field>
              <Field label="Entrenador asignado">
                <CyberSelect defaultValue="">
                  <option value="" disabled>
                    Sin asignar
                  </option>
                  <option>Valeria Ríos</option>
                  <option>Marco Aguilar</option>
                  <option>Paola Vega</option>
                </CyberSelect>
              </Field>
            </CyberCard>
          </div>

          {/* Contacto emergencia */}
          <div>
            <SectionTitle icon={<ShieldAlert className="size-4" />}>
              Contacto de emergencia
            </SectionTitle>
            <CyberCard className="grid gap-4 sm:grid-cols-2">
              <Field label="Nombre a quién llamar">
                <CyberInput placeholder="Nombre completo" />
              </Field>
              <Field label="Teléfono">
                <CyberInput type="tel" placeholder="777 000 0000" />
              </Field>
              <Field label="Celular">
                <CyberInput type="tel" placeholder="777 000 0000" />
              </Field>
              <Field label="Correo electrónico">
                <CyberInput type="email" placeholder="contacto@correo.mx" />
              </Field>
            </CyberCard>
          </div>

          {/* Menor de edad */}
          <div>
            <SectionTitle icon={<Users className="size-4" />}>
              Menor de edad
            </SectionTitle>
            <CyberCard className="space-y-4">
              <label className="flex items-center gap-2 text-sm text-foreground">
                <input
                  type="checkbox"
                  checked={esMenorDeEdad}
                  onChange={(e) => setEsMenorDeEdad(e.target.checked)}
                  className="size-4 rounded border-input accent-primary"
                />
                El nuevo miembro es menor de edad
              </label>
              {esMenorDeEdad ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Nombre y firma de quien recepciona">
                    <CyberInput placeholder="Nombre de quien recibe el registro" />
                  </Field>
                  <Field label="Nombre y firma del tutor">
                    <CyberInput placeholder="Nombre del padre, madre o tutor" required />
                  </Field>
                </div>
              ) : null}
            </CyberCard>
          </div>

          {/* Carta responsiva */}
          <div>
            <SectionTitle icon={<ScrollText className="size-4" />}>
              Carta responsiva
            </SectionTitle>
            <CyberCard glow="purple" className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Instalación deportiva">
                  <CyberInput value={gymInfo.nombre} readOnly />
                </Field>
                <Field label="Disciplina a practicar">
                  <CyberInput value={disciplina} readOnly />
                </Field>
              </div>
              <LegalBox text={cartaResponsivaTexto} />
              <label className="flex items-start gap-2 text-sm text-foreground">
                <input
                  type="checkbox"
                  checked={aceptaCarta}
                  onChange={(e) => {
                    setAceptaCarta(e.target.checked)
                    setFechaAceptacionCarta(e.target.checked ? new Date().toLocaleString("es-MX") : "")
                  }}
                  required
                  className="mt-0.5 size-4 rounded border-input accent-primary"
                />
                He leído y acepto los términos y condiciones de la carta responsiva.
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Firma digital (nombre completo)">
                  <div className="flex items-center gap-2 rounded-xl border border-input bg-muted/40 px-3 py-2.5 focus-within:border-accent/70">
                    <PenLine className="size-4 text-accent" />
                    <input
                      value={firmaCarta}
                      onChange={(e) => setFirmaCarta(e.target.value)}
                      placeholder="Firma al calce"
                      className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                    />
                  </div>
                </Field>
                <Field label="Fecha de aceptación">
                  <CyberInput value={fechaAceptacionCarta || "Pendiente de firma"} readOnly />
                </Field>
              </div>
            </CyberCard>
          </div>

          {/* Reglamento interno */}
          <div>
            <SectionTitle icon={<ShieldCheck className="size-4" />}>
              Reglamento interno
            </SectionTitle>
            <CyberCard glow="blue" className="space-y-4">
              <LegalBox text={reglamentoInternoTexto} />
              <label className="flex items-start gap-2 text-sm text-foreground">
                <input
                  type="checkbox"
                  checked={aceptaReglamento}
                  onChange={(e) => {
                    setAceptaReglamento(e.target.checked)
                    setFechaAceptacionReglamento(e.target.checked ? new Date().toLocaleString("es-MX") : "")
                  }}
                  required
                  className="mt-0.5 size-4 rounded border-input accent-primary"
                />
                Conozco y acepto el reglamento interno.
              </label>
              <Field label="Registro de fecha y hora de aceptación" hint="Respaldo administrativo">
                <CyberInput value={fechaAceptacionReglamento || "Pendiente de aceptación"} readOnly />
              </Field>
            </CyberCard>
          </div>
        </div>

        {/* Documentos y biometría */}
        <div className="space-y-6">
          <div>
            <SectionTitle icon={<Camera className="size-4" />}>
              Foto y biometría
            </SectionTitle>
            <CyberCard className="space-y-4">
              <UploadTile
                label="Foto del usuario"
                icon={<Camera className="size-5" />}
                hint="Credencial / reconocimiento facial"
              />
              <UploadTile
                label="Huella dactilar"
                icon={<Fingerprint className="size-5" />}
                hint="Control de acceso"
              />
            </CyberCard>
          </div>

          <div>
            <SectionTitle icon={<FileText className="size-4" />}>
              Documentación
            </SectionTitle>
            <CyberCard className="space-y-4">
              <UploadTile
                label="Identificación oficial"
                icon={<IdCard className="size-5" />}
                hint="INE, pasaporte o licencia"
              />
              <UploadTile
                label="Certificado médico"
                icon={<HeartPulse className="size-5" />}
                hint="Si aplica"
              />
              <Field label="Estatus de documentación">
                <CyberSelect
                  value={docStatus}
                  onChange={(e) => setDocStatus(e.target.value as "completa" | "pendiente")}
                >
                  <option value="completa">Completa</option>
                  <option value="pendiente">Pendiente</option>
                </CyberSelect>
              </Field>
              {docStatus === "pendiente" ? (
                <p className="flex items-start gap-1.5 rounded-xl border border-amber-400/40 bg-amber-400/10 px-3 py-2 text-xs text-amber-200">
                  <BadgeCheck className="mt-0.5 size-3.5 shrink-0" />
                  Plazo de 1 semana para completar la documentación, con posibilidad de prórroga de hasta 2 semanas adicionales.
                </p>
              ) : null}
            </CyberCard>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-end">
        {saved ? (
          <span className="flex items-center gap-2 text-sm font-semibold text-emerald-300">
            <Contact className="size-4" />
            Miembro registrado correctamente (demo)
          </span>
        ) : !puedeGuardar ? (
          <span className="text-xs text-muted-foreground">
            Acepta la carta responsiva (con firma) y el reglamento interno para continuar.
          </span>
        ) : null}
        <button
          type="submit"
          disabled={!puedeGuardar}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-neon-purple px-6 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-transform hover:scale-[1.01] glow-purple disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 sm:w-auto"
        >
          <Save className="size-4" />
          Guardar miembro
        </button>
      </div>
    </form>
  )
}
