'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './page.module.css';
import cn from 'classnames';
import PaymentsSettingsIcon from '../../../public/settings-icons/payments-settings-icon.svg';
import AccountSettingsIcon from '../../../public/settings-icons/account-settings-icon.svg';
import CoinButtons from '@/components/CoinButtons/CoinButtons';
import { Switch } from 'antd';
import { Button } from '@/components/Button/Button';
import axios from 'axios';
import { API } from '@/app/api';
import {
	IUserGetSettingsCoins,
	IUserGetSettingsResponse,
} from './settings.props';
import en from '../../i18n/en.json';
import ru from '../../i18n/ru.json';

export default function Info() {
	const [settingsState, setSettingsState] = useState('payment-settings');

	const [currentMainCoin, setCurrentMainCoin] = useState({
		title: 'sha256',
		id: 0,
	});

	const [currentSecondaryCoin, setCurrentSecondaryCoin] = useState({
		title: 'BTC',
		id: 0,
	});

	const [switchCheck, setSwitchCheck] = useState(false);

	const userSessionId = {
		id: sessionStorage?.getItem('sessionID'),
		sessionId: sessionStorage?.getItem('sessionID'),
	};

	const [apiData, setApiData] = useState<IUserGetSettingsResponse>();

	const getUserSettings = async () => {
		await axios
			.post(API.user.userGetSettings, JSON.stringify(userSessionId))
			.then((res) => {
				console.log(res.data);
				setApiData(res.data);
			});
	};

	useEffect(() => {
		getUserSettings();
		console.log(apiData);
	}, []);

	const [userLanguage, setUserLanguage] = useState(
		localStorage.getItem('userLang')
	);

	useEffect(() => {
		setUserLanguage(localStorage.getItem('userLang'));
	}, [userLanguage]);

	const userLang = useRef(en);

	useEffect(() => {
		if (userLanguage == 'en-US') {
			userLang.current = en;
		} else if (userLanguage == 'ru-RU') {
			userLang.current = ru;
		}
	}, [userLanguage]);

	const arr = apiData?.coins;

	console.log(arr);

	const [paymentAddressPlaceholder, setPaymentAddressPlaceholder] =
		useState('');

	const getPaymentAddressPlaceholder = () => {
		arr?.forEach((element) => {
			if (element.name == currentSecondaryCoin.title) {
				setPaymentAddressPlaceholder(element.address);
			}
		});
		console.log(paymentAddressPlaceholder);
	};

	useEffect(() => {
		getPaymentAddressPlaceholder();
	});

	useEffect(() => {
		getPaymentAddressPlaceholder();
	}, [currentSecondaryCoin]);

	const [payoutThresholdPlaceholder, setPayoutThresholdPlaceholder] =
		useState('');

	const getPayoutThresholdPlaceholder = () => {
		arr?.forEach((element) => {
			if (element.name == currentSecondaryCoin.title) {
				setPayoutThresholdPlaceholder(element.payoutThreshold);
			}
		});
		console.log(payoutThresholdPlaceholder);
	};

	useEffect(() => {
		getPayoutThresholdPlaceholder();
	});

	useEffect(() => {
		getPayoutThresholdPlaceholder();
	}, [currentSecondaryCoin]);

	const coin = userLang.current.settings['payment-settings-form'].coins;

	return (
		<div className={styles.pageWrapper}>
			<div className={styles.settingsContainer}>
				<div className={styles.settingsPaymentOption}>
					<button
						className={cn(styles.settingsButton, {
							[styles.settingsButton_activeBlue]:
								settingsState == 'payment-settings',
						})}
						onClick={() => setSettingsState('payment-settings')}
					>
						<p
							className={cn(styles.settingsTitle, {
								[styles.settingsTitle_activeBlue]:
									settingsState == 'payment-settings',
							})}
						>
							{
								userLang.current.settings[
									'payment-settings-form'
								].settings.paymentSettings.title
							}
						</p>
						<PaymentsSettingsIcon
							className={cn(styles.settingsIcon, {
								[styles.settingsIcon_activeBlue]:
									settingsState == 'payment-settings',
							})}
						/>
					</button>
				</div>
				<div className={styles.settingsAccountOption}>
					<button
						className={cn(styles.settingsButton, {
							[styles.settingsButton_activePurple]:
								settingsState == 'account-settings',
						})}
						onClick={() => setSettingsState('account-settings')}
					>
						<AccountSettingsIcon
							className={cn(styles.settingsIcon, {
								[styles.settingsIcon_activePurple]:
									settingsState == 'account-settings',
							})}
						/>
						<p
							className={cn(styles.settingsTitle, {
								[styles.settingsTitle_activePurple]:
									settingsState == 'account-settings',
							})}
						>
							{
								userLang.current.settings[
									'payment-settings-form'
								].settings.accountSettings.title
							}
						</p>
					</button>
				</div>
			</div>
			{settingsState == 'payment-settings' && (
				<div className={styles.settingsBox}>
					<CoinButtons
						setCurrentSecondaryCoin={setCurrentSecondaryCoin}
						currentSecondaryCoin={currentSecondaryCoin}
						currentMainCoin={currentMainCoin}
						setCurrentMainCoin={setCurrentMainCoin}
					/>
					<form className={styles.form}>
						<label className={styles.formLabel} htmlFor="address">
							{
								userLang.current.settings[
									'payment-settings-form'
								].settings.paymentSettings.paymentAddress
							}
						</label>
						<input
							className={styles.formInput}
							type="text"
							name="address"
							id="address"
							value={
								paymentAddressPlaceholder !== null
									? paymentAddressPlaceholder
									: ''
							}
							placeholder={
								currentSecondaryCoin.title == 'BTC'
									? coin.sha256.BTC.P2PKH
									: currentSecondaryCoin.title == 'BCHN'
									? coin.sha256.BCHN.P2PKH
									: currentSecondaryCoin.title == 'BSV'
									? coin.sha256.BSV.P2PKH
									: currentSecondaryCoin.title == 'DGB.sha256'
									? coin.sha256['DGB.sha256'].P2PKH
									: currentSecondaryCoin.title == 'HTR'
									? coin.sha256.HTR.P2PKH
									: currentSecondaryCoin.title == 'XEC'
									? coin.sha256.XEC.P2PKH
									: currentSecondaryCoin.title == 'DGB.odo'
									? coin.odocrypt['DGB.odo'].P2PKH
									: currentSecondaryCoin.title == 'DGB.qubit'
									? coin.qubit['DGB.qubit'].P2PKH
									: currentSecondaryCoin.title == 'DOGE'
									? coin.scrypt.DOGE.P2PKH
									: currentSecondaryCoin.title == 'DGB.scrypt'
									? coin.scrypt['DGB.scrypt'].P2PKH
									: currentSecondaryCoin.title == 'LTC'
									? coin.scrypt.LTC.P2PKH
									: currentSecondaryCoin.title == 'DGB.skein'
									? coin.skein['DGB.skein'].P2PKH
									: currentSecondaryCoin.title == 'XPM'
									? coin.PrimePOW.XPM.P2PKH
									: ''
							}
						/>
						<label className={styles.formLabel} htmlFor="threshold">
							{
								userLang.current.settings[
									'payment-settings-form'
								].settings.paymentSettings
									.automaticPayoutThreshold
							}
						</label>
						<input
							className={styles.formInput}
							type="text"
							name="threshold"
							id="threshold"
							value={
								payoutThresholdPlaceholder !== null
									? `minPay= ${payoutThresholdPlaceholder} ${currentSecondaryCoin.title}`
									: ''
							}
							placeholder={
								currentSecondaryCoin.title == 'BTC'
									? 'minPay= 0.001 BTC'
									: currentSecondaryCoin.title == 'BCHN'
									? 'minPay= 0.005 BCHN'
									: currentSecondaryCoin.title == 'BSV'
									? 'minPay= 0.005 BSV'
									: currentSecondaryCoin.title == 'DGB.sha256'
									? 'minPay= 10 DGB.sha256'
									: currentSecondaryCoin.title == 'HTR'
									? 'minPay= 8 HTR'
									: currentSecondaryCoin.title == 'XEC'
									? 'minPay= 10000 XEC'
									: currentSecondaryCoin.title == 'DGB.odo'
									? 'minPay= 10 DGB.odo'
									: currentSecondaryCoin.title == 'DGB.qubit'
									? 'minPay= 10 DGB.qubit'
									: currentSecondaryCoin.title == 'DOGE'
									? 'minPay= 100 DOGE'
									: currentSecondaryCoin.title == 'DGB.scrypt'
									? 'minPay= 10 DGB.scrypt'
									: currentSecondaryCoin.title == 'LTC'
									? 'minPay= 0.01 LTC'
									: currentSecondaryCoin.title == 'DGB.skein'
									? 'minPay= 10 DGB.skein'
									: currentSecondaryCoin.title == 'XPM'
									? 'minPay= 10 XPM'
									: ''
							}
						/>
						<div className={styles.formSwitchContainer}>
							<Switch
								className={styles.formSwitch}
								onChange={(checked) => {
									setSwitchCheck(checked);
								}}
							/>
							<p className={styles.switchText}>
								{
									userLang.current.settings[
										'payment-settings-form'
									].settings.paymentSettings.autoPayoutEnabled
								}
							</p>
						</div>
						<Button
							className={styles.formButton}
							appearence="middle"
						>
							{
								userLang.current.settings[
									'payment-settings-form'
								].settings.paymentSettings.savePaymentSettings
							}
						</Button>
					</form>
					<div className={styles.infoBox}>
						<p className={styles.infoText}>
							{`An example of supported address formats and minimal
							allowed payout for ${currentSecondaryCoin.title}:`}
						</p>
					</div>
				</div>
			)}
			{settingsState == 'account-settings' && (
				<div className={styles.settingsBox}></div>
			)}
		</div>
	);
}
