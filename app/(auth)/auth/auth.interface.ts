export interface IuserApiCredentials {
	login: string;
	password: string;
	totp: string;
}

export interface IuserUiStatusData {
	status: string;
	sessionid: string;
	isReadOnly: boolean;
}

export interface IuserApiSession {
	id: string | null;
	sessionId: string | null;
}

export interface IuserUiSessionData {
	email: string | undefined;
	has2fa: boolean | undefined;
	isActive: boolean | undefined;
	isReadOnly: boolean | undefined;
	login: string | undefined;
	name: string | undefined;
	registrationDate: number | undefined;
	status: string | undefined;
}
