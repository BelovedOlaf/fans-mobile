import { IPostForm } from "@usertypes/types";
import { PostType } from "@usertypes/commonEnums";
import { PostReqBody } from "@helper/endpoints/post/schemas";

export const getCreatePostData = (
	postForm: IPostForm,
	thumbId: string | undefined,
	mediaIds: string[],
	formIds: string[],
	paidPostThumbId: string,
) => {
	const postBody: PostReqBody = {
		title: "",
		type: postForm.type,
		thumbId: thumbId,
		mediaIds: mediaIds,
		caption: postForm.caption,
		categories: postForm.categories,
		roles: postForm.roles,
		advanced: postForm.advanced,
		taggedPeoples: postForm.taggedPeoples.map((people) => people.user.id),
		formIds: formIds,
	};

	if (postForm.paidPost) {
		postBody.paidPost = {
			currency: "USD",
			thumbId: paidPostThumbId,
			price:
				postForm.paidPost?.price === ""
					? 0
					: parseFloat(postForm.paidPost?.price as string),
		};
	}
	if (postForm.fundraiser.title !== "") {
		postBody.fundraiser = {
			...postForm.fundraiser,
			thumbId: postForm.fundraiser.thumb,
			price:
				postForm.fundraiser.price === ""
					? 0
					: parseFloat(postForm.fundraiser.price as string),
		};
	}

	if (postForm.type === PostType.Audio) {
		postBody.title = postForm.audio.title;
		postBody.description = postForm.audio.description;
		postBody.episodeNumber = postForm.audio.episodeNumber
			? parseInt(postForm.audio.episodeNumber as string)
			: 0;
		postBody.isPrivate = postForm.audio.isPrivate;
		postBody.isAudioLeveling = postForm.audio.isAudioLeveling;
		postBody.isNoiseReduction = postForm.audio.isNoiseReduction;
	}
	if (postForm.schedule.startDate !== "") {
		postBody.schedule = postForm.schedule;
	}

	// postBody.giveaway.winnerCount = postBody.giveaway.winnerCount === '' ? 0 : parseInt(postBody.giveaway.winnerCount as string);
	return postBody;
};

export const getPostTitleIcon = (postType: PostType) => {
	switch (postType) {
		case PostType.Photo:
			return "photo";
		case PostType.Video:
			return "video";
		case PostType.Audio:
			return "audio";
		case PostType.Story:
			return "story";
		case PostType.Text:
			return "text";
		default:
			return "photo";
	}
};
