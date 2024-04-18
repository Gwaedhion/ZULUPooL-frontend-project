'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './page.module.css';
import CoinButtons from '@/components/CoinButtons/CoinButtons';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/lara-dark-indigo/theme.css';
import axios from 'axios';
import { API } from '@/app/api';
import { IuserUiSessionData } from '@/app/(auth)/auth/auth.interface';
import en from '../../i18n/en.json';
import ru from '../../i18n/ru.json';
import { IUserStatsHistory, IUserStatsHistoryResponse } from './history.props';
import { IStatisticsData } from '../pool-stats/page.props';

export default function Hisory() {
	const [currentMainCoin, setCurrentMainCoin] = useState({
		title: 'sha256',
		id: 0,
	});

	const [currentSecondaryCoin, setCurrentSecondaryCoin] = useState({
		title: 'BTC',
		id: 0,
	});

	const [userCoinsData, setUserCoinsData] = useState<IuserUiSessionData>();

	const userSessionId = {
		id: sessionStorage.getItem('sessionID'),
		sessionId: sessionStorage.getItem('sessionID'),
	};

	const getUserRegisterDate = async () => {
		axios
			.post(API.user.userGetCredentials, JSON.stringify(userSessionId))
			.then((res) => {
				console.log(res.data);
				setUserCoinsData(res.data);
			});
		console.log(userCoinsData);
	};

	useEffect(() => {
		getUserRegisterDate();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentSecondaryCoin]);

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

	const dataToPost: IUserStatsHistory = {
		coin: currentSecondaryCoin.title,
		groupByInterval: 86400,
		id: userSessionId.id!,
		sessionId: userSessionId.id!,
		timeFrom: userCoinsData?.registrationDate!,
	};

	const [userStatsHistory, setUserStatsHistory] =
		useState<IUserStatsHistoryResponse>();

	const userHistory = async () => {
		await axios
			.post(
				API.user.backendQueryUserStatsHistory,
				JSON.stringify(dataToPost)
			)
			.then((res) => {
				setUserStatsHistory(res.data);
			});
	};

	userHistory();

	const dataForTable: IStatisticsData[] | undefined = userStatsHistory?.stats;

	return (
		<div className={styles.pageWrapper}>
			<CoinButtons
				setCurrentSecondaryCoin={setCurrentSecondaryCoin}
				currentSecondaryCoin={currentSecondaryCoin}
				currentMainCoin={currentMainCoin}
				setCurrentMainCoin={setCurrentMainCoin}
			/>
			<DataTable
				value={dataForTable}
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
					header={`${refLang.current.history.table['header.date']}`}
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
					header={`${refLang.current.history.table['header.shareRate']}`}
					sortable
				/>
				<Column
					className={styles.tableColumn}
					field={'power'}
					header={`${refLang.current.history.table['header.hashrate']}`}
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
					header={`${refLang.current.history.table['header.difficulty']}`}
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
