export const API = {
	admin: {
		userGetSettings: process.env.NEXT_PUBLIC_ADMIN + '/api/userGetSettings',
		userGetCredentials:
			process.env.NEXT_PUBLIC_ADMIN + '/api/userGetCredentials',
		userEnumerateAll:
			process.env.NEXT_PUBLIC_ADMIN + '/api/userEnumerateAll',
		userEnumerateFeePlan:
			process.env.NEXT_PUBLIC_ADMIN + '/api/userEnumerateFeePlan',
		backendQueryCoins:
			process.env.NEXT_PUBLIC_ADMIN + '/api/backendQueryCoins',
		backendQueryUserStats:
			process.env.NEXT_PUBLIC_ADMIN + '/api/backendQueryUserStats',
		backendQueryUserStatsHistory:
			process.env.NEXT_PUBLIC_ADMIN + '/api/backendQueryUserStatsHistory',
		backendQueryPoolStats:
			process.env.NEXT_PUBLIC_ADMIN + '/api/backendQueryPoolStats',
		backendQueryPoolStatsHistory:
			process.env.NEXT_PUBLIC_ADMIN + '/api/backendQueryPoolStatsHistory',
		instanceEnumerateAll:
			process.env.NEXT_PUBLIC_ADMIN + '/api/instanceEnumerateAll',
		backendQueryPayouts:
			process.env.NEXT_PUBLIC_ADMIN + '/api/backendQueryPayouts',
		backendQueryProfitSwitchCoeff:
			process.env.NEXT_PUBLIC_ADMIN +
			'/api/backendQueryProfitSwitchCoeff',
		userLogin: '/api/userLogin',
	},
	user: {
		userGetSettings:
			process.env.NEXT_PUBLIC_DOMAIN + '/api/userGetSettings',
		userGetCredentials:
			process.env.NEXT_PUBLIC_DOMAIN + '/api/userGetCredentials',
		userEnumerateAll:
			process.env.NEXT_PUBLIC_DOMAIN + '/api/userEnumerateAll',
		instanceEnumerateAll:
			process.env.NEXT_PUBLIC_DOMAIN + '/api/instanceEnumerateAll',
		backendQueryCoins:
			process.env.NEXT_PUBLIC_DOMAIN + '/api/backendQueryCoins',
		backendQueryPayouts:
			process.env.NEXT_PUBLIC_DOMAIN + '/api/backendQueryPayouts',
		backendQueryUserStats:
			process.env.NEXT_PUBLIC_DOMAIN + '/api/backendQueryUserStats',
		backendQueryUserStatsHistory:
			process.env.NEXT_PUBLIC_DOMAIN +
			'/api/backendQueryUserStatsHistory',
		backendQueryFoundBlocks:
			process.env.NEXT_PUBLIC_DOMAIN + '/api/backendQueryFoundBlocks',
		userLogin: '/api/userLogin',
	},
};
