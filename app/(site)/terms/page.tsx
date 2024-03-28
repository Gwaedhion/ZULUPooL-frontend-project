import { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
	title: 'Terms',
};

export default function Info() {
	return <div className={styles.pageWrapper}>terms</div>;
}
