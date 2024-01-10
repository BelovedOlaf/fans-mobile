import React, {
	FC,
	useRef,
	useCallback,
	useMemo,
	useEffect,
	useState,
} from "react";
import {
	BottomSheetModal,
	BottomSheetModalProvider,
	useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";

import { SnapPoints } from "@usertypes/commonEnums";

interface Props {
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;
	snapPoint?: SnapPoints;
}

const BottomSheets: FC<Props> = (props) => {
	const { open, onClose, children, snapPoint } = props;

	const [snapIndex, setSnapIndex] = useState(1);
	const snapPoints = useMemo(
		() => ["25%", "40%", "50%", "60%", "90%"],
		[open],
	);

	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	const handleHideModalPress = useCallback(() => {
		bottomSheetModalRef.current?.close();
	}, []);

	const handleSheetChanges = useCallback((index: number) => {
		if (index === -1) {
			onClose();
		}
	}, []);

	useEffect(() => {
		if (open) {
			if (snapPoint) {
				setSnapIndex(snapPoints.findIndex((el) => el === snapPoint));
			} else {
				setSnapIndex(1);
			}
			handlePresentModalPress();
		} else {
			handleHideModalPress();
		}
	}, [open, snapPoint]);

	const {
		animatedHandleHeight,
		animatedSnapPoints,
		animatedContentHeight,
		handleContentLayout,
	} = useBottomSheetDynamicSnapPoints(snapPoints);

	return (
		<BottomSheetModalProvider>
			<BottomSheetModal
				ref={bottomSheetModalRef}
				index={snapIndex}
				snapPoints={snapPoints}
				onChange={handleSheetChanges}
				containerStyle={{
					zIndex: 10,
					borderTopLeftRadius: 30,
					borderTopRightRadius: 30,
					display: open ? "flex" : "none",
				}}
			>
				{children}
			</BottomSheetModal>
		</BottomSheetModalProvider>
	);
};

export default BottomSheets;
