import './globals.css'
import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import { cn } from '~/lib/utils'
import { useTranslation } from '~/app/i18n'
import { Lng } from '~/app/i18n/settings'

const Font = Figtree({ subsets: ['latin'] })

type Props = {
  children: React.ReactNode,
  params: { lang: Lng }
}

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  // This is Next JS specific.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(params.lang)
  
  return {
    title: t('app.title'),
    icons: { icon: '/favicon.ico' }
  }
}

export default async function RootLayout({
  children,
  params: { lang }
}: Props) {
  return (
    <html lang={lang}>
      <body className={cn(Font.className, 'font-sans antialiased bg-gradient-to-br from-white via-cyan-100/5 to-magenta-100/20')}>{children}</body>
    </html>
  )
}
