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
