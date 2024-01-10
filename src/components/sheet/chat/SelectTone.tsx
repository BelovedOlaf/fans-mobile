import {
	FansCheck1,
	FansGap,
	FansHorizontalDivider,
	FansSheet,
	FansText,
	FansView,
} from "@components/controls";
import tw from "@lib/tailwind";
import { IFansSheet } from "@usertypes/components";
import React, { Fragment, useState } from "react";

const SelectToneSheet: IFansSheet<undefined> = (props) => {
	const { onClose: trigClose, onSubmit: trigSubmit } = props;

	const [tone, setTone] = useState("🙂");

	const handleChangeValueTone = (value: boolean, text: string) => {
		if (value) {
			setTone(text);
			trigClose();
			trigSubmit && trigSubmit(text);
		}
	};

	return (
		<FansSheet {...props}>
			<FansGap height={20} />
			<FansView style={tw.style("mx-[17px]")}>
				<FansText
					fontFamily="inter-bold"
					fontSize={19}
					textAlign="center"
				>
					Select the tone
				</FansText>
				<FansGap height={19} />
				{[
					{ icon: "🙂", text: "Casual" },
					{ icon: "😍", text: "Romantic" },
					{ icon: "😊", text: "Friendly" },
					{ icon: "😂", text: "Humorous" },
					{ icon: "🙏", text: "Grateful" },
					{ icon: "🙌", text: "Supportive" },
				].map((item, index) => {
					const { icon, text } = item;

					return (
						<Fragment key={index}>
							{index !== 0 && (
								<Fragment>
									<FansGap height={5} />
									<FansHorizontalDivider />
									<FansGap height={5} />
								</Fragment>
							)}
							<FansCheck1
								height={52}
								value={tone === icon}
								gap={16}
								label={
									<FansView
										alignItems="center"
										flexDirection="row"
										gap={17.6}
									>
										<FansText fontSize={28}>
											{icon}
										</FansText>
										<FansText fontSize={18}>
											{text}
										</FansText>
									</FansView>
								}
								onChangeValue={(value: boolean) =>
									handleChangeValueTone(value, icon)
								}
							/>
						</Fragment>
					);
				})}
			</FansView>
			<FansGap height={20} />
		</FansSheet>
	);
};

export default SelectToneSheet;
