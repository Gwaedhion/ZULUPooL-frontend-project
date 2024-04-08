export interface IUserPayoutsPayload {
	coin: string;
	count: number;
	id: string | null;
	sessionId: string | null;
	timeFrom: number;
}

export interface IUserPayoutsResponse {
	payouts: [];
	status: string;
}
