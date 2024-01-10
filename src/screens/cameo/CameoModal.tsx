// ModalComponent.tsx

import RoundButton from "@components/common/RoundButton";
import TextButton from "@components/common/TextButton";
import { FansGap, FansText, FansView } from "@components/controls";
import React from "react";
import { View, Modal, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import SexualContentAgreementSVG from "@assets/svgs/common/SexualContentAgreement";
import tw from "@lib/tailwind";

interface ModalProps {
	onAccept: () => void;
	onDeny: () => void;
	visible: boolean;
}

const CameoModal: React.FC<ModalProps> = ({
	onAccept: onClose,
	onDeny,
	visible,
}) => {
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={visible}
			onRequestClose={onClose}
		>
			<View style={styles.modalContainer}>
				<View style={styles.modalContent}>
					<FansView>
						<FansView alignItems="center" justifyContent="center">
							<FansGap height={14} />

							<SexualContentAgreementSVG
								width={90}
								height={100}
							/>
							<FansGap height={14} />
							<FansText
								textAlign="center"
								fontFamily="inter-semibold"
								fontSize={19}
							>
								Sexual Content
							</FansText>
							<FansText
								textAlign="center"
								fontFamily="inter-semibold"
								fontSize={19}
							>
								Policy Agreement
							</FansText>
							<FansGap height={24} />
							<FansText color="grey-70" fontSize={16}>
								As a creator on our platform, you’re accountable
								for ensuring your content respects our community
								and adheres to all local and international laws.
								Producing or disseminating sexual content
								involving misrepresentation, non-consent, or
								minors is strictly prohibited, will result in
								immediate suspension, and reporting to law
								enforcement authorities. By enabling sexual
								content, you accept these terms and the full
								legal consequences for any violations. Review
								our Terms of Service for complete details. This
								is your responsibility. Proceed with
								understanding and caution
							</FansText>
						</FansView>
						<FansGap height={24} />
						<FansView flexDirection="row" alignItems="center">
							<View style={styles.tosIcon}>
								<Icon name="check" size={20} color="white" />
							</View>
							<FansText fontSize={15} fontFamily="inter-regular">
								Agree to Terms of Service
							</FansText>
						</FansView>
						<FansGap height={24} />
						<View>
							<RoundButton onPress={onClose}>
								Agree to terms
							</RoundButton>
							<FansGap height={10} />

							<TextButton onPress={onDeny}>Cancel</TextButton>
						</View>
						<FansGap height={20} />
					</FansView>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContent: {
		width: "80%",
		backgroundColor: "white",
		borderRadius: 10,
		padding: 20,
	},
	tosIcon: {
		backgroundColor: "#a854f5", // Purple color
		width: 25,
		height: 25,
		borderRadius: 12.5,
		alignItems: "center",
		justifyContent: "center",
		marginRight: 12,
	},
});

export default CameoModal;
