'use client';
import { createContext, useEffect, useState } from 'react';

const Context = createContext({});
export const ContextProvider = ({ children }: any): JSX.Element => {
	const [userSession, setUserSession] = useState<string | null>('');
	const [isUserReadOnly, setIsUserReadOnly] = useState<string | null>();

	useEffect(() => {
		try {
			setUserSession(sessionStorage.getItem('sessionID'));
			setIsUserReadOnly(sessionStorage.getItem('isReadOnly'));
		} catch (e) {
			console.log(e);
		}
	}, []);
	return (
		<Context.Provider
			value={{
				userSession,
				setUserSession,
				isUserReadOnly,
				setIsUserReadOnly,
			}}
		>
			{children}
		</Context.Provider>
	);
};
