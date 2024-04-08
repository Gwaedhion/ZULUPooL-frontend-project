import { Button } from '@/components/Button/Button';
import SmallCoinIcon from '../../public/button-icons/small-coin-icon.svg';
import styles from './CoinButtons.module.css';
import { useEffect, useState } from 'react';
import cn from 'classnames';
import { IHandleCurrentCoin } from '@/app/(site)/page.interface';

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

export default function CoinButtons(coins: IHandleCurrentCoin): JSX.Element {
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

	let currSubOption = {
		title: currentOption.subcoins[0].title,
		id: currentOption.subcoins[0].id,
	};

	useEffect(() => {
		coins.setCurrentSecondaryCoin(currSubOption);
	}, [selectedCoin]);

	useEffect(() => {
		coins.setCurrentMainCoin({
			title: currentOption.title,
			id: currentOption.id,
		});
	}, [selectedCoin]);

	return (
		<div className={styles.pageWrapper}>
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

							coins.setCurrentSecondaryCoin({
								title: currentOption.subcoins[0].title,
								id: currentOption.subcoins[0].id,
							});

							coins.setCurrentMainCoin({
								title: selectedCoin,
								id: currentCoin,
							});
						}}
					>
						{item.title}
					</Button>
				))}
			</div>
			<div className={styles.subCoinsWrapper}>
				{currentOption.subcoins.map((subItem) => (
					<Button
						appearence="transparent"
						key={subItem.title}
						className={cn(styles.subCoinButton, {
							[styles.subCoinButton_active]:
								selectedSubCoin == `subOption_${subItem.id}`,
						})}
						onClick={() => {
							handleSubRadioChange(`subOption_${subItem.id}`);
							coins.setCurrentSecondaryCoin(subItem);
						}}
					>
						<SmallCoinIcon />
						{subItem.title}
					</Button>
				))}
			</div>
		</div>
	);
}
