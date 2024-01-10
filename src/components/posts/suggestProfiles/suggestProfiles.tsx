import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import tw from "@lib/tailwind";

import SuggestProfile from "./suggestProfile";
import * as Svgs from "@assets/svgs/common";

import { IProfile } from "@usertypes/types";
import * as apis from "@helper/endpoints";
import { FansView } from "@components/controls";

const SuggestProfiles = () => {
	const [profiles, setProfiles] = useState<IProfile[]>([]);
	const [pages, setPages] = useState(0);
	const [page, setPage] = useState(0);

	const fetchSuggestedProfiles = async () => {
		const resp = await apis.profile.getSuggestedProfiles();
		if (resp.ok) {
			setProfiles(resp.data.profiles);
			setPages(Math.ceil(resp.data.profiles.length / 3));
			setPage(0);
		}
	};

	useEffect(() => {
		fetchSuggestedProfiles();
	}, []);

	return (
		<View style={tw.style("px-[18px]")}>
			<View
				style={tw.style(
					"flex items-center justify-between flex-row mb-5",
				)}
			>
				<Text
					style={tw.style(
						"text-[19px] font-bold text-black leading-[26px]",
					)}
				>
					Suggested Profiles
				</Text>

				<View style={tw.style("flex flex-row gap-x-4")}>
					<TouchableOpacity
						style={tw.style(
							"w-[15px] h-[15px] flex items-center justify-center",
						)}
						disabled={page === 0}
						onPress={() => setPage(page - 1)}
					>
						<Svgs.ChevronLeftSvg
							width={8.541}
							height={14.679}
							color={page === 0 ? "#f0f0f0" : "#707070"}
						/>
					</TouchableOpacity>

					<TouchableOpacity
						disabled={page === pages - 1}
						onPress={() => setPage(page + 1)}
						style={tw.style(
							"w-[15px] h-[15px] flex items-center justify-center",
						)}
					>
						<FansView style={tw.style("w-[8.541px] h-[14.679px]")}>
							<Svgs.ChevronRightSvg
								color={tw.color("fans-grey-dark")}
							/>
						</FansView>
					</TouchableOpacity>
				</View>
			</View>

			<View style={tw.style("gap-y-[10px]")}>
				{profiles.slice(page * 3, (page + 1) * 3).map((profile) => (
					<SuggestProfile
						data={profile}
						key={`suggest-${profile.id}`}
					/>
				))}
			</View>
		</View>
	);
};

export default SuggestProfiles;
