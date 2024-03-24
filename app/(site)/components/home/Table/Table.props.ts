import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ICoinInstance
	extends DetailedHTMLProps<
		HTMLAttributes<HTMLTableElement>,
		HTMLTableElement
	> {
	protocol: string;
	type: string;
	port: number;
	backends: string[];
	shareDiff?: number;
}
