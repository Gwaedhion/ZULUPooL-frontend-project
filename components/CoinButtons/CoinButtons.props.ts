import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { ICurrentCoin } from '../../app/(site)/page.interface';

export interface ICoinButtonProps
	extends DetailedHTMLProps<
		HTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {}
