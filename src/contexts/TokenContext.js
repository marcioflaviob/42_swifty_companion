import React, { createContext, useState, useEffect } from 'react';
import { fetchToken } from '../services/TokenService';

export const TokenContext = createContext(null);

export const TokenProvider = ({ children }) => {
	const [token, setToken] = useState(null);
	const [expiresAt, setExpiresAt] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	
	const getToken = async () => {
		try {
			const data = await fetchToken();
			setToken(data.access_token);
			setExpiresAt(Date.now() + data.expires_in * 1000);
			return data.access_token;
		} catch (err) {
			setError(err);
		} finally {
			setLoading(false);
		}
	};
	
	useEffect(() => {
		if (!token || expiresAt < Date.now()) getToken();
	}, []);

	return (
		<TokenContext.Provider value={{ token, loading, expiresAt, getToken, error }}>
			{children}
		</TokenContext.Provider>
	);
};
