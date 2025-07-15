import React, { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';

export default function ProfileHeader({ user, selectedCursus, setSelectedCursus }) {
    
	if (!user) {
		return null;
	}

    const cursusList = user.cursus_users || [];
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
    const dropdownButtonRef = useRef(null);
    
    const grade = selectedCursus.grade || 'Student';
    const cursusLabel = selectedCursus.cursus.name || 'Cursus';
    const campus = user.campus?.find(c => c.is_primary) || user.campus?.[0];
    const profileImage = user.image?.versions?.medium || user.image?.link;
    const evaluationPoints = user.correction_point || 0;
    const walletPoints = user.wallet || 0;
    const level = selectedCursus.level || 0;

    const openDropdown = () => {
        dropdownButtonRef.current.measure((fx, fy, width, height, px, py) => {
            setDropdownPosition({ top: py + height + 4, left: px, width });
            setDropdownVisible(true);
        });
    };

	return (
		<View style={styles.container}>
			<View style={styles.backgroundGradient} />
			<View style={styles.headerContent}>
				<View style={styles.imageContainer}>
					{profileImage ? (
						<Image 
							source={{ uri: profileImage }} 
							style={styles.profileImage}
							resizeMode="cover"
						/>
					) : (
						<View style={styles.placeholderImage}>
							<Text style={styles.placeholderText}>
								{user.first_name?.[0]}{user.last_name?.[0]}
							</Text>
						</View>
					)}
				</View>
				<View style={styles.userInfo}>
					<Text style={styles.displayName}>{user.usual_full_name || user.displayname}</Text>
                    <View style={styles.loginCampusContainer}>
                        <Text style={styles.login}>@{user.login}</Text>
                        {campus && (
                            <View style={styles.campusContainer}>
                                <Text style={styles.campusText}>📍 {campus.city}, {campus.country}</Text>
                            </View>
                        )}
                    </View>

                    {cursusList.length > 0 && (
                        <View style={styles.cursusDropdownContainer}>
                            <TouchableOpacity 
                                ref={dropdownButtonRef}
                                style={styles.cursusDropdownButton}
                                onPress={openDropdown}
                            >
                                <Text style={styles.cursusDropdownText}>
                                    {`${grade} at ${cursusLabel}`}
                                </Text>
                                <Text style={styles.dropdownArrow}>▼</Text>
                            </TouchableOpacity>
                            
                            <Modal
                                transparent={true}
                                visible={dropdownVisible}
                                animationType="fade"
                                onRequestClose={() => setDropdownVisible(false)}
                            >
                                <TouchableOpacity 
                                    style={styles.dropdownOverlay}
                                    activeOpacity={1}
                                    onPressOut={() => setDropdownVisible(false)}
                                >
                                    <View
                                        onStartShouldSetResponder={() => true}
                                        style={[
                                            styles.dropdownContent, 
                                            { 
                                                top: dropdownPosition.top, 
                                                left: dropdownPosition.left, 
                                                width: dropdownPosition.width 
                                            }
                                        ]}
                                    >
                                        <ScrollView
                                            showsVerticalScrollIndicator={false}
                                            nestedScrollEnabled={true}
                                        >
                                            {cursusList.map((item, index) => {
                                                const label = `${item.grade || 'Student'} at ${item.cursus.name || 'Cursus'}`;
                                                return (
                                                    <TouchableOpacity
                                                        key={item.id?.toString() || index.toString()}
                                                        style={[
                                                            styles.cursusOption,
                                                            selectedCursus.id === item.id && styles.cursusOptionSelected
                                                        ]}
                                                        onPress={() => {
                                                            setSelectedCursus(item);
                                                            setDropdownVisible(false);
                                                        }}
                                                    >
                                                        <Text style={[
                                                            styles.cursusOptionText,
                                                            selectedCursus.id === item.id && styles.cursusOptionTextSelected
                                                        ]}>
                                                            {label}
                                                        </Text>
                                                    </TouchableOpacity>
                                                );
                                            })}
                                        </ScrollView>
                                    </View>
                                </TouchableOpacity>
                            </Modal>
                        </View>
                    )}
				</View>
			</View>
			<View style={styles.statsContainer}>
				<View style={styles.statItem}>
					<Text style={styles.statValue}>Level {Math.floor(level)}</Text>
					<Text style={styles.statLabel}>Current Level</Text>
					<View style={styles.levelBarContainer}>
						<View style={styles.levelBarBackground}>
							<View 
								style={[
									styles.levelBarFill, 
									{ width: `${((level % 1) * 100)}%` }
								]} 
							/>
						</View>
					</View>
				</View>
				<View style={styles.statItem}>
					<Text style={styles.statValue}>{evaluationPoints}</Text>
					<Text style={styles.statLabel}>Evaluation Points</Text>
				</View>
				<View style={styles.statItem}>
					<Text style={styles.statValue}>{walletPoints} ₳</Text>
					<Text style={styles.statLabel}>Wallet</Text>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		borderRadius: 16,
		marginHorizontal: 16,
		marginVertical: 8,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.12,
		shadowRadius: 8,
		elevation: 8,
	},
	backgroundGradient: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		height: 120,
		backgroundColor: '#007AFF',
		opacity: 0.1,
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
	},
	headerContent: {
		flexDirection: 'row',
        paddingTop: 16,
		padding: 8,
		alignItems: 'center',
		position: 'relative',
		zIndex: 1,
	},
	imageContainer: {
		position: 'relative',
		marginRight: 16,
	},
	profileImage: {
		width: 80,
		height: 80,
		borderRadius: 40,
		borderWidth: 3,
		borderColor: '#fff',
	},
	placeholderImage: {
		width: 80,
		height: 80,
		borderRadius: 40,
		backgroundColor: '#007AFF',
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 3,
		borderColor: '#fff',
	},
	placeholderText: {
		color: '#fff',
		fontSize: 24,
		fontWeight: '600',
	},
	userInfo: {
		flex: 1,
		position: 'relative',
		zIndex: 2,
	},
	displayName: {
		fontSize: 16,
		fontWeight: '700',
		color: '#1a1a1a',
		marginBottom: 2,
	},
	login: {
		fontSize: 12,
		color: '#007AFF',
		fontWeight: '500',
		marginBottom: 4,
	},
    loginCampusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        flexWrap: 'wrap',
    },
	grade: {
        backgroundColor: '#f8f9fa',
		paddingHorizontal: 8,
		paddingVertical: 4,
        borderRadius: 12,
		fontSize: 14,
		color: '#666',
		fontWeight: '500',
		marginBottom: 8,
	},
	campusContainer: {
		alignSelf: 'flex-start',
		flex: 1,
		minWidth: 0,
	},
	campusText: {
		fontSize: 12,
		color: '#666',
		fontWeight: '500',
		flexWrap: 'wrap',
		flexShrink: 1,
	},
	statsContainer: {
		flexDirection: 'row',
        paddingTop: 20,
		paddingHorizontal: 20,
		paddingBottom: 20,
		justifyContent: 'space-between',
	},
	statItem: {
		flex: 1,
		alignItems: 'center',
		paddingHorizontal: 8,
	},
	statValue: {
		fontSize: 18,
		fontWeight: '700',
		color: '#1a1a1a',
		marginBottom: 2,
	},
	statLabel: {
		fontSize: 12,
		color: '#666',
		fontWeight: '500',
		textAlign: 'center',
	},
	levelBarContainer: {
		marginTop: 8,
		width: '100%',
	},
	levelBarBackground: {
		height: 4,
		backgroundColor: '#e5e5e7',
		borderRadius: 2,
		overflow: 'hidden',
	},
	levelBarFill: {
		height: '100%',
		backgroundColor: '#007AFF',
		borderRadius: 2,
	},
	cursusDropdownContainer: {
        marginVertical: 8,
    },
    cursusDropdownButton: {
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    cursusDropdownText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
        flex: 1,
    },
    dropdownArrow: {
        fontSize: 12,
        color: '#666',
        marginLeft: 8,
    },
    dropdownOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    dropdownContent: {
        position: 'absolute',
        backgroundColor: '#fff',
        borderRadius: 12,
        maxHeight: 300,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 10,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    cursusOption: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    cursusOptionSelected: {
        backgroundColor: '#007AFF',
    },
    cursusOptionText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
    cursusOptionTextSelected: {
        color: '#fff',
        fontWeight: '600',
    },
    selectedCursusInfo: {
        fontSize: 12,
        color: '#007AFF',
        fontWeight: '600',
        backgroundColor: '#f0f8ff',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
});