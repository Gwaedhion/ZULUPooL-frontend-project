import { IStatisticsData } from './page.props';
import styles from './page.module.css';

export default function TableData({
	time,
	shareRate,
	shareWork,
	power,
}: IStatisticsData) {
	return (
		<>
			<tr className={styles.tableRow}>
				<td className={styles.tableCell}>
					<span>{time}</span>
				</td>
				<td className={styles.tableCell}>
					<span>{shareRate}</span>
				</td>
				<td className={styles.tableCell}>
					<span>{shareWork}</span>
				</td>
				<td className={styles.tableCell}>
					<span>{power}</span>
				</td>
			</tr>
		</>
	);
}
