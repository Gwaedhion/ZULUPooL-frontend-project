'use client';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import CoinButtons from '@/components/CoinButtons/CoinButtons';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { API } from '@/app/api';
import { IUserPayoutsPayload, IUserPayoutsResponse } from './payouts.props';
import 'primereact/resources/themes/lara-dark-indigo/theme.css';

export default function Info() {
	const [currentMainCoin, setCurrentMainCoin] = useState({
		title: 'sha256',
		id: 0,
	});

	const [currentSecondaryCoin, setCurrentSecondaryCoin] = useState({
		title: 'BTC',
		id: 0,
	});

	const dataToPost: IUserPayoutsPayload = {
		coin: currentSecondaryCoin.title,
		count: 1000,
		id: sessionStorage.getItem('sessionID'),
		sessionId: sessionStorage.getItem('sessionID'),
		timeFrom: 0,
	};

	const [apiData, setApiData] = useState<IUserPayoutsResponse>();

	const getPayoutsData = async () => {
		await axios
			.post(API.user.backendQueryPayouts, JSON.stringify(dataToPost))
			.then((res) => setApiData(res.data.payouts));
	};

	useEffect(() => {
		getPayoutsData();
	}, [currentSecondaryCoin]);

	return (
		<div className={styles.pageWrapper}>
			<CoinButtons
				setCurrentSecondaryCoin={setCurrentSecondaryCoin}
				currentSecondaryCoin={currentSecondaryCoin}
				currentMainCoin={currentMainCoin}
				setCurrentMainCoin={setCurrentMainCoin}
			/>
			<DataTable
				className={styles.table}
				paginator
				rows={20}
				rowsPerPageOptions={[20, 50, 100, 200, 500, 1000]}
				totalRecords={1000}
				showGridlines
				value={apiData?.payouts}
			>
				<Column
					className={styles.tableColumn}
					field="time"
					header="Date"
					sortable
				></Column>
				<Column
					className={styles.tableColumn}
					field="txid"
					header="TXid"
					sortable
				></Column>
				<Column
					className={styles.tableColumn}
					field="value"
					header="Amount"
					sortable
				></Column>
			</DataTable>
		</div>
	);
}
