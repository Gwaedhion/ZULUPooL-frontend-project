export interface IUserStatsHistory {
	coin: string;
	groupByInterval: number;
	id: string;
	sessionId: string;
	timeFrom: number;
}

export interface IUserStatsHistoryResponse {
	currentTime: number;
	powerMultLog10: number;
	powerUnit: string;
	stats: [];
	status: string;
}
