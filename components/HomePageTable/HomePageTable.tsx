import { ICurrentRowData, IInstance } from '@/app/(site)/page.interface';
import styles from '../../app/(site)/page.module.css';

export default function HomePageTable(
	{ protocol, type, backends, shareDiff, port }: IInstance,
	{ setRowData }: ICurrentRowData
) {
	return (
		<>
			<tr
				className={styles.tableRow}
				onClick={() => {
					setRowData({
						protocol: protocol,
						type: type,
						port: port,
						backends: backends,
						shareDiff: shareDiff,
					});
				}}
			>
				<td className={styles.tableCell}>
					<span>{protocol}</span>
				</td>
				<td className={styles.tableCell}>
					<span>{type}</span>
				</td>
				<td className={styles.tableCell}>
					<span>{port}</span>
				</td>
				<td className={styles.tableCell}>
					<span>{backends.join(', ')}</span>
				</td>
				<td className={styles.tableCell}>
					<span>{shareDiff}</span>
				</td>
			</tr>
		</>
	);
}
