'use client';
import styles from './page.module.css';
import Rewards from '@/components/Rewards/Rewards';
import CoinsInfo from '@/components/CoinsInfo/CoinsInfo';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IHomeApi, IInstance } from '../page.interface';
import { API } from '@/app/api';
import CoinButtons from '@/components/CoinButtons/CoinButtons';
import ProgressBar from '@/components/ProgressBar/ProgressBar';

export default function Info() {
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

	const [rowData, setRowData] = useState<IInstance | undefined>({
		protocol: 'stratum',
		type: 'BTC',
		port: 5010,
		backends: ['BTC', 'BCHN'],
		shareDiff: 10000,
	});

	const [currentMainCoin, setCurrentMainCoin] = useState({
		title: 'sha256',
		id: 0,
	});

	const [currentSecondaryCoin, setCurrentSecondaryCoin] = useState({
		title: 'BTC',
		id: 0,
	});

	const instances = apiData?.instances
		?.map((instance) => instance)
		.filter((inst) => inst.backends.includes(currentSecondaryCoin?.title));

	return (
		<div className={styles.pageWrapper}>
			<ProgressBar />
			<CoinButtons
				setCurrentSecondaryCoin={setCurrentSecondaryCoin}
				currentSecondaryCoin={currentSecondaryCoin}
				currentMainCoin={currentMainCoin}
				setCurrentMainCoin={setCurrentMainCoin}
			/>
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
							inst.backends.includes(currentSecondaryCoin?.title)
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
								}}
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
					<p className={styles.configureText}>
						To start work with{' '}
						<span className={styles.textCoins}>
							{rowData?.backends.join(', ')}
						</span>{' '}
						coins, configure your device to connect to our server:
					</p>
				</div>

				<div className={styles.serverText}>
					<div>
						sha256.zulupool.com:{' '}
						<span className={styles.textCoins}>
							{rowData?.port}
						</span>
					</div>
					{
						<div>
							<span className={styles.userInfoCoins}>
								Username:
							</span>{' '}
							dvl_d1e2n3i.any-worker-name-required
						</div>
					}{' '}
					{
						<div>
							<span className={styles.userInfoCoins}>
								Password:
							</span>
							{'<not-an-empty-field-required>'}
						</div>
					}
				</div>
			</div>

			<CoinsInfo currentMainCoin={currentMainCoin} rowData={rowData!} />
			<Rewards />
		</div>
	);
}
