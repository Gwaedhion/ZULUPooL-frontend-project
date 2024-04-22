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
	IUserGetCredentialsResponse,
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

	const [paymentAddressValue, setPaymentAddressValue] = useState('');

	const getPaymentAddressPlaceholder = () => {
		arr?.forEach((element) => {
			if (element.name == currentSecondaryCoin.title) {
				setPaymentAddressValue(element.address);
			}
		});
		console.log(paymentAddressValue);
	};

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
	}, [currentSecondaryCoin]);

	const coin = userLang.current.settings['payment-settings-form'].coins;

	const checkPaymentAddress = () => {
		if (paymentAddressValue !== null) {
			return paymentAddressValue;
		} else return 'none';
	};

	const [credentialsApi, setCredentialsApi] =
		useState<IUserGetCredentialsResponse>();

	const getUserCredentials = () => {
		axios
			.post(API.user.userGetCredentials, JSON.stringify(userSessionId))
			.then((res) => setCredentialsApi(res.data));
	};

	const date = new Date(
		credentialsApi?.registrationDate! * 1000
	).toLocaleDateString(navigator.language, {
		day: '2-digit',
		month: '2-digit',
		year: '2-digit',
	});

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
						<span
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
						</span>
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
						onClick={() => {
							setSettingsState('account-settings');
							getUserCredentials();
						}}
					>
						<AccountSettingsIcon
							className={cn(styles.settingsIcon, {
								[styles.settingsIcon_activePurple]:
									settingsState == 'account-settings',
							})}
						/>
						<span
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
						</span>
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
						<p className={styles.formText}>
							{`${
								userLang.current.settings[
									'payment-settings-form'
								].settings.paymentSettings.currentAddress
							}: ${checkPaymentAddress()}`}
						</p>
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
							{`${userLang.current.settings['payment-settings-form'].settings.paymentSettings.example} ${currentSecondaryCoin.title}:`}
						</p>
					</div>
				</div>
			)}
			{settingsState == 'payment-settings' && (
				<div className={styles.settingsBox}>
					{currentSecondaryCoin.title == 'BTC' ? (
						<p className={styles.addressFormat}>
							P2PKH: 13xDZX65TFmeFgowMJsJvutmSxUttwkE3f,
							<br />
							P2SH: 3H28N5WuREZ93CNmhWcRcrnykWrMqkhFyWN,
							<br />
							Bech32: bc1uf5tdn87k2uz7r2kl5zrfww362ch3746lq5vse7
							<br />
							minPay= 0.001 BTC
						</p>
					) : (
						<></>
					)}
					{currentSecondaryCoin.title == 'BCHN' ? (
						<p className={styles.addressFormat}>
							P2PKH: 13xDZX65TFmeFgowMJsJvutmSxUttwkE3f,
							<br />
							Bech32: qqsxr824tvsq72tv7x43xa346zn7f78pkqssr5lavh
							<br />
							minPay= 0.005 BCHN
						</p>
					) : (
						<></>
					)}
					{currentSecondaryCoin.title == 'BSV' ? (
						<p className={styles.addressFormat}>
							P2PKH: 13xDZX65TFmeFgowMJsJvutmSxUttwkE3f minPay=
							0.005 BSV
						</p>
					) : (
						<></>
					)}
					{currentSecondaryCoin.title == 'DGB.sha256' ? (
						<p className={styles.addressFormat}>
							P2PKH: DSMvc9BbM8vtrjPSpMaXmQVXWZsgA92Wxc,
							<br />
							P2SH: SRsJzf5XL19LDff1paPzRB6p6Va6NmW8Pc,
							<br />
							Bech32: dgb1q5d0dypakqz326jhuqzsspdkys0dxs5ztckrtl9
							<br />
							minPay= 10 DGB.sha256
						</p>
					) : (
						<></>
					)}
					{currentSecondaryCoin.title == 'HTR' ? (
						<p className={styles.addressFormat}>
							P2PKH: HTjxTEAUSwZf34nK4YuicfDPocT7JsQwJi minPay= 8
							HTR
						</p>
					) : (
						<></>
					)}
					{currentSecondaryCoin.title == 'XEC' ? (
						<p className={styles.addressFormat}>
							P2PKH:13xDZX65TFmeFgowMJsJvutmSxUttwkE3f,
							<br />
							Bech32:qqsxr824tvsq72tv7x43xa346zn7f78pkqfahly82q
							<br />
							minPay= 10000 XEC
						</p>
					) : (
						<></>
					)}
					{currentSecondaryCoin.title == 'DGB.odo' ? (
						<p className={styles.addressFormat}>
							P2PKH:DSMvc9BbM8vtrjPSpMaXmQVXWZsgA92Wxc,
							<br />
							P2SH:SRsJzf5XL19LDff1paPzRB6p6Va6NmW8Pc,
							<br />
							Bech32:dgb1q5d0dypakqz326jhuqzsspdkys0dxs5ztckrtl9
							<br />
							minPay= 10 DGB.odo
						</p>
					) : (
						<></>
					)}
					{currentSecondaryCoin.title == 'DGB.qubit' ? (
						<p className={styles.addressFormat}>
							P2PKH:DSMvc9BbM8vtrjPSpMaXmQVXWZsgA92Wxc,
							<br />
							P2SH:SRsJzf5XL19LDff1paPzRB6p6Va6NmW8Pc,
							<br />
							Bech32:dgb1q5d0dypakqz326jhuqzsspdkys0dxs5ztckrtl9
							<br />
							minPay= 10 DGB.qubit
						</p>
					) : (
						<></>
					)}
					{currentSecondaryCoin.title == 'LTC' ? (
						<p className={styles.addressFormat}>
							P2PKH:LcgdQuT7TPbo5X2qSfTi4Kbvov3p1uzeAK,
							<br />
							P2SH:MKYXKMckKUgYX1tTPuEjLtGQ6jiBXhpf39 minPay= 0.01
							LTC
						</p>
					) : (
						<></>
					)}
					{currentSecondaryCoin.title == 'DGB.scrypt' ? (
						<p className={styles.addressFormat}>
							P2PKH:DSMvc9BbM8vtrjPSpMaXmQVXWZsgA92Wxc,
							<br />
							P2SH:SRsJzf5XL19LDff1paPzRB6p6Va6NmW8Pc,
							<br />
							Bech32:dgb1q5d0dypakqz326jhuqzsspdkys0dxs5ztckrtl9
							<br />
							minPay= 10 DGB.scrypt
						</p>
					) : (
						<></>
					)}
					{currentSecondaryCoin.title == 'DOGE' ? (
						<p className={styles.addressFormat}>
							P2PKH:DMHMEs1KBhFPuVtwUTCGTtJQSuCmyETxVH minPay= 100
							DOGE
						</p>
					) : (
						<></>
					)}
					{currentSecondaryCoin.title == 'DGB.skein' ? (
						<p className={styles.addressFormat}>
							P2PKH:DSMvc9BbM8vtrjPSpMaXmQVXWZsgA92Wxc,
							<br />
							P2SH:SRsJzf5XL19LDff1paPzRB6p6Va6NmW8Pc,
							<br />
							Bech32:dgb1q5d0dypakqz326jhuqzsspdkys0dxs5ztckrtl9
							<br />
							minPay= 10 DGB.skein
						</p>
					) : (
						<></>
					)}
					{currentSecondaryCoin.title == 'XPM' ? (
						<p className={styles.addressFormat}>
							P2PKH:AZ6QziuQaHDZkwWr125jSJcs23s7PjgzRb minPay= 10
							XPM
						</p>
					) : (
						<></>
					)}
				</div>
			)}
			{settingsState == 'account-settings' && (
				<form className={cn(styles.settingsBox, styles.form)}>
					<div className={styles.accSettingsContainer}>
						<span className={styles.accSettingsTitle}>E-mail</span>
						<p>{credentialsApi?.email}</p>
					</div>
					<div className={styles.accSettingsContainer}>
						<span className={styles.accSettingsTitle}>
							Two factor authentication
							<Switch />
						</span>
					</div>
					<div className={styles.accSettingsContainer}>
						<span className={styles.accSettingsTitle}>
							Registration Date
						</span>
						<p>{date}</p>
					</div>
					<div className={styles.accSettingsContainer}>
						<span className={styles.accSettingsTitle}>
							Public name
						</span>
						<input
							type="text"
							className={styles.formInput}
							name="public-name"
							id="public-name"
							placeholder={credentialsApi?.name}
						/>
					</div>
					<div className={styles.accSettingsContainer}>
						<Button appearence="middle">Save public name</Button>
					</div>
				</form>
			)}
		</div>
	);
}
