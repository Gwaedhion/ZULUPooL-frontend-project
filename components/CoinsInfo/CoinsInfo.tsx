import styles from './CoinsInfo.module.css';
import CheckIcon from '../../public/homepage-icons/check-icon.svg';
import WarningIcon from '../../public/homepage-icons/warning-icon.svg';
import LineIcon from '../../public/homepage-icons/line-decoration.svg';
import { ICurrentState } from '@/app/(site)/page.interface';
import { useEffect, useRef, useState } from 'react';
import ru from '../../app/i18n/ru.json';
import en from '../../app/i18n/en.json';

export default function CoinsInfo({
	currentMainCoin,
	rowData,
}: ICurrentState): JSX.Element {
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

	return (
		<div>
			{rowData?.port == 5002 && (
				<div className={styles.portWarning}>
					<p className={styles.portWarningText}>
						{refLang.current.info.coinsInfo.jobSwitch}{' '}
						{<span className={styles.textCoins}>DGB.sha256</span>}.{' '}
						{refLang.current.info.coinsInfo.perfomanceWarning}
					</p>
				</div>
			)}
			{rowData?.port == 5012 && (
				<div className={styles.portWarning}>
					<p className={styles.portWarningText}>
						{refLang.current.info.coinsInfo.jobSwitch}{' '}
						{<span className={styles.textCoins}>DGB.scrypt</span>}.{' '}
						{refLang.current.info.coinsInfo.perfomanceWarning}
					</p>
				</div>
			)}

			<div className={styles.infoWrapper}>
				{currentMainCoin.id == 0 && (
					<div className={styles.coinAlerts}>
						<div className={styles.coinAlerts__item}>
							<CheckIcon className={styles.coinAlerts__icon} />
							<p>{refLang.current.info.coinsInfo.AsicBoost}</p>
						</div>
						<LineIcon className={styles.decoration__icon} />
						<div className={styles.coinAlerts__item}>
							<CheckIcon className={styles.coinAlerts__icon} />
							<p>
								{
									refLang.current.info.coinsInfo
										.NiceHashCompatible
								}
							</p>
						</div>
						<LineIcon className={styles.decoration__icon} />

						<div className={styles.coinAlerts__item}>
							<WarningIcon className={styles.coinAlerts__icon} />
							<p className={styles.coinAlerts__text}>
								{
									refLang.current.info.coinsInfo
										.MiningrigrentalsIncompatible
								}
							</p>
						</div>
					</div>
				)}
				{currentMainCoin.id == 1 && (
					<div className={styles.coinAlerts}>
						<div className={styles.coinAlerts__item}>
							<WarningIcon className={styles.coinAlerts__icon} />
							<p className={styles.coinAlerts__text}>
								{
									refLang.current.info.coinsInfo
										.NiceHashNotCompatible
								}
							</p>
						</div>
						<LineIcon className={styles.decoration__icon} />

						<div className={styles.coinAlerts__item}>
							<WarningIcon className={styles.coinAlerts__icon} />
							<p className={styles.coinAlerts__text}>
								{
									refLang.current.info.coinsInfo
										.MiningrigrentalsIncompatible
								}
							</p>
						</div>
					</div>
				)}
				{currentMainCoin.id == 2 && (
					<div className={styles.coinAlerts}>
						<div className={styles.coinAlerts__item}>
							<WarningIcon className={styles.coinAlerts__icon} />
							<p className={styles.coinAlerts__text}>
								{
									refLang.current.info.coinsInfo
										.NiceHashNotCompatible
								}
							</p>
						</div>
						<LineIcon className={styles.decoration__icon} />

						<div className={styles.coinAlerts__item}>
							<WarningIcon className={styles.coinAlerts__icon} />
							<p className={styles.coinAlerts__text}>
								{
									refLang.current.info.coinsInfo
										.MiningrigrentalsIncompatible
								}
							</p>
						</div>
					</div>
				)}
				{currentMainCoin.id == 3 && (
					<div className={styles.coinAlerts}>
						<div className={styles.coinAlerts__item}>
							<CheckIcon className={styles.coinAlerts__icon} />
							<span>
								{
									refLang.current.info.coinsInfo
										.NiceHashCompatible
								}
							</span>
						</div>
						<LineIcon className={styles.decoration__icon} />

						<div className={styles.coinAlerts__item}>
							<WarningIcon className={styles.coinAlerts__icon} />
							<p className={styles.coinAlerts__text}>
								{
									refLang.current.info.coinsInfo
										.MiningrigrentalsIncompatible
								}
							</p>
						</div>
					</div>
				)}
				{currentMainCoin.id == 4 && (
					<div className={styles.coinAlerts}>
						<div className={styles.coinAlerts__item}>
							<WarningIcon className={styles.coinAlerts__icon} />
							<p className={styles.coinAlerts__text}>
								{
									refLang.current.info.coinsInfo
										.NiceHashNotCompatible
								}
							</p>
						</div>
						<LineIcon className={styles.decoration__icon} />

						<div className={styles.coinAlerts__item}>
							<WarningIcon className={styles.coinAlerts__icon} />
							<p className={styles.coinAlerts__text}>
								{
									refLang.current.info.coinsInfo
										.MiningrigrentalsIncompatible
								}
							</p>
						</div>
					</div>
				)}
				{currentMainCoin.id == 5 && (
					<div className={styles.coinAlerts}>
						<div className={styles.coinAlerts__item}>
							<CheckIcon className={styles.coinAlerts__icon} />
							<p className={styles.coinAlerts__text}>
								{
									refLang.current.info.coinsInfo
										.NiceHashCompatible
								}
							</p>
						</div>
						<LineIcon className={styles.decoration__icon} />

						<div className={styles.coinAlerts__item}>
							<WarningIcon className={styles.coinAlerts__icon} />
							<p className={styles.coinAlerts__text}>
								{
									refLang.current.info.coinsInfo
										.MiningrigrentalsIncompatible
								}
							</p>
						</div>
					</div>
				)}

				<div className={styles.secondaryInfoWrapper}>
					<div className={styles.secondaryInfo__payments}>
						<h1 className={styles.secondaryInfo__title}>
							{refLang.current.info.coinsInfo.payments}
						</h1>
						<p className={styles.secondaryInfo__text}>
							{refLang.current.info.coinsInfo.recievePayments}
						</p>
					</div>
					<div className={styles.secondaryInfo__support}>
						<h1 className={styles.secondaryInfo__title}>
							Support Information
						</h1>
						{userLanguage == 'en-US' && (
							<p className={styles.secondaryInfo__text}>
								You can get support in{' '}
								<a
									className={styles.secondaryInfo__link}
									href="https://discord.com/invite/ugsST2BptA"
								>
									Discord
								</a>
								, or by email:{' '}
								<button
									className={styles.copyToClipboardButton}
									onClick={() => {
										navigator.clipboard.writeText(
											'pool@jsoncrypto.com'
										);
										alert(
											'E-mail address copied to clipboard!'
										);
									}}
								>
									pool@jsoncrypto.com
								</button>
							</p>
						)}
						{userLanguage == 'ru-RU' && (
							<p className={styles.secondaryInfo__text}>
								Вы можете получить поддержку в нашем канале{' '}
								<a
									className={styles.secondaryInfo__link}
									href="https://discord.com/invite/ugsST2BptA"
								>
									Дискорда
								</a>
								, или по электронной почте:{' '}
								<button
									className={styles.copyToClipboardButton}
									onClick={() => {
										navigator.clipboard.writeText(
											'pool@jsoncrypto.com'
										);
										alert(
											'Адрес электронной почты был скопирован!'
										);
									}}
								>
									pool@jsoncrypto.com
								</button>
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
