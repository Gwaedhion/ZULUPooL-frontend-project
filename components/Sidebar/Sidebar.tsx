'use client';
import styles from './Sidebar.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from '@/components/Button/Button';
import cn from 'classnames';
import DarkThemeIcon from './dark-mode.svg';
import LightThemeIcon from './light-mode.svg';
import LoginIcon from '../../public/sidebar-icons/log-in.svg';
import CollapseIcon from '../../public/sidebar-icons/collapse.svg';
import ExpandIcon from '../../public/sidebar-icons/expand.svg';
import PoolHistoryIcon from '../../public/sidebar-icons/pool-history.svg';
import RewardsIcon from '../../public/sidebar-icons/info.svg';
import MonitorngIcon from '../../public/sidebar-icons/monitoring.svg';
import HistoryIcon from '../../public/sidebar-icons/history.svg';
import PayoutsIcon from '../../public/sidebar-icons/payouts.svg';
import SettingsIcon from '../../public/sidebar-icons/settings.svg';
import UserIcon from '../../public/sidebar-icons/user-icon.svg';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import { API } from '@/app/api';
import { IuserApiSession } from '@/app/(auth)/auth/auth.interface';
import { CircleFlag } from 'react-circle-flags';

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

export const Sidebar = ({ userTheme, userLanguage }: any): JSX.Element => {
	useEffect(() => {
		if (localStorage.length == 0) {
			localStorage.setItem('userTheme', 'light');
			localStorage.setItem('userLang', 'en-US');
		}
	});

	const pathname = usePathname();

	const [expanded, setExpanded] = useState(false);

	const router = useRouter();

	const userSession: IuserApiSession = {
		id: sessionStorage?.getItem('sessionID'),
		sessionId: sessionStorage?.getItem('sessionID'),
	};

	const [userName, setUserName] = useState('');

	const getUserName = async () => {
		await axios
			.post(API.user.userGetCredentials, JSON.stringify(userSession))
			.then((res) => setUserName(res.data.name));
	};

	useEffect(() => {
		getUserName();
	}, []);

	useEffect(() => {
		if (global.sessionStorage.length == 0 && pathname !== '/') {
			router.push('/auth');
		}
	}, [router, pathname]);

	const userLogout = async () => {
		await axios.post(API.user.userLogout, JSON.stringify(userSession));
		global.sessionStorage.clear();
		router.push('/auth');
	};

	useEffect(() => {
		if (localStorage.getItem('userTheme') == null) {
			localStorage.setItem('userTheme', 'light');
		}
	});

	useEffect(() => {
		if (localStorage.getItem('userLang') == null) {
			localStorage.setItem('userLang', 'en-US');
		}
	});

	const [theme, setTheme] = useState(localStorage.getItem('userTheme')!);

	const [language, setLanguage] = useState(localStorage.getItem('userLang')!);

	const toggleTheme = () => {
		if (localStorage.getItem('userTheme') == 'light') {
			localStorage.setItem('userTheme', 'dark');
			setTheme('dark');
		} else if (localStorage.getItem('userTheme') == 'dark') {
			localStorage.setItem('userTheme', 'light');
			setTheme('light');
		}
	};

	const toggleLanguage = () => {
		if (localStorage.getItem('userLang') == 'en-US') {
			localStorage.setItem('userLang', 'ru-RU');
			setLanguage('ru-RU');
		} else if (localStorage.getItem('userLang') == 'ru-RU') {
			localStorage.setItem('userLang', 'en-US');
			setLanguage('en-US');
		}
	};

	const engFlag = () => <CircleFlag countryCode="us" height="24" />;
	const ruFlag = () => <CircleFlag countryCode="ru" height="24" />;

	const handleUserTheme = (state: string) => {
		userTheme(state);
	};

	const handleUserLanguage = (state: string) => {
		userLanguage(state);
	};

	const handleLanguageChange = () => {
		toggleLanguage();
		router.refresh();
	};

	useEffect(() => {
		handleUserTheme(theme);
	});

	useEffect(() => {
		handleUserLanguage(language);
	});

	return (
		<aside
			className={cn(styles.sidebar, {
				[styles.expanded]: expanded,
				[styles.collapsed]: !expanded,
			})}
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
						<ExpandIcon
							className={cn(styles.expandIcon, {
								[styles.expandIcon_light]: theme === 'light',
								[styles.expandIcon_dark]: theme === 'dark',
							})}
						/>
					)}
				</button>
			</div>

			{expanded ? (
				<span className={styles.userName}>{userName}</span>
			) : (
				<span className={styles.userName}>
					<UserIcon className={styles.userIcon} />
				</span>
			)}
			<div className={styles.userExpBtnContainer}>
				<button
					className={styles.toggleLanguageButton}
					onClick={handleLanguageChange}
				>
					{language == 'en-US' ? engFlag() : ruFlag()}
				</button>
				<button
					className={styles.toggleThemeButton}
					onClick={toggleTheme}
				>
					{theme == 'light' ? (
						<DarkThemeIcon className={styles.themeIcon} />
					) : (
						<LightThemeIcon className={styles.themeIcon} />
					)}
				</button>
			</div>

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
				<Button
					className={styles.logOutBtn}
					appearence="middle"
					type="button"
					onClick={userLogout}
				>
					Log Out
				</Button>
			) : (
				<Button
					className={styles.logOutBtn_collapsed}
					appearence="small"
					type="button"
					onClick={userLogout}
				>
					<LoginIcon className={styles.loginIcon} />
				</Button>
			)}
		</aside>
	);
};
