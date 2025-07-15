import axios from 'axios';

const API_URL = 'https://api.intra.42.fr/v2/';

export async function fetchUser(token, query) {
    try {
        const response = await axios.get(
		API_URL + `users/${query}`,
		{
			headers: {
				'Authorization': `Bearer ${token}`,
			},
		});
        return response.data;
    } catch {
		return null;
    }
}