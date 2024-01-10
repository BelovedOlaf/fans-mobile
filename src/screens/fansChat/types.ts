export interface IChatMessage {
	id: string;
	text: string;
	images: string[];
	type?: string;
	value?: number;
	video?: string;
	time: string;
	replyId?: string;
}

export interface IChat {
	id: string;
	name: string;
	avatar: string;
	pin: boolean;
	unread: number;
	msg: IChatMessage[];
	time: string;
	replyId?: string;
	attached?: string;
	images: boolean;
	video: boolean;
	warning: boolean;
	viewed?: boolean;
}
