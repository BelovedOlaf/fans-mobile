import React, { FC } from "react";

import SocialLink from "./socialLink";
import { FansView } from "@components/controls";
import {
	FypNullableView,
	FypHorizontalScrollView,
} from "@components/common/base";

import { ISocialLink } from "@usertypes/types";

interface Props {
	data: ISocialLink[];
	onClickLink: (url: string) => void;
}

const SocialLinkList: FC<Props> = (props) => {
	const { data, onClickLink } = props;
	return (
		<FansView margin={{ b: 24 }}>
			<FypNullableView
				visible={data.filter((el) => el.url !== "").length > 0}
			>
				<FypHorizontalScrollView
					// ref={scrollRef}
					contentContainerStyle={{
						columnGap: 5,
					}}
				>
					{data
						.filter((el) => el.url !== "")
						.map((social) => (
							<SocialLink
								key={social.id}
								data={social}
								onPress={() => onClickLink(social.url)}
							/>
						))}
				</FypHorizontalScrollView>
			</FypNullableView>
		</FansView>
	);
};

export default SocialLinkList;
