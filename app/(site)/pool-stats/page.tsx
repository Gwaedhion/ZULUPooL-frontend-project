'use client';
import styles from './page.module.css';
import CoinButtons from '@/components/CoinButtons/CoinButtons';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { API } from '@/app/api';
import { IStatisticsData, IStatisticsResponse } from './page.props';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/lara-dark-indigo/theme.css';
import en from '../../i18n/en.json';
import ru from '../../i18n/ru.json';

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
		coin: currentSecondaryCoin.title,
		groupByInterval: 86400,
		timeFrom: 1606424400,
	};

	const dataToJSON = JSON.stringify(dataToPost);

	useEffect(() => {
		const apiList = async () => {
			await axios
				.post(API.user.backendQueryPoolStatsHistory, dataToJSON)
				.then((res) => setApiData(res.data));
		};
		apiList();
	}, [dataToJSON]);

	const dataInitial: IStatisticsData[] | undefined = apiData?.stats;

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
			<DataTable
				value={dataInitial}
				paginator
				rows={20}
				rowsPerPageOptions={[20, 50, 100, 200, 500, 1000]}
				totalRecords={1000}
				className={styles.table}
				showGridlines
				sortField="time"
				sortOrder={-1}
			>
				<Column
					className={styles.tableColumn}
					field={'time'}
					header={`${refLang.current['pool-stats'].table['header.date']}`}
					sortable
					body={(rowData) => (
						<>
							{new Date(rowData.time * 1000).toLocaleDateString(
								`${navigator.language}`,
								{
									day: 'numeric',
									month: 'numeric',
									year: '2-digit',
								}
							)}
						</>
					)}
				/>
				<Column
					className={styles.tableColumn}
					field={'shareRate'}
					header={`${refLang.current['pool-stats'].table['header.shareRate']}`}
					sortable
				/>
				<Column
					className={styles.tableColumn}
					field={'power'}
					header={`${refLang.current['pool-stats'].table['header.hashrate']}`}
					sortable
					body={(rowData) => (
						<>
							{rowData.power > 1000
								? rowData.power < 1_000_000
									? `${(rowData.power / 1_000).toFixed(
											3
									  )} GH/s`
									: rowData.power < 1_000_000_000
									? `${(rowData.power / 1_000_000).toFixed(
											3
									  )} TH/s`
									: rowData.power < 1_000_000_000_000
									? `${(
											rowData.power / 1_000_000_000
									  ).toFixed(3)} PH/s`
									: rowData.power < 1_000_000_000_000_000
									? `${(
											rowData.power / 1_000_000_000_000
									  ).toFixed(3)} EH/s`
									: rowData.power < 1_000_000_000_000_000_000
									? `${(
											rowData.power /
											1_000_000_000_000_000
									  ).toFixed(3)} ZH/s`
									: `Not found`
								: 0}
						</>
					)}
				/>
				<Column
					className={styles.tableColumn}
					field={'shareWork'}
					header={`${refLang.current['pool-stats'].table['header.difficulty']}`}
					sortable
					body={(rowData) =>
						rowData.shareWork > 0
							? (rowData.shareWork / 1000000).toFixed(3)
							: 0
					}
				/>
			</DataTable>
		</div>
	);
}
