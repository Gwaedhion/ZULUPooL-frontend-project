import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface IButtonProps
	extends DetailedHTMLProps<
		HTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	appearence: 'small' | 'middle' | 'big' | 'transparent' | 'pagination';
	children: ReactNode;
}
