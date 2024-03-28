import { IRewardsProps } from './Rewards.props';
import styles from './Rewards.module.css';
import CalculatorIcon from '../../public/rewards-icons/calculator-icon.svg';
import GraphIcon from '../../public/rewards-icons/graph-icon.svg';
import AlertIcon from '../../public/rewards-icons/alert-icon.svg';
import DiscordIcon from '../../public/rewards-icons/discord-icon.svg';
import FullLogo from '../../public/full-logo.svg';
import Link from 'next/link';

export default function Rewards({ ...props }: IRewardsProps): JSX.Element {
	return (
		<div className={styles.wrapper} {...props}>
			<h1 className={styles.title}>Rewards</h1>
			<div className={styles.block}>
				<div className={styles.textContainer}>
					<h2 className={styles.subTitle}>
						You can work in PPDALN+ mode
					</h2>
					<h2 className={styles.subTitle}>
						PPDALN+ (Pay Per Difficulty Accepted for Last N rounds +
						fee)
					</h2>
					<div className={styles.paragraphContainer}>
						<span className={styles.iconContainer}>
							<CalculatorIcon className={styles.icon} />
						</span>
						<p className={styles.text}>
							Under{' '}
							<span className={styles.styledText}>PPDALN+</span>{' '}
							mode, whenever a block is found, profits are
							calculated based on accepted difficulty miners
							contributed to{' '}
							<span className={styles.styledText}>ZULUPooL</span>™
							in the last{' '}
							<span className={styles.styledText}>N</span> rounds.
							Meanwhile, miner fees will be allocated to miners,
							too. Accepted difficulty is calculated as the sum of
							all accepted valid jobs (shares) multiplied by the
							target of that job (share target).
						</p>
					</div>
					<div className={styles.paragraphContainer}>
						<span className={styles.iconContainer}>
							<GraphIcon className={styles.icon} />
						</span>
						<p className={styles.text}>
							With{' '}
							<span className={styles.styledText}>PPDALN+</span>,
							miners&apos; payout is related to the blocks mined
							out. Therefore, miners may face unstable yields, but
							they will enjoy higher profits in the long term. If
							several coins are activated on the instance used
							(excluding coin merged), there is an automatic
							distribution of computing power between coins, based
							on our switching algorithm. In this mode, there may
							be more prolonged unstable yields, but the
							utilization of the hashrate occurs as efficiently as
							possible, which also has a positive effect for
							profits in the long term.
						</p>
					</div>
					<div className={styles.paragraphContainer}>
						<span className={styles.iconContainer}>
							<AlertIcon className={styles.icon} />
						</span>
						<p className={styles.text}>
							The payment transaction network fee is{' '}
							<span className={styles.styledText}>
								deducted from the amount sent
							</span>{' '}
							. Using{' '}
							<span className={styles.styledText}>PPDALN+</span>{' '}
							mode you get{' '}
							<span className={styles.styledText}>96.25%</span> of
							the reward. +0.15%, if invited by our partners.
							Also, up to + 0.15% income of referrals, (for our
							partners). Contact our Discord channel administrator
							to discuss potential partnerships.{' '}
							<span className={styles.styledText}>ETC: 99%</span>{' '}
							of the reward, including MeV.
						</p>
					</div>
					<div className={styles.linksContainer}>
						<span>
							<a
								href="https://discord.com/invite/ugsST2BptA"
								className={styles.link}
							>
								<DiscordIcon />
							</a>
						</span>
						<span>
							<Link href={'/'} className={styles.link}>
								<FullLogo />
							</Link>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
