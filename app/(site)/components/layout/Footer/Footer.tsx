import { IFooterProps } from './Footer.props';
import styles from './Footer.module.css';

export const Footer = ({ ...props }: IFooterProps): JSX.Element => {
	return (
		<footer className={styles.footer}>
			<div className={styles.footerItem}>
				<p>ZULUPooL</p>
				<a className={styles.link} href="#">
					Discord
				</a>
			</div>
			<div className={styles.footerItem}>
				<p>
					Your access and use of the Services constitutes your
					agreement to be bound by these
				</p>
				<a className={styles.link} href="#">
					Terms
				</a>
			</div>
			<div className={styles.footerItem}>
				<p>GUI</p>
				<a className={styles.link} href="#">
					v2.18.35b
				</a>
				<p>PoolCore</p>
				<a className={styles.link} href="#">
					v0.9999b
				</a>
			</div>
		</footer>
	);
};
