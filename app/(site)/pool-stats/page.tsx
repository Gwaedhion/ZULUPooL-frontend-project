'use client';
import styles from './page.module.css';
import CoinButtons from '@/components/CoinButtons/CoinButtons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '@/app/api';
import { IStatisticsData, IStatisticsResponse } from './page.props';
import SortIcon from '../../../public/statisticspage-icons/sort-icon.svg';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import TableData from './TableData';

export default function Info(): JSX.Element {
	const [currentMainCoin, setCurrentMainCoin] = useState({
		title: 'sha256',
		id: 0,
	});

	const [currentSecondaryCoin, setCurrentSecondaryCoin] = useState({
		title: 'BTC',
		id: 0,
	});

	const [apiData, setApiData] = useState<IStatisticsResponse | undefined>({
		status: 'ok',
		stats: [],
	});

	const dataToPost = {
		coin: currentMainCoin.title,
		groupByInterval: 86400,
		timeFrom: 1606424400,
	};

	const dataToJSON = JSON.stringify(dataToPost);

	useEffect(() => {
		const apiList = async () => {
			axios
				.post(API.user.backendQueryPoolStatsHistory, dataToJSON)
				.then((res) => setApiData(res.data));
		};
		apiList();
	}, [dataToJSON]);

	const data = apiData?.stats;

	const [sortedField, setSortedField] = useState({
		key: 'time',
		direction: 'descending',
	});

	let sortedData: IStatisticsData[] | undefined = [
		...(data?.map((d) => d) ?? []),
	];

	useEffect(() => {
		sortedData?.sort((item1, item2) => {});
	});

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
							<button
								type="button"
								className={styles.sortButton}
								onClick={() => {
									setSortedField({
										key: 'time',
										direction: 'descending',
									});
								}}
							>
								Date
							</button>
							<SortIcon className={styles.icon} />
						</th>
						<th className={styles.tableHeader}>
							<button
								type="button"
								className={styles.sortButton}
								onClick={() => {
									setSortedField({
										key: 'shareRate',
										direction: 'descending',
									});
								}}
							>
								Share rate
							</button>
							<SortIcon className={styles.icon} />
						</th>
						<th className={styles.tableHeader}>
							<button
								type="button"
								className={styles.sortButton}
								onClick={() => {
									setSortedField({
										key: 'shareWork',
										direction: 'descending',
									});
								}}
							>
								Hashrate
							</button>
							<SortIcon className={styles.icon} />
						</th>
						<th className={styles.tableHeader}>
							<button
								type="button"
								className={styles.sortButton}
								onClick={() => {
									setSortedField({
										key: 'power',
										direction: 'descending',
									});
								}}
							>
								Accepted difficulty
							</button>
							<SortIcon className={styles.icon} />
						</th>
					</tr>
				</thead>
				<tbody className={styles.tableBody}>
					{data !== undefined &&
						data?.map((item) => (
							<TableData
								key={item.time}
								name={item.name}
								time={item.time}
								shareRate={item.shareRate}
								shareWork={item.shareWork}
								power={item.power}
							/>
						))}
				</tbody>
			</table>
		</div>
	);
}
