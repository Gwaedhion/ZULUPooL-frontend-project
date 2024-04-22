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

export interface IUserGetCredentialsResponse {
	email: string;
	has2fa: boolean;
	isActive: boolean;
	isReadOnly: boolean;
	login: string;
	name: string;
	registrationDate: number;
	status: string;
}
