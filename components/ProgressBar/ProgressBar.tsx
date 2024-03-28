'use client';
import styles from './ProgressBar.module.css';
import { motion, useScroll } from 'framer-motion';

export default function ProgressBar() {
	const { scrollYProgress } = useScroll();
	return (
		<motion.div
			className={styles.progressBar}
			style={{ scaleX: scrollYProgress }}
		></motion.div>
	);
}
