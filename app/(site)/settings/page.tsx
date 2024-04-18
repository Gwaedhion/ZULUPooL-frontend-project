'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './page.module.css';
import cn from 'classnames';
import Link from 'next/link';
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

	const [coinToShow, setCoinToShow] =
		useState<IUserGetSettingsCoins | null>();

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

	return (
		<div className={styles.pageWrapper}>
			<div className={styles.settingsContainer}>
				<div className={styles.settingsPaymentOption}>
					<h3
						className={cn(styles.settingsTitle, {
							[styles.settingsTitle_active]:
								settingsState == 'payment-settings',
						})}
					>
						{
							userLang.current.settings['payment-settings-form']
								.settings.paymentSettings.title
						}
					</h3>
					<button
						className={styles.settingsButton}
						onClick={() => setSettingsState('payment-settings')}
					>
						<PaymentsSettingsIcon
							className={cn(styles.settingsIcon, {
								[styles.settingsIcon_active]:
									settingsState == 'payment-settings',
							})}
						/>
					</button>
				</div>
				<div className={styles.settingsAccountOption}>
					<h3
						className={cn(styles.settingsTitle, {
							[styles.settingsTitle_active]:
								settingsState == 'account-settings',
						})}
					>
						{
							userLang.current.settings['payment-settings-form']
								.settings.accountSettings.title
						}
					</h3>
					<button
						className={styles.settingsButton}
						onClick={() => setSettingsState('account-settings')}
					>
						<AccountSettingsIcon
							className={cn(styles.settingsIcon, {
								[styles.settingsIcon_active]:
									settingsState == 'account-settings',
							})}
						/>
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
							// placeholder={}
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
						/>
						<div className={styles.formSwitchContainer}>
							<Switch
								className={styles.formSwitch}
								onChange={(checked) => {
									setSwitchCheck(checked);
								}}
							/>
							{
								userLang.current.settings[
									'payment-settings-form'
								].settings.paymentSettings.autoPayoutEnabled
							}
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
				</div>
			)}
		</div>
	);
}
