import tw from "@lib/tailwind";
import {
	NavigationContainerRefWithCurrent,
	useNavigationContainerRef,
} from "@react-navigation/native";
import React, { FC, useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import DeveloperMenu from "./menu";
import { FansScreen1, FansView } from "@components/controls";
import { isDesktop } from "@utils/global";
import { DeveloperNativeStackParams } from ".";

interface Props {
	path?: string;
	children: React.ReactNode;
	navigationRef: NavigationContainerRefWithCurrent<DeveloperNativeStackParams>;
}

const getStatus = (): boolean => {
	return window.innerWidth < 992;
};

const Sidebar: FC<Props> = (props) => {
	const { path, children, navigationRef } = props;
	const [isMobile, setMobile] = useState<boolean>(getStatus());

	const handleNavigate = (screen: "Applications" | "GettingStarted") => {
		navigationRef.navigate(screen as never);
	};

	useEffect(() => {
		const route = navigationRef.getCurrentRoute()?.name;
		if (route === "DeveloperPortal" && !isMobile) {
			navigationRef.navigate("Applications" as never);
		}
	}, [path, navigationRef, isMobile]);

	useEffect(() => {
		window.addEventListener("resize", () => {
			setMobile(getStatus());
		});

		return () => {
			window.removeEventListener("resize", () => {});
		};
	}, []);

	useEffect(() => {
		// eslint-disable-next-line no-empty
		if (isMobile) {
		} else {
			const route = navigationRef.getCurrentRoute()?.name;
			if (route === "DeveloperPortal") {
				navigationRef.navigate("Applications" as never);
			}
		}
	}, [isMobile, navigationRef]);

	return (
		<>
			{!isMobile ? (
				<View style={tw.style("min-h-screen p-0 flex-row")}>
					<View
						style={tw.style(
							"flex flex-col border-r border-1 border-black border-opacity-10 ml-10 xl:ml-20 pt-5",
						)}
					>
						<DeveloperMenu
							onNavigate={handleNavigate}
							path={path as string}
						/>
					</View>
					<View style={tw.style("mt-[40px] flex-1 mx-[60px]")}>
						{children}
					</View>
				</View>
			) : (
				<>{children}</>
			)}
		</>
	);
};

export default Sidebar;
