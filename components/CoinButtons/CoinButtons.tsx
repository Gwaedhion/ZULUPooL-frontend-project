import { Button } from '@/components/Button/Button';
import SmallCoinIcon from '../../public/button-icons/small-coin-icon.svg';
import styles from './CoinButtons.module.css';
import { useState } from 'react';
import cn from 'classnames';
import { ICoin, ICurrentCoin } from '@/app/(site)/page.interface';

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

export default function CoinButtons(props: ICoin): JSX.Element {
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

	return (
		<div>
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
							onClick={() => {
								handleSubRadioChange(`subOption_${subItem.id}`);
								props.setValue(subItem);
							}}
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
		</div>
	);
}
