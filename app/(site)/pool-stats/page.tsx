'use client';
import styles from './page.module.css';
import CoinButtons from '@/components/CoinButtons/CoinButtons';
import { useEffect, useState, useMemo, useContext } from 'react';
import axios from 'axios';
import { API } from '@/app/api';
import {
	IStatisticsData,
	IStatisticsResponse,
	IStatisticsUIData,
} from './page.props';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/viva-dark/theme.css';
import 'primereact/resources/primereact.min.css';

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

	console.log(apiData);

	// const modifiedData: IStatisticsData[] = [];

	// const modifyApiData = (array: IStatisticsData[]): IStatisticsUIData[] => {
	// 	const modifiedData: IStatisticsUIData[] = [];
	// 	for (let i of array) {
	// 		console.log(i.time);

	// 		const newItem: IStatisticsUIData = {
	// 			name: '',
	// 			time: new Date(Number(i.time * 1000)).toLocaleDateString(
	// 				'en-US',
	// 				{ day: 'numeric', month: 'numeric', year: '2-digit' }
	// 			),
	// 			shareRate: String(i.shareRate),
	// 			shareWork: String(i.shareWork),
	// 			power: String(i.power),
	// 		};
	// 		modifiedData.push(newItem);
	// 	}
	// 	return modifiedData;
	// };

	// const data = modifyApiData(apiData?.stats ?? []);

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
					field={'time'}
					header={'Date'}
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
					field={'shareRate'}
					header={'Share rate (share/s)'}
					sortable
				/>
				<Column
					field={'power'}
					header={'Hashrate'}
					sortable
					body={(rowData) => (
						<>
							{rowData.power > 1000
								? rowData.power < 1_000_000
									? `${(rowData.power / 1_000).toFixed(
											3
									  )} MH/s`
									: rowData.power < 1_000_000_000
									? `${(rowData.power / 1_000_000).toFixed(
											3
									  )} GH/s`
									: rowData.power < 1_000_000_000_000
									? `${(
											rowData.power / 1_000_000_000
									  ).toFixed(3)} TH/s`
									: rowData.power < 1_000_000_000_000_000
									? `${(
											rowData.power / 1_000_000_000_000
									  ).toFixed(3)} PH/s`
									: rowData.power < 1_000_000_000_000_000_000
									? `${(
											rowData.power /
											1_000_000_000_000_000
									  ).toFixed(3)} EH/s`
									: rowData.power <
									  1_000_000_000_000_000_000_000
									? `${(
											rowData.power /
											1_000_000_000_000_000_000
									  ).toFixed(3)} ZH/s`
									: `Not found`
								: 0}
						</>
					)}
				/>
				<Column
					field={'shareWork'}
					header={'Accepted difficulty (M)'}
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
