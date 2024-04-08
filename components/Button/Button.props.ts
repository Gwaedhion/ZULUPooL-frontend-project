import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export interface IButtonProps
	extends DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	appearence: 'small' | 'middle' | 'big' | 'transparent' | 'pagination';
	children: ReactNode;
}
