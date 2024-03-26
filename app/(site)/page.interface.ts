import { Dispatch, SetStateAction } from 'react';

export interface IHomeApi {
	status: string;
	instances: IInstance[];
}

export interface IInstance {
	protocol: string;
	type: string;
	port: number;
	backends: string[];
	shareDiff?: number;
}

export interface ICurrentCoin {
	title: string;
	id: number;
}

export interface ICoin {
	value: ICurrentCoin;
	setValue: Dispatch<SetStateAction<ICurrentCoin>>;
}
