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

export interface IHandleCurrentCoin {
	currentSecondaryCoin: ICurrentCoin;
	setCurrentSecondaryCoin: Dispatch<SetStateAction<ICurrentCoin>>;
	currentMainCoin: ICurrentCoin;
	setCurrentMainCoin: Dispatch<SetStateAction<ICurrentCoin>>;
}

export interface ICurrentState {
	currentMainCoin: ICurrentCoin;
	rowData: IInstance;
}
