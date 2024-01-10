import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import the icon library

interface CustomStepProps {
	isFinished: boolean;
}

const CustomStep: React.FC<CustomStepProps> = ({ isFinished }) => {
	return (
		<View style={styles.step}>
			{isFinished ? (
				<View style={styles.finishedStep}>
					<Icon name="check" size={20} color="white" />{" "}
				</View>
			) : (
				<View style={styles.emptyStep}></View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	step: {
		width: 25,
		height: 25,
		borderRadius: 12.5,
		alignItems: "center",
		justifyContent: "center",
	},
	finishedStep: {
		backgroundColor: "#a854f5", // Purple color
		width: 25,
		height: 25,
		borderRadius: 12.5,
		alignItems: "center",
		justifyContent: "center",
	},
	emptyStep: {
		width: 25,
		height: 25,
		borderRadius: 12.5,
		borderWidth: 1,
		borderColor: "#a854f5", // Purple color
	},
});

export default CustomStep;
