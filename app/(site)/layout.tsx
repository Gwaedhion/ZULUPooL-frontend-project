import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import { Footer } from './components/layout/Footer/Footer';
import { Sidebar } from './components/layout/Sidebar/Sidebar';

const manrope = Manrope({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
	title: 'Main',
	description: 'ZULUPooL Web App',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={manrope.className}>
				{children}
				<Sidebar />
				<Footer />
			</body>
		</html>
	);
}
