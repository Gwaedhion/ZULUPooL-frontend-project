'use client';
import styles from './page.module.css';
import { Inter } from 'next/font/google';
import { Button } from '@/components/Button/Button';
import { useEffect, useState } from 'react';
import SmallCoinIcon from '../../public/button-icons/small-coin-icon.svg';
import cn from 'classnames';
import { API } from '../api';
import axios from 'axios';
import { IHomeApi, IInstance } from './page.interface';
import ServerIcon from '../../public/homepage-icons/server.svg';
import { table } from 'console';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

const coinButtonsArr = [
	{
		title: 'sha256',
		id: 0,

		subcoins: [
			{ title: 'BTC', id: 0 },
			{ title: 'BCHN', id: 1 },
			{ title: 'BSV', id: 2 },
			{ title: 'DGB.sha256', id: 3 },
			{ title: 'HTR', id: 4 },
			{ title: 'XEC', id: 5 },
		],
	},
	{
		title: 'odocrypt',
		id: 1,

		subcoins: [{ title: 'DGB.odo', id: 0 }],
	},
	{
		title: 'qubit',
		id: 2,

		subcoins: [{ title: 'DGB.qubit', id: 0 }],
	},
	{
		title: 'scrypt',
		id: 3,

		subcoins: [
			{ title: 'LTC', id: 0 },
			{ title: 'DGB.scrypt', id: 1 },
			{ title: 'DOGE', id: 2 },
		],
	},
	{
		title: 'skein',
		id: 4,

		subcoins: [{ title: 'DGB.skein', id: 0 }],
	},
	{
		title: 'PrimePOW',
		id: 5,

		subcoins: [{ title: 'XPM', id: 0 }],
	},
];

interface ITableData {
	protocol: string;
	type: string;
	port: number;
	backends: string[];
	shareDiff: number | undefined;
}

async function getData() {
	const res = await axios.post(API.user.userEnumerateAll);
	return res;
}

export default function Home(): JSX.Element {
	const [selectedCoin, setSelectedCoin] = useState('option_0');
	const handleRadioChange = (value: string) => {
		setSelectedCoin(value);
	};

	let [selectedSubCoin, setSelectedSubCoin] = useState('subOption_0');
	const handleSubRadioChange = (value: string) => {
		setSelectedSubCoin(value);
	};

	let currentCoin = Number(Array.from(selectedCoin.slice(-1)));
	let currentOption = coinButtonsArr[currentCoin];

	let currentSubCoin = Number(Array.from(selectedSubCoin.slice(-1)));
	let currentSubOption = coinButtonsArr[currentCoin].subcoins[currentSubCoin];

	const [apiData, setApiData] = useState<IHomeApi>();

	useEffect(() => {
		const apiList = async () => {
			axios
				.post(API.user.instanceEnumerateAll)
				.then((res) => setApiData(res.data));
		};
		apiList();
	}, []);

	console.log(currentSubOption);
	console.log(apiData);

	const instances = apiData?.instances
		?.map((instance) => instance)
		.filter((inst) => inst.backends.includes(currentSubOption?.title));
	console.log(instances);

	return (
		<main className={styles.pageWrapper}>
			<div className={styles.coinButtonsContainer}>
				{coinButtonsArr.map((item) => (
					<Button
						appearence="big"
						className={cn(styles.coinButton, {
							[styles.coinButton_active]:
								selectedCoin == `option_${item.id}`,
						})}
						key={item.title}
						onClick={() => {
							handleRadioChange(`option_${item.id}`);
							handleSubRadioChange('subOption_0');
						}}
					>
						<input
							className={styles.input}
							type="radio"
							name="coin"
							id={`option_${item.id}`}
							value={`option_${item.id}`}
							defaultChecked={
								selectedCoin === `option_${item.id}`
							}
						/>
						{item.title}
					</Button>
				))}
			</div>
			<div className={styles.subCoinsWrapper}>
				{currentOption.subcoins.map((subItem) => (
					<div
						key={subItem.title}
						className={styles.subCoinContainer}
					>
						<Button
							appearence="transparent"
							key={subItem.title}
							className={cn(styles.subCoinButton, {
								[styles.subCoinButton_active]:
									selectedSubCoin ==
									`subOption_${subItem.id}`,
							})}
							onClick={() =>
								handleSubRadioChange(`subOption_${subItem.id}`)
							}
						>
							<input
								className={styles.input}
								type="radio"
								name="subCoin"
								id={`subOption_${subItem.id}`}
								value={`subOption_${subItem.id}`}
								defaultChecked={
									selectedSubCoin == `subOption_${subItem.id}`
								}
							/>
							<SmallCoinIcon />
							{subItem.title}
						</Button>
					</div>
				))}
			</div>
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
							inst.backends.includes(currentSubOption?.title)
						) ? (
						instances?.map((data: IInstance, key) => (
							<tr
								key={key}
								className={styles.tableRow}
								onClick={() => {}} // there'll be tableData here. USE USESTATE
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
