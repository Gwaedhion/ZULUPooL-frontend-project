import { useEffect, useState } from 'react';
import { ICoinInstance } from './Table.props';
import axios from 'axios';
import { API } from '@/app/api';
import styles from './Table.module.css';

export default function Table({
	protocol,
	type,
	port,
	backends,
	shareDiff,
	...props
}: ICoinInstance): JSX.Element {
	return (
		<table className={styles.table} {...props}>
			<thead className={styles.tableLayout}>
				<th className={styles.tableCell}>Protocol</th>
				<th className={styles.tableCell}>Type</th>
				<th className={styles.tableCell}>Port</th>
				<th className={styles.tableCell}>Backends</th>
				<th className={styles.tableCell}>Difficulty</th>
			</thead>
			<tbody>
				{protocol && type && port && backends && shareDiff && (
					<tr className={styles.tableRow}>
						<td className={styles.tableCell}>{protocol}</td>
						<td className={styles.tableCell}>{type}</td>
						<td className={styles.tableCell}>{port}</td>
						<td className={styles.tableCell}>{backends}</td>
						<td className={styles.tableCell}>{shareDiff}</td>
					</tr>
				)}
			</tbody>
		</table>
	);
}
