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
