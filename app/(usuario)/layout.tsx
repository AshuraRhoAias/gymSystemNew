import { AppShell } from "@/components/app-shell"

export default function UsuarioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AppShell area="usuario">{children}</AppShell>
}
