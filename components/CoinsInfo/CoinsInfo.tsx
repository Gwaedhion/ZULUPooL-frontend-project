import styles from './CoinsInfo.module.css';
import CheckIcon from '../../public/homepage-icons/check-icon.svg';
import WarningIcon from '../../public/homepage-icons/warning-icon.svg';
import LineIcon from '../../public/homepage-icons/line-decoration.svg';
import { ICurrentState } from '@/app/(site)/page.interface';

export default function CoinsInfo({
	currentMainCoin,
	rowData,
}: ICurrentState): JSX.Element {
	return (
		<div>
			{rowData?.port == 5002 && (
				<div className={styles.portWarning}>
					<p className={styles.portWarningText}>
						Fast job switch! This backend, as the main one, uses a
						fast blockchain:{' '}
						{<span className={styles.textCoins}>DGB.sha256</span>}.
						This negatively affects device performance and the
						number of rejects.
					</p>
				</div>
			)}
			{rowData?.port == 5012 && (
				<div className={styles.portWarning}>
					<p className={styles.portWarningText}>
						Fast job switch! This backend, as the main one, uses a
						fast blockchain:{' '}
						{<span className={styles.textCoins}>DGB.scrypt</span>}.
						This negatively affects device performance and the
						number of rejects.
					</p>
				</div>
			)}

			<div className={styles.infoWrapper}>
				{currentMainCoin.id == 0 && (
					<div className={styles.coinAlerts}>
						<div className={styles.coinAlerts__item}>
							<CheckIcon className={styles.coinAlerts__icon} />
							<p>AsicBoost enabled</p>
						</div>
						<LineIcon className={styles.decoration__icon} />
						<div className={styles.coinAlerts__item}>
							<CheckIcon className={styles.coinAlerts__icon} />
							<p>Instance is compatible with NiceHash.</p>
						</div>
						<LineIcon className={styles.decoration__icon} />

						<div className={styles.coinAlerts__item}>
							<WarningIcon className={styles.coinAlerts__icon} />
							<p className={styles.coinAlerts__text}>
								Unfortunately, instance is not compatible with
								some Miningrigrentals rigs. You can use them at
								your own risk.
							</p>
						</div>
					</div>
				)}
				{currentMainCoin.id == 1 && (
					<div className={styles.coinAlerts}>
						<div className={styles.coinAlerts__item}>
							<WarningIcon className={styles.coinAlerts__icon} />
							<p className={styles.coinAlerts__text}>
								Unfortunately, instance is not compatible with
								NiceHash.
							</p>
						</div>
						<LineIcon className={styles.decoration__icon} />

						<div className={styles.coinAlerts__item}>
							<WarningIcon className={styles.coinAlerts__icon} />
							<p className={styles.coinAlerts__text}>
								Unfortunately, instance is not compatible with
								some Miningrigrentals rigs. You can use them at
								your own risk.
							</p>
						</div>
					</div>
				)}
				{currentMainCoin.id == 2 && (
					<div className={styles.coinAlerts}>
						<div className={styles.coinAlerts__item}>
							<WarningIcon className={styles.coinAlerts__icon} />
							<p className={styles.coinAlerts__text}>
								Unfortunately, instance is not compatible with
								NiceHash.
							</p>
						</div>
						<LineIcon className={styles.decoration__icon} />

						<div className={styles.coinAlerts__item}>
							<WarningIcon className={styles.coinAlerts__icon} />
							<p className={styles.coinAlerts__text}>
								Unfortunately, instance is not compatible with
								some Miningrigrentals rigs. You can use them at
								your own risk.
							</p>
						</div>
					</div>
				)}
				{currentMainCoin.id == 3 && (
					<div className={styles.coinAlerts}>
						<div className={styles.coinAlerts__item}>
							<CheckIcon className={styles.coinAlerts__icon} />
							<span>Instance is compatible with NiceHash.</span>
						</div>
						<LineIcon className={styles.decoration__icon} />

						<div className={styles.coinAlerts__item}>
							<WarningIcon className={styles.coinAlerts__icon} />
							<p className={styles.coinAlerts__text}>
								Unfortunately, instance is not compatible with
								some Miningrigrentals rigs. You can use them at
								your own risk.
							</p>
						</div>
					</div>
				)}
				{currentMainCoin.id == 4 && (
					<div className={styles.coinAlerts}>
						<div className={styles.coinAlerts__item}>
							<WarningIcon className={styles.coinAlerts__icon} />
							<p className={styles.coinAlerts__text}>
								Unfortunately, instance is not compatible with
								NiceHash.
							</p>
						</div>
						<LineIcon className={styles.decoration__icon} />

						<div className={styles.coinAlerts__item}>
							<WarningIcon className={styles.coinAlerts__icon} />
							<p className={styles.coinAlerts__text}>
								Unfortunately, instance is not compatible with
								some Miningrigrentals rigs. You can use them at
								your own risk.
							</p>
						</div>
					</div>
				)}
				{currentMainCoin.id == 5 && (
					<div className={styles.coinAlerts}>
						<div className={styles.coinAlerts__item}>
							<CheckIcon className={styles.coinAlerts__icon} />
							<p className={styles.coinAlerts__text}>
								Instance is compatible with NiceHash.
							</p>
						</div>
						<LineIcon className={styles.decoration__icon} />

						<div className={styles.coinAlerts__item}>
							<WarningIcon className={styles.coinAlerts__icon} />
							<p className={styles.coinAlerts__text}>
								Unfortunately, instance is not compatible with
								some Miningrigrentals rigs. You can use them at
								your own risk.
							</p>
						</div>
					</div>
				)}

				<div className={styles.secondaryInfoWrapper}>
					<div className={styles.secondaryInfo__payments}>
						<h1 className={styles.secondaryInfo__title}>
							Payments
						</h1>
						<p className={styles.secondaryInfo__text}>
							To receive payments, you need to configure the
							addresses and the threshold for payments for all
							backends which you are connecting to. There is no
							way to choose a particular coin for mining:
							switching between coins presented on the backend
							happens automatically based on our algo. In the case
							of Merged coins, mining is performed using all
							algorithms compatible with the presented merged
							coin.
						</p>
					</div>
					<div className={styles.secondaryInfo__support}>
						<h1 className={styles.secondaryInfo__title}>
							Support Information
						</h1>
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
					</div>
				</div>
			</div>
		</div>
	);
}
