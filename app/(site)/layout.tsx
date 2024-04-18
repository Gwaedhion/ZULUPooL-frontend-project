'use client';
import { Manrope } from 'next/font/google';
import './globals.css';
import { Footer } from '../../components/Footer/Footer';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { ContextProvider } from './context';
import cn from 'classnames';
import { useState } from 'react';

const manrope = Manrope({ subsets: ['latin', 'cyrillic'] });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [lang, setLang] = useState('');
	const [theme, setTheme] = useState('');

	const handleLangChange = (lang: string) => {
		setLang(lang);
	};

	const handleThemeChange = (theme: string) => {
		setTheme(theme);
	};

	return (
		<html lang="en">
			<body
				className={cn('body', manrope.className, {
					['body_light']: theme === 'light',
					['body_dark']: theme === 'dark',
				})}
			>
				<ContextProvider>
					<Sidebar
						userTheme={handleThemeChange}
						userLanguage={handleLangChange}
					/>
					{children}
					<Footer />
				</ContextProvider>
			</body>
		</html>
	);
}
