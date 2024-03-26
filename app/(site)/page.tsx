'use client';
import styles from './page.module.css';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
import { API } from '../api';
import axios from 'axios';
import { IHomeApi, IInstance } from './page.interface';
import ServerIcon from '../../public/homepage-icons/server.svg';
import CoinButtons from '../../components/CoinButtons/CoinButtons';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export default function Home(): JSX.Element {
	const [apiData, setApiData] = useState<IHomeApi | undefined>({
		status: 'ok',
		instances: [],
	});

	useEffect(() => {
		const apiList = async () => {
			axios
				.post(API.user.instanceEnumerateAll)
				.then((res) => setApiData(res.data));
		};
		apiList();
	}, []);

	const [rowData, setRowData] = useState<IInstance | undefined>();

	const [value, setValue] = useState({
		title: 'BTC',
		id: 0,
	});

	const instances = apiData?.instances
		?.map((instance) => instance)
		.filter((inst) => inst.backends.includes(value?.title));

	return (
		<main className={styles.pageWrapper}>
			<CoinButtons setValue={setValue} value={value} />
			<table className={styles.table}>
				<thead className={styles.tableHead}>
					<tr className={styles.tableRow}>
						<th className={styles.tableHeader}>Protocol</th>
						<th className={styles.tableHeader}>Type</th>
						<th className={styles.tableHeader}>Port</th>
						<th className={styles.tableHeader}>Backends</th>
						<th className={styles.tableHeader}>Difficulty</th>
					</tr>
				</thead>
				<tbody className={styles.tableBody}>
					{apiData?.instances
						?.map((instance) => instance)
						.filter((inst) =>
							inst.backends.includes(value?.title)
						) ? (
						instances?.map((data: IInstance, key) => (
							<tr
								key={key}
								className={styles.tableRow}
								onClick={() => {
									setRowData({
										protocol: data.protocol,
										type: data.type,
										port: data.port,
										backends: data.backends,
										shareDiff: data.shareDiff,
									});
									console.log(rowData);
								}} // there'll be tableData here. USE USESTATE
							>
								<td className={styles.tableCell}>
									<span>{data.protocol}</span>
								</td>
								<td className={styles.tableCell}>
									<span>{data.type}</span>
								</td>
								<td className={styles.tableCell}>
									<span>{data.port}</span>
								</td>
								<td className={styles.tableCell}>
									<span>{data.backends.join(', ')}</span>
								</td>
								<td className={styles.tableCell}>
									<span>{data.shareDiff}</span>
								</td>
							</tr>
						))
					) : (
						<tr className={styles.tableRow}>
							<td className={styles.tableCell}>
								<span>Not Found</span>
							</td>
							<td className={styles.tableCell}>
								<span>Not Found</span>
							</td>
							<td className={styles.tableCell}>
								<span>Not Found</span>
							</td>
							<td className={styles.tableCell}>
								<span>Not Found</span>
							</td>
							<td className={styles.tableCell}>
								<span>Not Found</span>
							</td>
						</tr>
					)}
				</tbody>
			</table>
			<div className={styles.serverInfo}>
				<div className={styles.startWork}>
					<ServerIcon className={styles.serverIcon} />
					<p className={styles.configureText}>
						To start work with coins, configure your device to
						connect to our server:
					</p>
				</div>

				<p className={styles.serverText}>
					{
						'sha256.zulupool.com:5010 Username: dvl_d1e2n3i.any-worker-name-required Password: <not-an-empty-field-required>'
					}
				</p>
			</div>
		</main>
	);
}
