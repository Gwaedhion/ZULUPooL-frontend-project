import { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
	title: 'Statistics',
};

export default function Info() {
	return <div className={styles.pageWrapper}>pool stats</div>;
}
