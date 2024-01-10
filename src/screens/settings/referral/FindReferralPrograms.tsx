import {
	CashSvg,
	ChatSvg,
	FireSvg,
	FreeTrialSvg,
	HeartSvg,
	ListMarkSvg,
	QuestionSvg,
	Star1Svg,
} from "@assets/svgs/common";
import RoundButton from "@components/common/RoundButton";
import AppLayout from "@components/common/layout/layout";
import SearchTextInput from "@components/common/searchTextInput";
import { FansDivider, FansText, FansView } from "@components/controls";
import { CreatorCard } from "@components/refer";
import tw from "@lib/tailwind";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RoundButtonType } from "@usertypes/commonEnums";
import { Colors } from "@usertypes/enums";
import { useNavigation, useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { ReferralProgramNativeStackParams } from ".";

interface FAQProps {
	faq: { question: string; answer: string };
	index: number;
	toogleFAQ: () => void;
	opened: boolean;
}

const FAQ: React.FC<FAQProps> = ({ faq, index, toogleFAQ, opened }) => {
	return (
		<FansView style={tw.style("my-4")}>
			<TouchableOpacity key={index} onPress={toogleFAQ}>
				<FansView alignItems="center" flexDirection="row" gap={2}>
					<ListMarkSvg size={12.66} color="#4DCC36" />
					<FansText
						fontFamily="inter-semibold"
						fontSize={18}
						lineHeight={24}
					>
						{faq.question}
					</FansText>
				</FansView>
			</TouchableOpacity>

			<FansView
				borderRadius={15}
				style={tw.style(
					`px-[18px] py-[14px] bg-[#fbfbfb] ${!opened && "hidden"}`,
				)}
			>
				<FansText color="grey-70" fontSize={16} lineHeight={21}>
					{faq.answer}
				</FansText>
			</FansView>
		</FansView>
	);
};

const FindReferralProgramsScreen = () =>
	// props: ReferralProgramNativeStackScreenProps<"FindReferralPrograms">,
	{
		const navigation =
			useNavigation<
				NativeStackNavigationProp<ReferralProgramNativeStackParams>
			>();

		navigation.setOptions({
			title: "Find referral programs",
			headerStyle: tw.style("bg-[#5F17D3]"),
			headerTitleStyle: tw.style(
				"font-inter-bold",
				"text-[19px] text-white",
			),
		});

		const [searchKey, setSearchKey] = useState("");
		const onChangeSearch = (val: string) => {
			setSearchKey(val);
		};

		const faqs = [
			{
				question: "How can I join the Referral Program?",
				answer: "This isn’t luck; it’s the power of our Referral Program. Start building a passive income stream today and set foot on the path to financial freedom. Your success story is waiting to be written!",
			},
			{
				question: "How can I share a link?",
				answer: "This isn’t luck; it’s the power of our Referral Program. Start building a passive income stream today and set foot on the path to financial freedom. Your success story is waiting to be written!",
			},
			{
				question: "How can I join the Referral Program?",
				answer: "This isn’t luck; it’s the power of our Referral Program. Start building a passive income stream today and set foot on the path to financial freedom. Your success story is waiting to be written!",
			},
			{
				question:
					"Is it possible to change a link after it was created?",
				answer: "This isn’t luck; it’s the power of our Referral Program. Start building a passive income stream today and set foot on the path to financial freedom. Your success story is waiting to be written!",
			},
			{
				question: "How can I join the Referral Program?",
				answer: "This isn’t luck; it’s the power of our Referral Program. Start building a passive income stream today and set foot on the path to financial freedom. Your success story is waiting to be written!",
			},
		];

		const [currentFaq, setFaq] = useState(0);

		return (
			<AppLayout>
				<ScrollView style={tw.style("relative w-full")}>
					<FansView
						style={tw.style(
							"flex items-center mt-[26px] md:mt-[30px] mb-[40px]",
							"mx-[18px] md:mx-auto max-w-[674px]",
						)}
					>
						<FansView gap={20}>
							<FansText
								fontFamily="inter-bold"
								fontSize={23}
								lineHeight={31}
								textAlign="center"
							>
								Find your perfect{" "}
								<br style={tw.style("md:hidden")} />
								Referral Program
							</FansText>

							<FansText
								fontSize={16}
								lineHeight={21}
								style={tw.style("text-center mb-[10px]")}
							>
								Dive into new riches!
								<br />
								Discover and join referral programs
							</FansText>
							<SearchTextInput
								value={searchKey}
								onChangeText={onChangeSearch}
							/>
						</FansView>

						<FansView
							style={tw.style(
								"w-full flex items-center justify-center",
							)}
						>
							<ScrollView
								horizontal
								style={tw.style("p-1 w-full")}
								contentContainerStyle={tw.style("mx-auto")}
							>
								<TouchableOpacity style={tw.style("m-1")}>
									<FansView
										width={104}
										height={124}
										borderRadius={16}
										center
										style={tw.style(
											"border border-[#f0f0f0] gap-1",
										)}
									>
										<FansView
											size={66}
											background="[#edfaea]"
											borderRadius={33}
											center
										>
											<Star1Svg
												width={37.51}
												height={35.93}
												color="#4DCC36"
											/>
										</FansView>
										<FansText fontSize={17} lineHeight={22}>
											Popular
										</FansText>
									</FansView>
								</TouchableOpacity>

								<TouchableOpacity style={tw.style("m-1")}>
									<FansView
										width={104}
										height={124}
										borderRadius={16}
										center
										style={tw.style(
											"border border-[#f0f0f0] gap-1",
										)}
									>
										<FansView
											size={66}
											background="[#e8f6ff]"
											borderRadius={33}
											center
										>
											<CashSvg
												width={35.73}
												height={35.72}
												color="#24A2FF"
											/>
										</FansView>
										<FansText fontSize={17} lineHeight={22}>
											Highest %
										</FansText>
									</FansView>
								</TouchableOpacity>

								<TouchableOpacity style={tw.style("m-1")}>
									<FansView
										width={104}
										height={124}
										borderRadius={16}
										center
										style={tw.style(
											"border border-[#f0f0f0] gap-1",
										)}
									>
										<FansView
											size={66}
											background="[#f6edff]"
											borderRadius={33}
											center
										>
											<HeartSvg
												width={31.44}
												height={27.79}
												color="#A854F5"
											/>
										</FansView>
										<FansText fontSize={17} lineHeight={22}>
											SFW
										</FansText>
									</FansView>
								</TouchableOpacity>

								<TouchableOpacity style={tw.style("m-1")}>
									<FansView
										width={104}
										height={124}
										borderRadius={16}
										center
										style={tw.style(
											"border border-[#f0f0f0] gap-1",
										)}
									>
										<FansView
											size={66}
											background="[#fdebf9]"
											borderRadius={33}
											center
										>
											<FireSvg
												width={28.43}
												height={36.74}
												color="#E53EC6"
											/>
										</FansView>
										<FansText fontSize={17} lineHeight={22}>
											NSFW
										</FansText>
									</FansView>
								</TouchableOpacity>

								<TouchableOpacity style={tw.style("m-1")}>
									<FansView
										width={104}
										height={124}
										borderRadius={16}
										center
										style={tw.style(
											"border border-[#f0f0f0] gap-1",
										)}
									>
										<FansView
											size={66}
											background="[#fff3e9]"
											borderRadius={33}
											center
										>
											<FreeTrialSvg
												width={34.78}
												height={36.21}
												color="#F98C28"
											/>
										</FansView>
										<FansText fontSize={17} lineHeight={22}>
											Free trial
										</FansText>
									</FansView>
								</TouchableOpacity>
							</ScrollView>
						</FansView>

						<FansView gap={3}>
							<CreatorCard
								back_img="https://reactnative.dev/img/tiny_logo.png"
								avatar_img="https://reactnative.dev/img/tiny_logo.png"
								revenue={20}
								full_name="Natalie White"
								nick_name="@natwhite_"
								verified={true}
								description="Model & content creator. From Australia to the world. New photos every week!"
							/>
							<CreatorCard
								back_img="https://reactnative.dev/img/tiny_logo.png"
								avatar_img="https://reactnative.dev/img/tiny_logo.png"
								revenue={20}
								full_name="Natalie White"
								nick_name="@natwhite_"
								verified={true}
								description="Model & content creator. From Australia to the world. New photos every week!"
							/>
							<CreatorCard
								back_img="https://reactnative.dev/img/tiny_logo.png"
								avatar_img="https://reactnative.dev/img/tiny_logo.png"
								revenue={20}
								full_name="Natalie White"
								nick_name="@natwhite_"
								verified={true}
								description="Model & content creator. From Australia to the world. New photos every week!"
							/>
							<CreatorCard
								back_img="https://reactnative.dev/img/tiny_logo.png"
								avatar_img="https://reactnative.dev/img/tiny_logo.png"
								revenue={20}
								full_name="Natalie White"
								nick_name="@natwhite_"
								verified={true}
								description="Model & content creator. From Australia to the world. New photos every week!"
							/>
							<CreatorCard
								back_img="https://reactnative.dev/img/tiny_logo.png"
								avatar_img="https://reactnative.dev/img/tiny_logo.png"
								revenue={20}
								full_name="Natalie White"
								nick_name="@natwhite_"
								verified={true}
								description="Model & content creator. From Australia to the world. New photos every week!"
							/>
						</FansView>

						<FansDivider
							style={tw.style("w-full mt-[38px] md:mt-[50px]")}
						/>

						<FansView
							style={tw.style("py-[34px] gap-[23px]")}
							alignItems="center"
						>
							<QuestionSvg color={Colors.Green} width={101} />
							<FansText
								fontFamily="inter-bold"
								fontSize={23}
								lineHeight={31}
								textAlign="center"
							>
								Frequently Asked
								<br style={tw.style("md:hidden")} /> Questions
							</FansText>
							<FansView>
								{faqs.map((faq, index) => (
									<FAQ
										faq={faq}
										index={index}
										key={index}
										toogleFAQ={() => setFaq(index)}
										opened={index === currentFaq}
									/>
								))}
							</FansView>
						</FansView>

						<FansView
							borderRadius={15}
							style={tw.style(
								"my-10 border border-fans-grey-de pt-[21px] pb-[27px] px-[18px] gap-[16px] w-full",
							)}
						>
							<FansText
								fontSize={17}
								lineHeight={22}
								textAlign="center"
							>
								Still need help?
							</FansText>
							<TouchableOpacity>
								<RoundButton
									variant={RoundButtonType.SECONDARY}
								>
									<FansView
										center
										style={tw.style("flex-row gap-2")}
									>
										<ChatSvg size={14.33} color="white" />
										<FansText
											fontFamily="inter-bold"
											fontSize={19}
											lineHeight={26}
										>
											Chat to us
										</FansText>
									</FansView>
								</RoundButton>
							</TouchableOpacity>
						</FansView>
					</FansView>
				</ScrollView>
			</AppLayout>
		);
	};

export default FindReferralProgramsScreen;
