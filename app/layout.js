import './globals.css'

export const metadata = {
  title: 'Agenda Tutor',
  description: 'Agendamento de aulas',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}