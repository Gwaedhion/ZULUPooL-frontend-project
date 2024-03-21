import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });
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
			<div>Авторизация</div>
			{children}
		</html>
	);
}
