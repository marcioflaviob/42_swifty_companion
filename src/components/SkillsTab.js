import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SkillsTab({ user, selectedCursus }) {

	const getSkillsForCursus = () => {
		if (!selectedCursus || !selectedCursus.skills) return [];
		return selectedCursus.skills;
	};

	const renderSkillItem = (skill) => (
		<View key={skill.id} style={styles.itemCard}>
			<View style={styles.skillHeader}>
				<Text style={styles.itemTitle}>{skill.name}</Text>
				<Text style={styles.skillLevel}>Level {skill.level.toFixed(2)}</Text>
			</View>
			<View style={styles.skillBarContainer}>
				<View style={styles.skillBarBackground}>
					<View 
						style={[
							styles.skillBarFill, 
							{ width: `${Math.min((skill.level / 20) * 100, 100)}%` }
						]} 
					/>
				</View>
			</View>
		</View>
	);

	const skills = getSkillsForCursus();

	return (
		<View style={styles.container}>
			{skills.length > 0 ? (
				skills.map(renderSkillItem)
			) : (
				<Text style={styles.noDataText}>No skills found for this cursus</Text>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 16,
		marginTop: 8,
	},
	itemCard: {
		backgroundColor: '#fff',
		borderRadius: 12,
		padding: 16,
		marginBottom: 12,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	itemTitle: {
		fontSize: 16,
		fontWeight: '600',
		color: '#1a1a1a',
		flex: 1,
	},
	skillHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 12,
	},
	skillLevel: {
		fontSize: 14,
		fontWeight: '600',
		color: '#007AFF',
	},
	skillBarContainer: {
		width: '100%',
	},
	skillBarBackground: {
		height: 6,
		backgroundColor: '#e5e5e7',
		borderRadius: 3,
		overflow: 'hidden',
	},
	skillBarFill: {
		height: '100%',
		backgroundColor: '#007AFF',
		borderRadius: 3,
	},
	noDataText: {
		textAlign: 'center',
		fontSize: 16,
		color: '#666',
		marginTop: 32,
		fontStyle: 'italic',
	},
});
