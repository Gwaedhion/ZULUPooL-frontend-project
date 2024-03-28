'use client';
import { ISidebarProps } from './Sidebar.props';
import styles from './Sidebar.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/Button/Button';
import ToggleThemeIcon from './dark-mode.svg';
import LoginIcon from '../../public/sidebar-icons/log-in.svg';
import CollapseIcon from '../../public/sidebar-icons/collapse.svg';
import ExpandIcon from '../../public/sidebar-icons/expand.svg';
import { useState } from 'react';
import cn from 'classnames';
import PoolHistoryIcon from '../../public/sidebar-icons/pool-history.svg';
import RewardsIcon from '../../public/sidebar-icons/info.svg';
import MonitorngIcon from '../../public/sidebar-icons/monitoring.svg';
import HistoryIcon from '../../public/sidebar-icons/history.svg';
import PayoutsIcon from '../../public/sidebar-icons/payouts.svg';
import SettingsIcon from '../../public/sidebar-icons/settings.svg';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const sidebarItems = [
	{
		id: 0,
		name: 'Pool Statistics',
		href: '/pool-stats',
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
	const pathname = usePathname();
	const [expanded, setExpanded] = useState(false);
	return (
		<aside
			className={cn(styles.sidebar, {
				[styles.expanded]: expanded,
				[styles.collapsed]: !expanded,
			})}
			{...props}
		>
			<div className={styles.logoWrapper}>
				<Link className={styles.homeLink} href="/">
					<Image
						className={styles.logo}
						src={'/full-logo.svg'}
						alt="ZULUPooL logo"
						width={230}
						height={100}
						priority={true}
					/>
				</Link>
				<button
					className={styles.sidebarBtn}
					onClick={() => {
						setExpanded((currState) => !currState);
					}}
				>
					{expanded ? (
						<CollapseIcon className={styles.collapseIcon} />
					) : (
						<ExpandIcon className={styles.expandIcon} />
					)}
				</button>
			</div>

			{expanded ? (
				<span className={styles.userName}>Username</span>
			) : (
				<span className={styles.userName}>&nbsp;</span>
			)}
			<button className={styles.toggleThemeButton}>
				<ToggleThemeIcon
					className={styles.themeIcon}
					src={'/dark-mode.svg'}
					alt="Dark theme icon"
					width={24}
					height={24}
				/>
			</button>
			<ul className={styles.nav}>
				{sidebarItems.map((item) => {
					const isActive = pathname.startsWith(item.href);

					return (
						<li key={item.name} className={styles.nav__item}>
							<Link
								className={cn(styles.nav__link, {
									[styles.isActive]: isActive,
								})}
								href={item.href}
								style={
									expanded
										? { paddingLeft: 70 }
										: { justifyContent: 'center' }
								}
								key={item.name}
							>
								{iconsArray.find(
									(i) => Number(i.key) == item.id
								) && iconsArray[item.id]}
								{expanded ? (
									<p className={styles.nav__text}>
										{item.name}
									</p>
								) : (
									<span></span>
								)}
							</Link>
						</li>
					);
				})}
			</ul>
			{expanded ? (
				<Button className={styles.loginBtn} appearence="middle">
					<LoginIcon className={styles.loginIcon} />
					Login
				</Button>
			) : (
				<Button
					className={styles.loginBtn_collapsed}
					appearence="small"
				>
					<LoginIcon className={styles.loginIcon} />
				</Button>
			)}
		</aside>
	);
};
