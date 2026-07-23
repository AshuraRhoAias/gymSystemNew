// Mock data for the Deportivo Morelos portal prototype.
// All content is static and lives client-side for demo purposes.

export type Membership = {
  tipo: string
  estatus: "activa" | "vencida" | "por-vencer"
  inicio: string
  vencimiento: string
  diasRestantes: number
}

export type Trainer = {
  id: string
  nombre: string
  especialidad: string
  horario: string
  foto: string
  certificacion: string
}

export type Exercise = {
  nombre: string
  series: number
  reps: string
  peso: string
  descanso: string
  nota?: string
}

export type RoutineDay = {
  dia: string
  enfoque: string
  ejercicios: Exercise[]
}

export type Routine = {
  nombre: string
  asignada: string
  proximaRevision: string
  entrenador: string
  dias: RoutineDay[]
}

export type WeightPoint = { fecha: string; peso: number; grasa: number }

export type PR = { ejercicio: string; peso: number; fecha: string; anterior: number }

export type Measurement = { zona: string; actual: number; anterior: number; unidad: string }

export const currentMember = {
  id: "DM-0428",
  nombre: "Carlos Mendoza",
  foto: "/members/carlos.png",
  disciplina: "Musculación",
  desde: "Mar 2024",
  edad: 28,
  racha: 12,
  cumplimientoMes: 86,
}

export const currentMembership: Membership = {
  tipo: "Mensual Premium",
  estatus: "activa",
  inicio: "01 Jul 2026",
  vencimiento: "01 Ago 2026",
  diasRestantes: 10,
}

export const assignedTrainer: Trainer = {
  id: "ENT-07",
  nombre: "Valeria Ríos",
  especialidad: "Fuerza e Hipertrofia",
  horario: "Lun–Vie · 07:00–15:00",
  foto: "/trainers/valeria.png",
  certificacion: "NSCA-CPT · Nivel 2",
}

export const myRoutine: Routine = {
  nombre: "Fuerza · Semana 4",
  asignada: "01 Jul 2026",
  proximaRevision: "29 Jul 2026",
  entrenador: "Valeria Ríos",
  dias: [
    {
      dia: "Lunes",
      enfoque: "Pecho / Tríceps",
      ejercicios: [
        { nombre: "Press banca", series: 4, reps: "6-8", peso: "70 kg", descanso: "120s", nota: "Controla la fase negativa" },
        { nombre: "Press inclinado mancuernas", series: 3, reps: "8-10", peso: "26 kg", descanso: "90s" },
        { nombre: "Aperturas en polea", series: 3, reps: "12-15", peso: "15 kg", descanso: "60s" },
        { nombre: "Fondos en paralelas", series: 3, reps: "Al fallo", peso: "Peso libre", descanso: "90s" },
        { nombre: "Extensión tríceps cuerda", series: 4, reps: "12", peso: "20 kg", descanso: "60s" },
      ],
    },
    {
      dia: "Martes",
      enfoque: "Espalda / Bíceps",
      ejercicios: [
        { nombre: "Dominadas lastradas", series: 4, reps: "6-8", peso: "+10 kg", descanso: "120s", nota: "Rango completo" },
        { nombre: "Remo con barra", series: 4, reps: "8", peso: "60 kg", descanso: "90s" },
        { nombre: "Jalón al pecho", series: 3, reps: "10-12", peso: "50 kg", descanso: "75s" },
        { nombre: "Curl con barra Z", series: 3, reps: "10", peso: "30 kg", descanso: "60s" },
        { nombre: "Curl martillo", series: 3, reps: "12", peso: "14 kg", descanso: "60s" },
      ],
    },
    {
      dia: "Jueves",
      enfoque: "Pierna completa",
      ejercicios: [
        { nombre: "Sentadilla libre", series: 5, reps: "5", peso: "100 kg", descanso: "150s", nota: "Sube el peso 2.5 kg" },
        { nombre: "Peso muerto rumano", series: 4, reps: "8", peso: "80 kg", descanso: "120s" },
        { nombre: "Prensa 45°", series: 3, reps: "12", peso: "160 kg", descanso: "90s" },
        { nombre: "Curl femoral", series: 3, reps: "12-15", peso: "40 kg", descanso: "60s" },
        { nombre: "Elevación de gemelos", series: 4, reps: "15", peso: "50 kg", descanso: "45s" },
      ],
    },
    {
      dia: "Viernes",
      enfoque: "Hombro / Core",
      ejercicios: [
        { nombre: "Press militar", series: 4, reps: "6-8", peso: "45 kg", descanso: "120s" },
        { nombre: "Elevaciones laterales", series: 4, reps: "15", peso: "10 kg", descanso: "45s", nota: "Sin balanceo" },
        { nombre: "Pájaros posteriores", series: 3, reps: "15", peso: "8 kg", descanso: "45s" },
        { nombre: "Plancha con peso", series: 3, reps: "45s", peso: "10 kg", descanso: "60s" },
        { nombre: "Rueda abdominal", series: 3, reps: "12", peso: "Peso libre", descanso: "60s" },
      ],
    },
  ],
}

export const routineHistory = [
  { nombre: "Volumen · Semana 1-3", periodo: "May – Jun 2026", enfoque: "Hipertrofia general" },
  { nombre: "Base · Adaptación", periodo: "Abr 2026", enfoque: "Técnica y movilidad" },
  { nombre: "Inicio · Full body", periodo: "Mar 2024", enfoque: "Acondicionamiento" },
]

export const weightHistory: WeightPoint[] = [
  { fecha: "Feb", peso: 82.4, grasa: 22.1 },
  { fecha: "Mar", peso: 81.2, grasa: 20.8 },
  { fecha: "Abr", peso: 80.1, grasa: 19.4 },
  { fecha: "May", peso: 79.3, grasa: 18.2 },
  { fecha: "Jun", peso: 78.6, grasa: 16.9 },
  { fecha: "Jul", peso: 78.0, grasa: 15.8 },
]

export const personalRecords: PR[] = [
  { ejercicio: "Sentadilla", peso: 100, anterior: 92.5, fecha: "18 Jul 2026" },
  { ejercicio: "Press banca", peso: 72.5, anterior: 70, fecha: "14 Jul 2026" },
  { ejercicio: "Peso muerto", peso: 130, anterior: 122.5, fecha: "11 Jul 2026" },
  { ejercicio: "Press militar", peso: 47.5, anterior: 45, fecha: "05 Jul 2026" },
]

export const measurements: Measurement[] = [
  { zona: "Cintura", actual: 84, anterior: 89, unidad: "cm" },
  { zona: "Brazo", actual: 38, anterior: 36, unidad: "cm" },
  { zona: "Pecho", actual: 104, anterior: 101, unidad: "cm" },
  { zona: "Pierna", actual: 58, anterior: 55, unidad: "cm" },
]

export const goals = [
  { meta: "Bajar a 76 kg", progreso: 72, fecha: "Sep 2026" },
  { meta: "Sentadilla 110 kg", progreso: 60, fecha: "Ago 2026" },
  { meta: "15% grasa corporal", progreso: 88, fecha: "Ago 2026" },
]

export const trainerNotes = [
  { fecha: "18 Jul 2026", texto: "Excelente semana. Aumentar carga en sentadilla y cuidar la técnica en press banca." },
  { fecha: "04 Jul 2026", texto: "Buena adherencia. Sumar trabajo de core al final de cada sesión." },
  { fecha: "20 Jun 2026", texto: "Mejoró la movilidad de cadera. Listo para fase de fuerza." },
]

// ---- Trainer view data ----

export const trainerProfile = {
  nombre: "Valeria Ríos",
  foto: "/trainers/valeria.png",
  especialidad: "Fuerza e Hipertrofia",
  alumnosActivos: 14,
  revisionesPendientes: 3,
  rutinasActivas: 12,
}

export type Student = {
  id: string
  nombre: string
  foto: string
  disciplina: string
  rutina: string
  cumplimiento: number
  estatus: "activa" | "vencida" | "por-vencer"
  ultimaRevision: string
  proximaRevision: string
  alerta?: string
  notaPrivada: string
}

export const students: Student[] = [
  {
    id: "DM-0428",
    nombre: "Carlos Mendoza",
    foto: "/members/carlos.png",
    disciplina: "Musculación",
    rutina: "Fuerza · Semana 4",
    cumplimiento: 86,
    estatus: "activa",
    ultimaRevision: "18 Jul 2026",
    proximaRevision: "29 Jul 2026",
    notaPrivada: "Muy constante. Progresa rápido en tren inferior.",
  },
  {
    id: "DM-0511",
    nombre: "Mariana Torres",
    foto: "/members/mariana.png",
    disciplina: "Funcional",
    rutina: "Acondicionamiento · S2",
    cumplimiento: 94,
    estatus: "activa",
    ultimaRevision: "16 Jul 2026",
    proximaRevision: "30 Jul 2026",
    notaPrivada: "Alta motivación. Considerar sumar fuerza.",
  },
  {
    id: "DM-0333",
    nombre: "Diego Salas",
    foto: "/members/diego.png",
    disciplina: "Musculación",
    rutina: "Volumen · Semana 6",
    cumplimiento: 61,
    estatus: "por-vencer",
    ultimaRevision: "02 Jul 2026",
    proximaRevision: "23 Jul 2026",
    alerta: "Revisión vencida",
    notaPrivada: "Ha faltado 2 semanas. Contactar para reagendar.",
  },
  {
    id: "DM-0620",
    nombre: "Sofía Núñez",
    foto: "/members/sofia.png",
    disciplina: "Yoga / Movilidad",
    rutina: "Movilidad · S1",
    cumplimiento: 78,
    estatus: "activa",
    ultimaRevision: "12 Jul 2026",
    proximaRevision: "26 Jul 2026",
    notaPrivada: "Trabajar estabilidad de hombro. Progresa bien.",
  },
]

export const evaluationHistory = [
  { fecha: "18 Jul 2026", peso: "78.0 kg", grasa: "15.8%", comentario: "PR en sentadilla. Subir carga progresiva." },
  { fecha: "04 Jul 2026", peso: "78.6 kg", grasa: "16.9%", comentario: "Buen ritmo, agregar core." },
  { fecha: "20 Jun 2026", peso: "79.3 kg", grasa: "18.2%", comentario: "Mejora en movilidad de cadera." },
]

// ================= ADMIN / RECEPCIÓN =================

export const dashboardStats = {
  miembrosActivos: 342,
  inscripcionesHoy: 7,
  pagosPendientes: 23,
  asistenciasHoy: 128,
  ingresosMes: 184500,
  metaMes: 220000,
}

export const attendanceByHour = [
  { hora: "06h", personas: 18 },
  { hora: "08h", personas: 32 },
  { hora: "10h", personas: 21 },
  { hora: "12h", personas: 14 },
  { hora: "14h", personas: 9 },
  { hora: "16h", personas: 16 },
  { hora: "18h", personas: 41 },
  { hora: "20h", personas: 37 },
]

export const revenueByMonth = [
  { mes: "Feb", ingresos: 142000 },
  { mes: "Mar", ingresos: 156000 },
  { mes: "Abr", ingresos: 149500 },
  { mes: "May", ingresos: 171000 },
  { mes: "Jun", ingresos: 178200 },
  { mes: "Jul", ingresos: 184500 },
]

export type MemberRow = {
  id: string
  nombre: string
  foto: string
  disciplina: string
  membresia: string
  estatus: "activa" | "vencida" | "por-vencer"
  vencimiento: string
  docsCompletos: boolean
}

export const membersDirectory: MemberRow[] = [
  { id: "DM-0428", nombre: "Carlos Mendoza", foto: "/members/carlos.png", disciplina: "Musculación", membresia: "Mensual Premium", estatus: "activa", vencimiento: "01 Ago 2026", docsCompletos: true },
  { id: "DM-0511", nombre: "Mariana Torres", foto: "/members/mariana.png", disciplina: "Funcional", membresia: "Mensual", estatus: "activa", vencimiento: "12 Ago 2026", docsCompletos: true },
  { id: "DM-0333", nombre: "Diego Salas", foto: "/members/diego.png", disciplina: "Musculación", membresia: "Mensual", estatus: "por-vencer", vencimiento: "24 Jul 2026", docsCompletos: false },
  { id: "DM-0620", nombre: "Sofía Núñez", foto: "/members/sofia.png", disciplina: "Yoga / Movilidad", membresia: "Becado", estatus: "activa", vencimiento: "30 Jul 2026", docsCompletos: true },
  { id: "DM-0299", nombre: "Luis Herrera", foto: "/members/diego.png", disciplina: "Funcional", membresia: "Visita", estatus: "vencida", vencimiento: "05 Jul 2026", docsCompletos: false },
]

export type Payment = {
  id: string
  miembro: string
  concepto: string
  monto: number
  metodo: "Efectivo" | "Transferencia"
  fecha: string
  estatus: "pagado" | "pendiente" | "vencido"
}

export const payments: Payment[] = [
  { id: "P-2041", miembro: "Carlos Mendoza", concepto: "Mensualidad", monto: 650, metodo: "Transferencia", fecha: "01 Jul 2026", estatus: "pagado" },
  { id: "P-2040", miembro: "Mariana Torres", concepto: "Mensualidad", monto: 500, metodo: "Efectivo", fecha: "12 Jul 2026", estatus: "pagado" },
  { id: "P-2039", miembro: "Diego Salas", concepto: "Mensualidad", monto: 500, metodo: "Efectivo", fecha: "24 Jun 2026", estatus: "pendiente" },
  { id: "P-2038", miembro: "Luis Herrera", concepto: "Visita", monto: 50, metodo: "Efectivo", fecha: "05 Jul 2026", estatus: "vencido" },
  { id: "P-2037", miembro: "Sofía Núñez", concepto: "Inscripción", monto: 300, metodo: "Transferencia", fecha: "28 Jun 2026", estatus: "pagado" },
]

export const membershipTypes = [
  { tipo: "Mensual Premium", precio: 650, desc: "Acceso total + clases + evaluación" },
  { tipo: "Mensual", precio: 500, desc: "Acceso a área de pesas y funcional" },
  { tipo: "Becado", precio: 250, desc: "Tarifa reducida con convenio" },
  { tipo: "Visita", precio: 50, desc: "Acceso por día" },
]

export type AttendanceLog = {
  id: string
  miembro: string
  foto: string
  entrada: string
  salida: string | null
  metodo: "Huella" | "QR" | "Manual"
  docAlerta?: boolean
}

export const attendanceToday: AttendanceLog[] = [
  { id: "DM-0428", miembro: "Carlos Mendoza", foto: "/members/carlos.png", entrada: "07:12", salida: "08:45", metodo: "Huella" },
  { id: "DM-0511", miembro: "Mariana Torres", foto: "/members/mariana.png", entrada: "08:03", salida: null, metodo: "QR" },
  { id: "DM-0333", miembro: "Diego Salas", foto: "/members/diego.png", entrada: "09:20", salida: "10:40", metodo: "Manual", docAlerta: true },
  { id: "DM-0620", miembro: "Sofía Núñez", foto: "/members/sofia.png", entrada: "18:05", salida: null, metodo: "Huella" },
]

export type Instructor = {
  id: string
  nombre: string
  foto: string
  especialidad: string
  horario: string
  certificacion: string
  alumnos: number
  docsCompletos: boolean
}

export const instructors: Instructor[] = [
  { id: "ENT-07", nombre: "Valeria Ríos", foto: "/trainers/valeria.png", especialidad: "Fuerza e Hipertrofia", horario: "Lun–Vie · 07:00–15:00", certificacion: "NSCA-CPT · Nivel 2", alumnos: 14, docsCompletos: true },
  { id: "ENT-03", nombre: "Marco Aguilar", foto: "/members/diego.png", especialidad: "Entrenamiento Funcional", horario: "Lun–Sáb · 15:00–21:00", certificacion: "CrossFit L2", alumnos: 21, docsCompletos: true },
  { id: "ENT-11", nombre: "Paola Vega", foto: "/members/mariana.png", especialidad: "Yoga y Movilidad", horario: "Mar–Jue · 09:00–13:00", certificacion: "RYT-500", alumnos: 9, docsCompletos: false },
]

export const reportDocsPending = [
  { miembro: "Diego Salas", falta: "Certificado médico", plazo: "Vencido hace 4 días" },
  { miembro: "Luis Herrera", falta: "Identificación oficial", plazo: "Vencido hace 12 días" },
  { miembro: "Paola Vega", falta: "Certificación actualizada", plazo: "Vence en 3 días" },
]

export const reportByDiscipline = [
  { disciplina: "Musculación", miembros: 168 },
  { disciplina: "Funcional", miembros: 96 },
  { disciplina: "Yoga / Movilidad", miembros: 44 },
  { disciplina: "Otros", miembros: 34 },
]

export type NotificationTemplate = {
  id: string
  nombre: string
  tipo: string
  mensaje: string
}

export const notificationTemplates: NotificationTemplate[] = [
  { id: "T1", nombre: "Bienvenida", tipo: "Alta de miembro", mensaje: "¡Bienvenido al Deportivo Morelos, {nombre}! Tu membresía está activa. Cualquier duda estamos para ayudarte." },
  { id: "T2", nombre: "Recordatorio de pago", tipo: "Cobranza", mensaje: "Hola {nombre}, tu mensualidad vence el {fecha}. Puedes pagar en recepción o por transferencia." },
  { id: "T3", nombre: "Documentación pendiente", tipo: "Documentos", mensaje: "Hola {nombre}, nos falta tu {documento} para completar tu expediente. Tráelo en tu próxima visita." },
  { id: "T4", nombre: "Hoja rosa lista", tipo: "Avisos", mensaje: "Hola {nombre}, tu hoja rosa ya está lista para recoger en recepción." },
]

export const notificationHistory = [
  { miembro: "Carlos Mendoza", plantilla: "Recordatorio de pago", fecha: "28 Jul 2026 · 10:14", estatus: "Enviado" },
  { miembro: "Diego Salas", plantilla: "Documentación pendiente", fecha: "27 Jul 2026 · 17:02", estatus: "Enviado" },
  { miembro: "Sofía Núñez", plantilla: "Bienvenida", fecha: "26 Jul 2026 · 09:30", estatus: "Enviado" },
  { miembro: "Luis Herrera", plantilla: "Recordatorio de pago", fecha: "25 Jul 2026 · 12:45", estatus: "Fallido" },
]

export type SystemUser = {
  id: string
  nombre: string
  correo: string
  rol: "Admin" | "Recepción" | "Entrenador"
  estatus: "activo" | "inactivo"
}

export const systemUsers: SystemUser[] = [
  { id: "U-01", nombre: "Roberto Díaz", correo: "roberto@dmorelos.mx", rol: "Admin", estatus: "activo" },
  { id: "U-02", nombre: "Ana Castillo", correo: "ana@dmorelos.mx", rol: "Recepción", estatus: "activo" },
  { id: "U-03", nombre: "Valeria Ríos", correo: "valeria@dmorelos.mx", rol: "Entrenador", estatus: "activo" },
  { id: "U-04", nombre: "Marco Aguilar", correo: "marco@dmorelos.mx", rol: "Entrenador", estatus: "inactivo" },
]

export const gymInfo = {
  nombre: "Deportivo Morelos",
  direccion: "Av. Morelos 214, Centro, Cuernavaca, Mor.",
  telefono: "777 123 4567",
  correo: "hola@dmorelos.mx",
  horarios: "Lun–Vie 06:00–22:00 · Sáb 07:00–15:00 · Dom cerrado",
}

export const gymRules = [
  "Uso obligatorio de toalla y calzado deportivo limpio dentro de las áreas.",
  "Guarda el equipo y descarga las barras al terminar cada ejercicio.",
  "Respeta los tiempos de uso de máquinas en horas de alta demanda.",
  "Mantén tu documentación (identificación y certificado médico) al día.",
  "Prohibido el ingreso con alimentos al área de entrenamiento.",
]

export const estadosMexico = [
  "Aguascalientes", "Baja California", "Baja California Sur", "Campeche",
  "Chiapas", "Chihuahua", "Ciudad de México", "Coahuila", "Colima", "Durango",
  "Estado de México", "Guanajuato", "Guerrero", "Hidalgo", "Jalisco",
  "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca", "Puebla",
  "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa", "Sonora",
  "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas",
]

export const diasSemana = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]

export const cartaResponsivaTexto = `Yo, el suscrito, manifiesto que ingreso de forma voluntaria a las instalaciones de ${gymInfo.nombre} para practicar la disciplina que he seleccionado en este documento. Declaro bajo protesta de decir verdad que me encuentro en condiciones físicas y de salud adecuadas para realizar actividad física, y que he informado con veracidad cualquier padecimiento, lesión, alergia o medicamento que pudiera representar un riesgo durante el entrenamiento.

Entiendo que la actividad física conlleva un riesgo inherente de lesión y libero a ${gymInfo.nombre}, a su personal, entrenadores e instructores de cualquier responsabilidad derivada de accidentes ocasionados por el mal uso del equipo, el incumplimiento del reglamento interno, o por condiciones de salud no declaradas por el suscrito.

Me comprometo a seguir las indicaciones del personal y entrenadores, a utilizar el equipo de forma adecuada y a presentar la documentación médica que me sea requerida. En caso de ser menor de edad, el presente documento deberá ser firmado también por mi padre, madre o tutor legal, quien asume conjuntamente la responsabilidad aquí descrita.

Al aceptar esta carta responsiva, confirmo que he leído, entendido y acepto en su totalidad los términos aquí expuestos.`

export const reglamentoInternoTexto = `1. Horarios de acceso. El acceso a las instalaciones se permite únicamente dentro de los horarios publicados. ${gymInfo.horarios}.

2. Documentación. Todo miembro debe mantener vigente su identificación oficial y, cuando aplique, su certificado médico. La documentación pendiente cuenta con un plazo de 1 semana para ser entregada, con posibilidad de prórroga de hasta 2 semanas adicionales a criterio de la administración.

3. Higiene y vestimenta. Es obligatorio el uso de toalla y calzado deportivo limpio dentro de las áreas de entrenamiento. Se prohíbe el ingreso con alimentos al área de pesas y funcional.

4. Uso del equipo. Cada usuario debe guardar el equipo, descargar las barras y limpiar las superficies de contacto al terminar cada ejercicio. El mal uso o daño intencional del equipo será responsabilidad del usuario.

5. Conducta. Se espera un trato respetuoso hacia el personal, entrenadores y demás miembros. ${gymInfo.nombre} se reserva el derecho de admisión y permanencia ante conductas inapropiadas.

6. Menores de edad. Los menores de edad deberán ingresar acompañados o con autorización expresa de su padre, madre o tutor, quien deberá firmar la carta responsiva correspondiente.

7. Control de acceso. El registro de entrada y salida (huella, QR o manual) es obligatorio para todos los miembros como medida de seguridad y control de aforo.

Al marcar la casilla de aceptación, el usuario confirma que conoce y acepta este reglamento interno en su totalidad, quedando dicho consentimiento registrado con fecha y hora para respaldo administrativo.`
