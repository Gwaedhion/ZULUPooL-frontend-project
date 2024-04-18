'use client';
import styles from './page.module.css';
import Rewards from '@/components/Rewards/Rewards';
import CoinsInfo from '@/components/CoinsInfo/CoinsInfo';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { IHomeApi, IInstance } from '../page.interface';
import { API } from '@/app/api';
import CoinButtons from '@/components/CoinButtons/CoinButtons';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import { useRouter } from 'next/navigation';
import ru from '../../i18n/ru.json';
import en from '../../i18n/en.json';

export default function Info() {
	const router = useRouter();

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

	const [userLanguage, setUserLanguage] = useState(
		localStorage.getItem('userLang')
	);

	useEffect(() => {
		setUserLanguage(localStorage.getItem('userLang'));
	}, [userLanguage]);

	const refLang = useRef(en);

	useEffect(() => {
		if (userLanguage == 'en-US') {
			refLang.current = en;
		}
		if (userLanguage == 'ru-RU') {
			refLang.current = ru;
		}
	}, [userLanguage]);

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
						<th className={styles.tableHeader}>
							{refLang.current.info.table['header.protocol']}
						</th>
						<th className={styles.tableHeader}>
							{refLang.current.info.table['header.port']}
						</th>
						<th className={styles.tableHeader}>
							{refLang.current.info.table['header.type']}
						</th>
						<th className={styles.tableHeader}>
							{refLang.current.info.table['header.backends']}
						</th>
						<th className={styles.tableHeader}>
							{refLang.current.info.table['header.difficulty']}
						</th>
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
					{userLanguage == 'en-US' && (
						<p className={styles.configureText}>
							To start work with{' '}
							<span className={styles.textCoins}>
								{rowData?.backends.join(', ')}
							</span>{' '}
							coins, configure your device to connect to our
							server:
						</p>
					)}
					{userLanguage == 'ru-RU' && (
						<p className={styles.configureText}>
							Чтобы начать работать c монетами{' '}
							<span className={styles.textCoins}>
								{rowData?.backends.join(', ')}
							</span>{' '}
							- настройте своё устройство на подключение к нашему
							серверу:
						</p>
					)}
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
								{refLang.current.info.serverInfo.username}:
							</span>{' '}
							dvl_d1e2n3i.any-worker-name-required
						</div>
					}{' '}
					{
						<div>
							<span className={styles.userInfoCoins}>
								{refLang.current.info.serverInfo.password}:
							</span>{' '}
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
