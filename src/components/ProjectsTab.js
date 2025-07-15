import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProjectsTab({ user, selectedCursus }) {

	const getProjectsForCursus = () => {
		if (!selectedCursus || !user?.projects_users) return [];
		return user.projects_users.filter(project => 
			project.cursus_ids?.includes(selectedCursus.cursus?.id)
		);
	};

	const renderProjectItem = (project) => {
        return (
            <View key={project.id} style={styles.itemCard}>
                <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{project.project?.name || 'Unknown Project'}</Text>
                    {project.final_mark !== null && (
                        <View style={[
                            styles.scoreContainer,
                            { backgroundColor: project.final_mark >= 70 ? '#4CAF50' : '#F44336' }
                        ]}>
                            <Text style={styles.scoreText}>{project.final_mark}</Text>
                        </View>
                    )}
                </View>
                {project.status && (
                    <Text style={[
                        styles.statusText,
                        { color: (project.status === 'finished' || project['validated?']) ? '#4CAF50' : '#FF9800' }
                    ]}>
                        Status: {project['validated?'] ? "Finished" : project.status}
                    </Text>
                )}
                {project.validated_at && (
                    <Text style={styles.dateText}>
                        Completed: {new Date(project.validated_at).toLocaleDateString()}
                    </Text>
                )}
            </View>
	    )
    };

	const projects = getProjectsForCursus();

	return (
		<View style={styles.container}>
			{projects.length > 0 ? (
				projects.map(renderProjectItem)
			) : (
				<Text style={styles.noDataText}>No projects found for this cursus</Text>
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
	itemHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 8,
	},
	itemTitle: {
		fontSize: 16,
		fontWeight: '600',
		color: '#1a1a1a',
		flex: 1,
	},
	scoreContainer: {
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 6,
		minWidth: 40,
		alignItems: 'center',
	},
	scoreText: {
		color: '#fff',
		fontSize: 14,
		fontWeight: '600',
	},
	statusText: {
		fontSize: 14,
		fontWeight: '500',
		marginBottom: 4,
		textTransform: 'capitalize',
	},
	dateText: {
		fontSize: 12,
		color: '#666',
	},
	noDataText: {
		textAlign: 'center',
		fontSize: 16,
		color: '#666',
		marginTop: 32,
		fontStyle: 'italic',
	},
});
