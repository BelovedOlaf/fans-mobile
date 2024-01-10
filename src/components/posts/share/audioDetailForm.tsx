import { NoiseSvg } from "@assets/svgs/common";
import FormControl from "@components/common/FormControl";
import RoundTextInput from "@components/common/RoundTextInput";
import CustomText from "@components/common/customText";
import { FansDivider } from "@components/controls";
import { PreviewImageField } from "@components/posts/common";
import tw from "@lib/tailwind";
import { IAudioDetail, IPickerMedia } from "@usertypes/types";
import React, { FC } from "react";
import { View } from "react-native";

interface Props {
	formData: IAudioDetail;
	isSubmitted: boolean;
	coverImg: IPickerMedia;
	onChangeFormData: (name: string, value: string | boolean) => void;
	onChangeImage: () => void;
}

const AudioDetailForm: FC<Props> = (props) => {
	const { formData, onChangeFormData, isSubmitted, onChangeImage, coverImg } =
		props;

	return (
		<View>
			<PreviewImageField
				label="Preview image"
				style="mb-[34px]"
				onChangeImage={onChangeImage}
				data={coverImg}
				imgHeight={112}
			/>

			<View style={tw.style("px-[18px] md:px-0")}>
				<FormControl
					label="Episode title"
					value={formData.title}
					onChangeText={(val: string) =>
						onChangeFormData("title", val)
					}
					placeholder="e.g.We Luv Art: The Podcast"
					styles="mb-8"
					hasError={isSubmitted && formData.title === ""}
					validateString="Please enter episode title"
				/>

				<FormControl
					label="Episode number (optional)"
					value={formData.episodeNumber as string}
					onChangeText={(val: string) =>
						onChangeFormData("episodeNumber", val)
					}
					placeholder="e.g.1"
					styles="mb-8"
				/>

				<FormControl
					label="Description (optional)"
					value={formData.description}
					onChangeText={(val: string) =>
						onChangeFormData("description", val)
					}
					placeholder="Write a description"
					isTextArea
					styles="mb-8"
				/>

				{/* <FansDivider style={tw.style("mt-6 mb-4.5")} /> */}

				{/* <View>
					<CustomText style="mb-6" size="xl">
						AI enhance
					</CustomText>

					<View>
						<View style={tw.style("flex-row items-center mb-3")}>
							<NoiseSvg
								width={26.84}
								height={20.24}
								color="#000"
							/>
							<CustomText size="lg" style="mr-auto ml-5">
								Noise reduction
							</CustomText>
							<CustomSwitch
								value={true}
								onValueChange={(val) => {}}
							/>
						</View>
						<CustomText size="base" style="text-fans-dark-grey">
							Automatically detect and reduce background noise,
							clicks pops, and hiss
						</CustomText>
					</View>

					<FansDivider style={tw.style("my-6")} />

					<View>
						<View style={tw.style("flex-row items-center mb-3")}>
							<NoiseSvg
								width={26.84}
								height={20.24}
								color="#000"
							/>
							<CustomText size="lg" style="mr-auto ml-5">
								Audio levelling
							</CustomText>
							<CustomSwitch
								value={true}
								onValueChange={(val) => {}}
							/>
						</View>
						<CustomText size="base" style="text-fans-dark-grey">
							Automatically adjust volume levels of different
							speakers, making sure the audio is balanced and
							consistent
						</CustomText>
					</View>
				</View> */}
			</View>
		</View>
	);
};

export default AudioDetailForm;
