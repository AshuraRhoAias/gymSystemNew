"use client"

import { useState } from "react"
import {
  CalendarDays,
  Camera,
  Contact,
  Fingerprint,
  FileText,
  HeartPulse,
  IdCard,
  Save,
  ShieldAlert,
  UserPlus,
} from "lucide-react"
import {
  CyberCard,
  CyberInput,
  CyberSelect,
  Field,
  SectionTitle,
} from "@/components/cyber-ui"
import { membershipTypes } from "@/lib/mock-data"

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

export default function RegistroPage() {
  const [saved, setSaved] = useState(false)

  return (
    <form
      className="space-y-8"
      onSubmit={(e) => {
        e.preventDefault()
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
          Captura los datos para generar el expediente y la credencial.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Datos personales */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <SectionTitle icon={<UserPlus className="size-4" />}>
              Datos personales
            </SectionTitle>
            <CyberCard className="grid gap-4 sm:grid-cols-2">
              <Field label="Nombre completo" className="sm:col-span-2">
                <CyberInput placeholder="Nombre y apellidos" required />
              </Field>
              <Field label="Fecha de nacimiento">
                <CyberInput type="date" />
              </Field>
              <Field label="Edad">
                <CyberInput type="number" placeholder="28" />
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
              <Field label="Teléfono">
                <CyberInput type="tel" placeholder="777 123 4567" />
              </Field>
              <Field label="Correo electrónico" className="sm:col-span-2">
                <CyberInput type="email" placeholder="tu@correo.mx" />
              </Field>
              <Field label="Dirección (opcional)" className="sm:col-span-2">
                <CyberInput placeholder="Calle, número, colonia, ciudad" />
              </Field>
            </CyberCard>
          </div>

          {/* Membresía */}
          <div>
            <SectionTitle icon={<CalendarDays className="size-4" />}>
              Membresía y actividad
            </SectionTitle>
            <CyberCard className="grid gap-4 sm:grid-cols-2">
              <Field label="Disciplina / actividad">
                <CyberSelect defaultValue="Musculación">
                  <option>Musculación</option>
                  <option>Funcional</option>
                  <option>Yoga / Movilidad</option>
                  <option>CrossFit</option>
                </CyberSelect>
              </Field>
              <Field label="Tipo de membresía">
                <CyberSelect defaultValue="Mensual">
                  {membershipTypes.map((m) => (
                    <option key={m.tipo}>
                      {m.tipo} · ${m.precio}
                    </option>
                  ))}
                </CyberSelect>
              </Field>
              <Field label="Fecha de inscripción">
                <CyberInput type="date" />
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
            <CyberCard className="grid gap-4 sm:grid-cols-3">
              <Field label="Nombre">
                <CyberInput placeholder="Nombre completo" />
              </Field>
              <Field label="Teléfono">
                <CyberInput type="tel" placeholder="777 000 0000" />
              </Field>
              <Field label="Relación">
                <CyberInput placeholder="Familiar, pareja..." />
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
        ) : null}
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-neon-purple px-6 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-transform hover:scale-[1.01] glow-purple sm:w-auto"
        >
          <Save className="size-4" />
          Guardar miembro
        </button>
      </div>
    </form>
  )
}
