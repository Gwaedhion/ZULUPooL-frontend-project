'use client';
import styles from './page.module.css';
import { Inter } from 'next/font/google';
import { Button } from '@/components/Button/Button';
import { useEffect, useState } from 'react';
import SmallCoinIcon from '../../public/button-icons/small-coin-icon.svg';
import cn from 'classnames';
import { API } from '../api';
import axios from 'axios';
import Table from './components/home/Table/Table';
import { IHomeApi } from './page.interface';

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

async function getData() {
	const res = await axios.post(API.user.userEnumerateAll);
	return res;
}

export default function Home(): JSX.Element {
	const [selectedCoin, setSelectedCoin] = useState('option_0');
	const handleRadioChange = (value: string) => {
		setSelectedCoin(value);
	};

	const [selectedSubCoin, setSelectedSubCoin] = useState('subOption_0');
	const handleSubRadioChange = (value: string) => {
		setSelectedSubCoin(value);
	};

	const currentCoin = Number(Array.from(selectedCoin.slice(-1)));
	const currentOption = coinButtonsArr[currentCoin];

	const currentSubCoin = Number(Array.from(selectedSubCoin.slice(-1)));
	const currentSubOption =
		coinButtonsArr[currentCoin].subcoins[currentSubCoin];

	console.log(currentSubOption);

	const [apiData, setApiData] = useState([]);

	useEffect(() => {
		const apiList = async () => {
			axios
				.post(API.user.instanceEnumerateAll)
				.then((res) => setApiData(res.data));
		};
		apiList();
	}, []);

	console.log(apiData);

	const apiDataProtocols = apiData?.instances?.map((i) => i.protocol);
	const apiDataTypes = apiData?.instances?.map((i) => i.type);
	const apiDataPorts = apiData?.instances?.map((i) => i.port);
	const apiDataBackends = apiData?.instances?.map((i) => i.backends);
	const apiDataShareDiffs = apiData?.instances?.map((i) => i.shareDiff);

	console.log(apiDataProtocols);
	console.log(apiDataTypes);
	console.log(apiDataPorts);
	console.log(apiDataBackends);
	console.log(apiDataShareDiffs);

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
									selectedSubCoin ===
									`subOption_${subItem.id}`
								}
							/>
							<SmallCoinIcon />
							{subItem.title}
						</Button>
					</div>
				))}
				{/* <Table
					protocol={apiData?.instances.map(
						(instance) => instance.protocol
					)}
				/> */}
				{/* <Table>{}</Table> */}
			</div>
		</main>
	);
}
