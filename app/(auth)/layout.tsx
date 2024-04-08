import { Footer } from '@/components/Footer/Footer';
import { Manrope } from 'next/font/google';
import '../(site)/globals.css';

const manrope = Manrope({ subsets: ['latin', 'cyrillic'] });

export default function Authentication({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={manrope.className}>
				{children}
				<Footer />
			</body>
		</html>
	);
}
