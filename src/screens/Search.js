import { Pressable, StyleSheet, Text, View, TextInput, Alert, ActivityIndicator } from 'react-native';
import { useContext, useState } from 'react';
import { fetchUser } from '../services/UserService';
import { TokenContext } from '../contexts/TokenContext';

export default function Search({ navigation }) {
	const [searchQuery, setSearchQuery] = useState('');
	const { token, loading, expiresAt, getToken } = useContext(TokenContext);
	const [isLoading, setIsLoading] = useState(false);

	const handleSearch = async () => {
		if (searchQuery.trim() === '') {
			Alert.alert('Error', 'Please enter a login to search');
			return;
		}
		setIsLoading(true);
		let realToken = token;
		if (expiresAt < Date.now()) {
			realToken = await getToken();
		}
		const user = await fetchUser(realToken, searchQuery);
		if (!user) {
			Alert.alert('Error', 'User not found or network error.');
			setIsLoading(false);
			return;
		}
		setIsLoading(false);
		navigation.navigate('Profile', { user });
	};

	if (loading) {
		return <View style={styles.container}><Text>Loading...</Text></View>;
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Search a login</Text>
			
			<View style={styles.searchContainer}>
				<TextInput
					style={styles.searchInput}
					placeholder="Enter login (e.g., mbrandao)"
					value={searchQuery}
					onChangeText={setSearchQuery}
					autoCapitalize="none"
					autoCorrect={false}
				/>
				<Pressable style={styles.searchButton} onPress={handleSearch} disabled={isLoading}>
					{isLoading ? (
						<ActivityIndicator color="#fff" size="small" />
					) : (
						<Text style={styles.searchButtonText}>Go</Text>
					)}
				</Pressable>
			</View>

		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
		backgroundColor: '#f8f9fa',
	},
	title: {
		fontSize: 24,
		fontWeight: '600',
		color: '#333',
		marginBottom: 30,
	},
	searchContainer: {
		width: '100%',
		maxWidth: 400,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
	},
	searchInput: {
		flex: 1,
		height: 50,
		backgroundColor: '#fff',
		borderWidth: 1,
		borderColor: '#e1e5e9',
		borderRadius: 8,
		paddingHorizontal: 16,
		fontSize: 16,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 2,
	},
	searchButton: {
		backgroundColor: '#007AFF',
		paddingHorizontal: 24,
		paddingVertical: 15,
		borderRadius: 8,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.15,
		shadowRadius: 3,
		elevation: 3,
	},
	searchButtonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '600',
	},
	button: {
		backgroundColor: '#007AFF',
		padding: 10,
		borderRadius: 5,
		marginBottom: 20,
	},
	buttonText: {
		color: 'white',
		fontWeight: 'bold',
	},
});