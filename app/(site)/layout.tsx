import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import { Footer } from '../../components/Footer/Footer';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import ProgressBar from '@/components/ProgressBar/ProgressBar';

const manrope = Manrope({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
	title: 'ZULUPooL',
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
				<Sidebar />
				{children}
				<Footer />
			</body>
		</html>
	);
}
