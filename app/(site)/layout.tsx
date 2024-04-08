'use client';
import { Manrope } from 'next/font/google';
import './globals.css';
import { Footer } from '../../components/Footer/Footer';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { ContextProvider } from './context';
import { IuserApiSession } from '../(auth)/auth/auth.interface';
import cn from 'classnames';
import styles from './layout.module.css';

const manrope = Manrope({ subsets: ['latin', 'cyrillic'] });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const userDataToPost: IuserApiSession = {
		id: sessionStorage?.getItem('sessionId')!,
		sessionId: sessionStorage?.getItem('sessionId')!,
	};

	return (
		<html lang="en">
			<body
				className={cn(manrope.className, styles.body, {
					[styles.bodyLight]:
						localStorage.getItem('userTheme') == 'light',
					[styles.bodyDark]:
						localStorage.getItem('userTheme') == 'dark',
				})}
			>
				<ContextProvider>
					<Sidebar />
					{children}
					<Footer />
				</ContextProvider>
			</body>
		</html>
	);
}
