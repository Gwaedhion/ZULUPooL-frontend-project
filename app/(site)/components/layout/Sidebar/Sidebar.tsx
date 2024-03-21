import { ISidebarProps } from './Sidebar.props';
import styles from './Sidebar.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/Button/Button';
import DarkModeIcon from './dark-mode.svg';
import PoolHistoryIcon from '../../../../../public/sidebar-icons/pool-history.svg';
import RewardsIcon from '../../../../../public/sidebar-icons/info.svg';
import MonitorngIcon from '../../../../../public/sidebar-icons/monitoring.svg';
import HistoryIcon from '../../../../../public/sidebar-icons/history.svg';
import PayoutsIcon from '../../../../../public/sidebar-icons/payouts.svg';
import SettingsIcon from '../../../../../public/sidebar-icons/settings.svg';

const sidebarItems = [
	{
		id: 0,
		name: 'Pool History',
		href: '/history-pool',
	},
	{
		id: 1,
		name: 'Info',
		href: '/info',
	},
	{
		id: 2,
		name: 'Monitoring',
		href: '/monitoring',
	},
	{
		id: 3,
		name: 'History',
		href: '/history',
	},
	{
		id: 4,
		name: 'Payouts',
		href: '/payouts',
	},
	{
		id: 5,
		name: 'Settings',
		href: '/settings',
	},
];

const iconsArray = [
	<PoolHistoryIcon className={styles.nav__icon} key={sidebarItems[0].id} />,
	<RewardsIcon className={styles.nav__icon} key={sidebarItems[1].id} />,
	<MonitorngIcon className={styles.nav__icon} key={sidebarItems[2].id} />,
	<HistoryIcon className={styles.nav__icon} key={sidebarItems[3].id} />,
	<PayoutsIcon className={styles.nav__icon} key={sidebarItems[4].id} />,
	<SettingsIcon className={styles.nav__icon} key={sidebarItems[5].id} />,
];

export const Sidebar = ({ ...props }: ISidebarProps): JSX.Element => {
	return (
		<div className={styles.sidebar}>
			<Link href="/">
				<Image
					className={styles.logo}
					src={'/full-logo.svg'}
					alt="ZULUPooL logo"
					width={200}
					height={100}
					priority={true}
				></Image>
			</Link>
			<Image
				className={styles.userIcon}
				src={'/user-icon.svg'}
				alt="user icon"
				width={100}
				height={100}
			/>
			<div className={styles.container}>
				<span className={styles.userName}>Username</span>
				<button className={styles.toggleThemeButton}>
					<DarkModeIcon
						className={styles.themeIcon}
						src={'/dark-mode.svg'}
						alt="Dark theme icon"
						width={24}
						height={24}
					/>
				</button>
			</div>

			<ul className={styles.nav}>
				{sidebarItems.map((item) => (
					<li key={item.name} className={styles.nav__item}>
						<Link className={styles.nav__link} href={item.href}>
							{iconsArray.find((i) => Number(i.key) == item.id) &&
								iconsArray[item.id]}
							{<p className={styles.nav__text}>{item.name}</p>}
						</Link>
					</li>
				))}
			</ul>
			<Button appearence="middle">Login</Button>
		</div>
	);
};
