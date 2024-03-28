import { IButtonProps } from './Button.props';
import cn from 'classnames';
import styles from './Button.module.css';
import CoinIcon from '../../public/button-icons/coin.svg';

export const Button = ({
	children,
	className,
	appearence,
	...props
}: IButtonProps): JSX.Element => {
	return (
		<button
			className={cn(styles.button, className, {
				[styles.small]: appearence == 'small',
				[styles.middle]: appearence == 'middle',
				[styles.big]: appearence == 'big',
				[styles.transparent]: appearence == 'transparent',
			})}
			{...props}
		>
			{children}
			{appearence == 'big' ? (
				<CoinIcon className={styles.coinIcon} />
			) : (
				''
			)}
		</button>
	);
};
