export interface IStatisticsResponse {
	status: string;
	stats: IStatisticsData[];
}

export interface IStatisticsData {
	name: string;
	time: number;
	shareRate: number;
	shareWork: number;
	power: number;
}

export interface IStatisticsUIData {
	name: string;
	time: string;
	shareRate: string;
	shareWork: string;
	power: string;
}
