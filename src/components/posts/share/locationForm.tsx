import { SearchSvg } from "@assets/svgs/common";
import RoundTextInput from "@components/common/RoundTextInput";
import CustomText from "@components/common/customText";
import { FansDivider } from "@components/controls";
import Location from "../common/location";
import tw from "@lib/tailwind";
import React, { Fragment, useEffect, useState, FC } from "react";
import { View } from "react-native";
import { ILocation, IPostForm } from "@usertypes/types";
import { getLocations } from "@helper/endpoints/profile/apis";

interface Props {
	data: IPostForm;
	onChangeLocation: (locationId: string) => void;
}

const LocationForm: FC<Props> = (props) => {
	const { data, onChangeLocation } = props;
	const [searchKey, setSearchKey] = useState("");
	const [selectedLocation, setSelectedLocation] = useState<ILocation>();
	const [locations, setLocations] = useState<ILocation[]>([]);

	const fetchLocations = async () => {
		const resp = await getLocations({ query: searchKey });
		if (resp.ok) {
			setLocations(resp.data.locations);
			setSelectedLocation(
				resp.data.locations.find(
					(location) => location.id === data.locationId,
				),
			);
		}
	};

	const onChangeSearch = (val: string) => {
		setSearchKey(val);
	};

	useEffect(() => {
		fetchLocations();
	}, [searchKey]);

	useEffect(() => {
		setSelectedLocation(
			locations.find((location) => location.id === data.locationId),
		);
	}, [data.locationId]);

	return (
		<View>
			{data.locationId ? (
				<Fragment>
					{selectedLocation ? (
						<Location
							data={selectedLocation}
							isSelected={true}
							onPress={() => onChangeLocation("")}
						/>
					) : null}
				</Fragment>
			) : (
				<Fragment>
					<View
						style={tw.style(
							"flex-row items-center justify-between mb-4",
						)}
					>
						<CustomText size="lg" style="">
							Search location
						</CustomText>
						{/* <Pressable
						onPress={onClickMyLocation}
						style={tw.style("flex-row items-center")}
					>
						<LocationSvg width={12} height={12} color="#a854f5" />
						<CustomText size="lg" style="text-fans-purple ml-4">
							Use my location
						</CustomText>
					</Pressable> */}
					</View>

					<RoundTextInput
						icon={
							<SearchSvg
								width={13.14}
								height={13.26}
								color="#000"
							/>
						}
						placeholder="Search"
						customStyles="pl-11"
						value={searchKey}
						onChangeText={onChangeSearch}
						maxLength={1000}
					/>

					<CustomText style="mt-[28px]" size="lg">
						Recent
					</CustomText>

					<View>
						{locations.map((location) => (
							<Fragment key={location.id}>
								<Location
									data={location}
									isSelected={false}
									onPress={() =>
										onChangeLocation(location.id)
									}
								/>

								<FansDivider style={tw.style("my-1.5")} />
							</Fragment>
						))}
					</View>
				</Fragment>
			)}
		</View>
	);
};

export default LocationForm;
