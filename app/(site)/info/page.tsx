import { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
	title: 'Information',
};

export default function Info() {
	return <div className={styles.pageWrapper}>info</div>;
}
