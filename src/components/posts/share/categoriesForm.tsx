import { PlusSvg } from "@assets/svgs/common";
import CustomSwitch from "@components/common/customSwitch";
import { FansDivider } from "@components/controls";
import { FypText } from "@components/common/base";

import tw from "@lib/tailwind";
import { ICategory, IPostForm } from "@usertypes/types";
import React, { FC, Fragment, useEffect, useState } from "react";
import { Pressable, View } from "react-native";

interface Props {
	postForm: IPostForm;
	categories: ICategory[];
	onClickNewCategory: () => void;
	onUpdateCategories: (categories: string[]) => void;
}

interface IFormCategory extends ICategory {
	isSelected: boolean;
}

const CategoriesForm: FC<Props> = (props) => {
	const { postForm, categories, onClickNewCategory, onUpdateCategories } =
		props;
	const [localCategories, setLocalCategories] = useState<IFormCategory[]>([]);

	const onChangeCategory = (id: string, val: boolean) => {
		const _categories = localCategories.map((el) =>
			el.id === id ? { ...el, isSelected: val } : el,
		);
		setLocalCategories(_categories);
		onUpdateCategories(
			_categories
				.filter((el) => el.isSelected)
				.map((category) => category.id),
		);
	};

	useEffect(() => {
		setLocalCategories(
			categories
				.filter((category) => category.isActive)
				.map((el) => ({
					...el,
					isSelected: postForm.categories.includes(el.id),
				})),
		);
	}, [categories]);

	return (
		<View>
			<FypText
				fontSize={16}
				lineHeight={21}
				textAlign="center"
				style={tw.style("mb-[38px]")}
			>
				Organize posts into categories to enable easy browsing by fans
				on your page
			</FypText>

			<View
				style={tw.style("flex-row items-center justify-between mb-4")}
			>
				<FypText fontSize={17} lineHeight={22}>
					Categories
				</FypText>

				<Pressable
					style={tw.style("flex-row items-center")}
					onPress={onClickNewCategory}
				>
					<PlusSvg width={11.87} height={11.87} color="#a854f5" />
					<FypText
						fontSize={17}
						lineHeight={22}
						color="purple"
						style={tw.style("ml-4")}
					>
						New Category
					</FypText>
				</Pressable>
			</View>

			<View>
				{localCategories.map((category) => (
					<Fragment key={category.id}>
						<View
							style={tw.style(
								"flex-row items-center justify-between h-13",
							)}
						>
							<FypText
								fontSize={18}
								lineHeight={24}
								numberOfLines={1}
								style={tw.style("flex-1")}
							>
								{category.name}
							</FypText>
							<CustomSwitch
								value={category.isSelected}
								onValueChange={(val) =>
									onChangeCategory(category.id, val)
								}
							/>
						</View>

						<FansDivider style={tw.style("my-1.5")} />
					</Fragment>
				))}
			</View>
		</View>
	);
};

export default CategoriesForm;
