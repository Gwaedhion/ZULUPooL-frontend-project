'use client';
import styles from './page.module.css';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
import { API } from '../api';
import axios from 'axios';
import { IHomeApi, IInstance } from './page.interface';
import CoinButtons from '../../components/CoinButtons/CoinButtons';
import CoinsInfo from '@/components/CoinsInfo/CoinsInfo';
import Rewards from '@/components/Rewards/Rewards';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import HomePageTable from '@/components/HomePageTable/HomePageTable';

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
		<main className={styles.pageWrapper}>
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
							<HomePageTable
								key={key}
								protocol={data.protocol}
								port={data.port}
								type={data.type}
								backends={data.backends}
								shareDiff={data.shareDiff}
							/>
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
		</main>
	);
}
