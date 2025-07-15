import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from './src/screens/Search';
import SecondScreen from './src/screens/Profile';
import { TokenProvider } from './src/contexts/TokenContext';

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<TokenProvider>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Search">
					<Stack.Screen name="Search" component={Search} />
					<Stack.Screen name="Profile" component={SecondScreen} />
				</Stack.Navigator>
				<StatusBar style="auto" />
			</NavigationContainer>
		</TokenProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});