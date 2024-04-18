export interface IUserGetSettingsResponse {
	coins: IUserGetSettingsCoins[];
	status: string;
}

export interface IUserGetSettingsCoins {
	address: string;
	autoPayoutEnabled: boolean;
	name: string;
	payoutThreshold: string;
}
