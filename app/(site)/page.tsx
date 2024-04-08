import { Button } from '@/components/Button/Button';
import styles from './page.module.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export default function Home() {
	return (
		<main className={styles.pageWrapper}>
			<Link href="/auth">
				<Button className={styles.logInButton} appearence="middle">
					Login
				</Button>
			</Link>
		</main>
	);
}
