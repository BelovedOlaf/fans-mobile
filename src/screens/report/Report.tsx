import React, { useState } from "react";
import { View } from "react-native";
import RNToastMessage from "react-native-toast-message";

import { ReportModal } from "@components/modals/report";
import { ReportDialog } from "@components/dialogs/report";
import * as apis from "@helper/endpoints";
import { ReportType } from "@usertypes/commonEnums";

const ReportScreen = () => {
	const [showReportModal, setShowReportModal] = useState(false);

	const handleSubmit = async () => {
		const res = await apis.creator.createReport({
			userId: "78046979002724353",
			flag: ReportType.UNDERAGE_USER,
			reason: "the reason of the report",
		});
		if (res.ok) {
			RNToastMessage.show({
				type: "success",
				text1: "Saved successfully.",
			});
			setShowReportModal(true);
		} else {
			RNToastMessage.show({
				type: "error",
				text1: res.data.message,
			});
		}
	};

	return (
		<View>
			<ReportDialog
				open={true}
				onSubmit={handleSubmit}
				onClose={() => {}}
			/>
			<ReportModal visible={showReportModal} handleClose={() => {}} />
		</View>
	);
};

export default ReportScreen;
