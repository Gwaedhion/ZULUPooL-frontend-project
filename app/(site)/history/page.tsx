import { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
	title: 'History',
};

export default function Info() {
	return <div className={styles.pageWrapper}>history</div>;
}
