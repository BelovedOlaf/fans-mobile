import {
	CheckSvg,
	DndTriggerSvg,
	DocEditSvg,
	StarCheckSvg,
	TrashSvg,
} from "@assets/svgs/common";
import OnlineAvatar from "@components/avatar/OnlineAvatar";
import CreateNoteDlg from "@components/chat/common/dialogs/CreateNoteDlg";
import tw from "@lib/tailwind";
import { Stack } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Edit from "../../assets/svgs/common/Edit";

const CreateNote = () => {
	const [openCreateDlg, setOpenCreateDlg] = useState(false);
	return (
		<View>
			{/* custom header */}
			<Stack.Screen
				options={{
					headerTitleAlign: "left",
					headerTitle: () => (
						<View
							style={tw.style("flex flex-row items-center gap-2")}
						>
							<OnlineAvatar />
							<Text>Jane Love</Text>
							<StarCheckSvg height={20} width={20} />
						</View>
					),
					headerRight: () => (
						<View>
							<TouchableOpacity>
								<Text
									style={tw.style(
										"text-purple-500 text-4 font-bold",
									)}
								>
									Save
								</Text>
							</TouchableOpacity>
						</View>
					),
				}}
			/>
			<View style={tw.style("bg-white h-full p-3 flex gap-[20px]")}>
				<View>
					<Text style={tw.style("text-5")}>Display name</Text>
				</View>
				<View>
					<TextInput
						style={tw.style(
							"bg-gray-200 h-[45px] rounded-full px-5",
						)}
					/>
				</View>
				<View>
					<Text style={tw.style("text-5")}>Notes</Text>
				</View>
				<View style={tw.style("flex flex-row items-center gap-2")}>
					<View style={tw.style("w-5 h-5")}>
						<DndTriggerSvg />
					</View>
					<View
						style={tw.style(
							"flex-1 flex border border-gray-300 rounded-md p-3",
						)}
					>
						<View
							style={tw.style(
								"w-full flex flex-row justify-between items-center h-20 rounded-md px-3",
							)}
						>
							<Text style={tw.style("text-4.5")}>About Jane</Text>
							<View style={tw.style("flex flex-row gap-2")}>
								<TouchableOpacity
									style={tw.style(
										"w-8 h-8 bg-gray-200 rounded-full p-2",
									)}
								>
									<CheckSvg color="black" />
								</TouchableOpacity>
								<TouchableOpacity
									style={tw.style(
										"w-8 h-8 bg-gray-200 rounded-full p-2",
									)}
								>
									<Edit color="black" />
								</TouchableOpacity>
								<TouchableOpacity
									style={tw.style(
										"w-8 h-8 bg-gray-200 rounded-full p-2",
									)}
								>
									<TrashSvg color="red" />
								</TouchableOpacity>
							</View>
						</View>
						<Text style={tw.style("text-gray-500 text-4")}>
							Jane is a dedicated environmental activist who
							tirelessly works to promote sustainable practices
							and raise awareness about climate change.
						</Text>
					</View>
				</View>
				<TouchableOpacity
					style={tw.style(
						"h-10 border border-purple-500 rounded-full flex flex-row items-center justify-center gap-2",
					)}
					onPress={() => setOpenCreateDlg(true)}
				>
					<DocEditSvg height={16} width={16} />
					<Text style={tw.style("text-4 text-purple-500 font-bold")}>
						Create note
					</Text>
				</TouchableOpacity>
			</View>
			<CreateNoteDlg
				open={openCreateDlg}
				onClose={() => setOpenCreateDlg(false)}
				onSubmit={() => {}}
			/>
		</View>
	);
};

export default CreateNote;
