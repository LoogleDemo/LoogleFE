import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

import { JotaiProviders } from '@/utilities/jotai'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Loogle',
	description: 'Loogle, the best AI search engine',
}

export default async function LocaleLayout({
	children,
	params: { locale },
}: Readonly<{
	children: React.ReactNode
	params: { locale: string }
}>) {
	const messages = await getMessages()

	return (
		<html lang={locale}>
			<body className={inter.className}>
				<NextIntlClientProvider messages={messages}>
					<JotaiProviders>{children}</JotaiProviders>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
