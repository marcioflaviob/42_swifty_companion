import { Pressable, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import ProfileHeader from '../components/ProfileHeader';
import ProjectsTab from '../components/ProjectsTab';
import SkillsTab from '../components/SkillsTab';
import { useState } from 'react';

export default function Profile({ navigation, route }) {
	const { user } = route.params || {};
	const [selectedCursus, setSelectedCursus] = useState(() => {
		const cursus21 = user?.cursus_users?.find(cursus => cursus.cursus?.id === 21);
		return cursus21 || user?.cursus_users?.[0] || {};
	});
	const [activeTab, setActiveTab] = useState('projects');

	const goBack = () => {
		navigation.goBack();
	};

	const renderTabContent = () => {
		if (activeTab === 'projects') {
			return <ProjectsTab user={user} selectedCursus={selectedCursus} />;
		} else {
			return <SkillsTab user={user} selectedCursus={selectedCursus} />;
		}
	};

	if(!user) {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>No user data available</Text>
				<Pressable onPress={goBack} style={styles.button}>
					<Text style={styles.buttonText}>Go Back</Text>
				</Pressable>
			</View>
		);
	}

	return (
		<ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container}>
			<ProfileHeader user={user} selectedCursus={selectedCursus} setSelectedCursus={setSelectedCursus} />
			
			<View style={styles.tabContainer}>
				<TouchableOpacity 
					style={[styles.tab, activeTab === 'projects' && styles.activeTab]}
					onPress={() => setActiveTab('projects')}
				>
					<Text style={[styles.tabText, activeTab === 'projects' && styles.activeTabText]}>
						Projects
					</Text>
				</TouchableOpacity>
				<TouchableOpacity 
					style={[styles.tab, activeTab === 'skills' && styles.activeTab]}
					onPress={() => setActiveTab('skills')}
				>
					<Text style={[styles.tabText, activeTab === 'skills' && styles.activeTabText]}>
						Skills
					</Text>
				</TouchableOpacity>
			</View>
			{renderTabContent()}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	scrollContainer: {
		backgroundColor: '#f8f9fa',
	},
	container: {
		flexGrow: 1,
		padding: 16,
		minHeight: '100%',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
		textAlign: 'center',
		color: '#333',
	},
	tabContainer: {
		flexDirection: 'row',
		backgroundColor: '#fff',
		borderRadius: 12,
		marginHorizontal: 16,
		marginTop: 16,
		marginBottom: 8,
		padding: 4,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	tab: {
		flex: 1,
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderRadius: 8,
		alignItems: 'center',
	},
	activeTab: {
		backgroundColor: '#007AFF',
	},
	tabText: {
		fontSize: 16,
		fontWeight: '600',
		color: '#666',
	},
	activeTabText: {
		color: '#fff',
	},
});