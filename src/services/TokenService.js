import axios from 'axios';

const API_URL = 'https://api.intra.42.fr/oauth/token';

const client_id = process.env.EXPO_PUBLIC_API_UID;
const client_secret = process.env.EXPO_PUBLIC_API_SECRET;

export async function fetchToken() {
    if (!client_id || !client_secret) {
        throw new Error('API credentials are not set in the environment variables.');
    }

    try {
        const response = await axios.post(
            `${API_URL}?grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`,
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Failed to fetch token:', error);
    }
}