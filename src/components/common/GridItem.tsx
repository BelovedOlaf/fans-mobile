import React, { ReactNode } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import the icon library

interface GridItemProps {
	title: string;
	selected: boolean;
	empty?: boolean;
	onPress: () => void;
	iconToRender: ReactNode;
	iconColor?: string;
}

const GridItem: React.FC<GridItemProps> = ({
	title,
	selected,
	onPress,
	empty,
	iconToRender,
	iconColor,
}) => {
	const borderColor = selected ? "#a854f5" : "#f0f0f0";

	if (empty) {
		return (
			<TouchableOpacity
				//onPress={onPress}
				style={styles.gridItemEmpty}
			></TouchableOpacity>
		);
	}
	return (
		<TouchableOpacity
			onPress={onPress}
			style={[styles.gridItem, { borderColor }]}
		>
			<CheckedItem selected={selected} />
			<View
				style={[
					styles.iconCircle,
					{ backgroundColor: `${iconColor}99` },
				]}
			>
				<View style={styles.iconContainer}>{iconToRender}</View>
			</View>
			<Text style={styles.title}>{title}</Text>
		</TouchableOpacity>
	);
};

interface CheckedItemProps {
	selected: boolean;
}

const CheckedItem: React.FC<CheckedItemProps> = ({ selected }) => {
	return (
		<View style={selected ? styles.finishedStep : styles.emptyStep}>
			<Icon name="check" size={20} color="white" />
		</View>
	);
};

const styles = StyleSheet.create({
	gridItem: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		padding: 16,
		marginRight: 16,
		width: 157,
		height: 186,
		borderRadius: 7,
		borderStyle: "solid",
	},
	gridItemEmpty: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 16,
		marginRight: 16,
		borderRadius: 10,
		borderWidth: 0,
	},
	finishedStep: {
		backgroundColor: "#a854f5", // Purple color
		width: 20,
		height: 20,
		borderRadius: 12.5,
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		top: 5,
		right: 5,
	},
	title: {
		position: "absolute",
		bottom: 16,
		fontSize: 16,
	},
	emptyStep: {
		width: 20,
		height: 20,
		borderRadius: 12.5,
		borderWidth: 1,
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		top: 5,
		right: 5,
		borderColor: "#f0f0f0",
	},
	iconCircle: {
		width: 90.4,
		height: 90.4,
		borderRadius: 45.2,
		alignItems: "center",
		opacity: 1,
		justifyContent: "center",
		position: "absolute",
		top: "50%", // Center vertically
		transform: [{ translateY: -45.2 }],
		zIndex: 0,
	},
	iconContainer: {
		zIndex: 1,
		opacity: 100,
	},
});

export default GridItem;
