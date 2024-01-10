import { ReachedSvg, RevenueSvg, ClockSvg } from "@assets/svgs/common";

export const news = [
	{
		id: 1,
		users: [
			{
				name: "Ramiro Altamiglia",
				avatar: "https://i.pravatar.cc/150?img=3",
			},
		],
		text: "liked your comment: Love it",
		time: "43min",
		type: "comment",
		postImage:
			"https://images.unsplash.com/photo-1612144431180-2d672779556c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
	},
	{
		id: 2,
		users: [
			{
				name: "Katie Stewart",
				avatar: "https://i.pravatar.cc/150?img=3",
			},
			{
				name: "Johanna Rivers",
				avatar: "https://i.pravatar.cc/150?img=4",
			},
			{
				name: "Katie Stewart",
				avatar: "https://i.pravatar.cc/150?img=3",
			},
			{
				name: "Johanna Rivers",
				avatar: "https://i.pravatar.cc/150?img=4",
			},
			{
				name: "Katie Stewart",
				avatar: "https://i.pravatar.cc/150?img=3",
			},
			{
				name: "Johanna Rivers",
				avatar: "https://i.pravatar.cc/150?img=4",
			},
			{
				name: "Katie Stewart",
				avatar: "https://i.pravatar.cc/150?img=3",
			},
			{
				name: "Johanna Rivers",
				avatar: "https://i.pravatar.cc/150?img=4",
			},
		],
		counts: 198,
		text: "liked your post: Love it",
		time: "43min",
		type: "post",
		postImage:
			"https://images.unsplash.com/photo-1612144431180-2d672779556c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
	},
];

export const weekNotifications = [
	{
		id: 3,
		users: [
			{
				name: "Richard Makes Music",
				avatar: "https://i.pravatar.cc/150?img=5",
			},
		],
		text: "mentioned you on a post",
		postImage:
			"https://images.unsplash.com/photo-1612144431180-2d672779556c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
		time: "Jan 13",
		type: "mentions",
	},
	{
		id: 4,
		users: [
			{
				name: "Ramiro Altamiglia",
				avatar: "https://i.pravatar.cc/150?img=7 ",
			},
		],
		text: "payed you a tip of $200",
		postImage:
			"https://images.unsplash.com/photo-1612144431180-2d672779556c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
		time: "Jan 13",
		type: "tips",
	},
	{
		id: 5,
		text: "Congrats! You `ve reached 1,000 followers. keep it up!",
		time: "Jan 13",
		type: "followers",
		svg: ReachedSvg,
	},
	{
		id: 6,
		users: [
			{
				name: "Richard Makes Music",
				avatar: "https://i.pravatar.cc/150?img=5",
			},
		],
		text: "ordered a custom video for $200",
		time: "Jan 13",
		timeLeft: "2 DAYS, 12HOURS LEFT",
		type: "order",
	},
	{
		id: 7,
		users: [
			{
				name: "Alissa James",
				avatar: "https://i.pravatar.cc/150?img=8",
			},
		],
		text: "You `ve been charged $100 for your subscription to",
		time: "Jan 13",
		type: "charged",
		svg: RevenueSvg,
	},
	{
		id: 8,
		users: [
			{
				name: "Katie Stewart",
				avatar: "https://i.pravatar.cc/150?img=9",
			},
			{
				name: "Johanna Rivers",
				avatar: "https://i.pravatar.cc/150?img=10",
			},
			{
				name: "Katie Stewart",
				avatar: "https://i.pravatar.cc/150?img=3",
			},
			{
				name: "Johanna Rivers",
				avatar: "https://i.pravatar.cc/150?img=4",
			},
			{
				name: "Katie Stewart",
				avatar: "https://i.pravatar.cc/150?img=3",
			},
			{
				name: "Johanna Rivers",
				avatar: "https://i.pravatar.cc/150?img=4",
			},
			{
				name: "Katie Stewart",
				avatar: "https://i.pravatar.cc/150?img=3",
			},
			{
				name: "Johanna Rivers",
				avatar: "https://i.pravatar.cc/150?img=4",
			},
		],
		time: "Jan 13",
		type: "messages",
	},
	{
		id: 9,
		type: "reached",
		amount: 100,
		time: "Jan 13",
	},
	{
		id: 10,
		users: [
			{
				name: "Richard Makes Music",
				avatar: "https://i.pravatar.cc/150?img=5",
			},
		],
		text: "purchased a video call for $200",
		time: "Jan 13",
		timeLeft: "JAN 20 17:30 UTC",
		type: "purchase",
	},
	{
		id: 11,
		users: [
			{
				name: "Alissa James",
				avatar: "https://i.pravatar.cc/150?img=8",
			},
		],
		text: "subscribed for $200.",
		time: "Jan 13",
		type: "subscription",
		mailto: "KIM Alissa",
	},
	{
		id: 12,
		text: "Your post is under review for guidel compliance",
		time: "Jan 13",
		postImage:
			"https://images.unsplash.com/photo-1612144431180-2d672779556c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
		type: "warning",
	},
];

export const monthNotifications = [
	{
		id: 12,
		text: "Your post violates our",
		link: "Community Guidelines",
		postImage:
			"https://images.unsplash.com/photo-1612144431180-2d672779556c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
		time: "Jan 2",
		type: "warning",
	},
	{
		id: 12,
		text: "Your post violates our",
		link: "Terms of Use",
		postImage:
			"https://images.unsplash.com/photo-1612144431180-2d672779556c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
		time: "Jan 2",
		type: "warning",
	},
	{
		id: 6,
		users: [
			{
				name: "Richard Makes Music",
				avatar: "https://i.pravatar.cc/150?img=5",
			},
		],
		text: "Video call in 5 minutes with",
		time: "Just now",
		type: "meeting",
	},
	{
		id: 12,
		text: "Your post is under review for guidel compliance",
		strike: 1,
		postImage:
			"https://images.unsplash.com/photo-1612144431180-2d672779556c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
		time: "Jan 2",
		type: "warning",
	},
	{
		id: 12,
		text: "Your post is under review for guidel compliance",
		strike: 2,
		postImage:
			"https://images.unsplash.com/photo-1612144431180-2d672779556c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
		time: "Jan 2",
		type: "warning",
	},
	{
		id: 12,
		text: "Your post is under review for guidel compliance",
		strike: 3,
		postImage:
			"https://images.unsplash.com/photo-1612144431180-2d672779556c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
		time: "Jan 2",
		type: "warning",
	},
	{
		id: 11,
		users: [
			{
				name: "Kim Lissa",
				avatar: "https://i.pravatar.cc/150?img=12",
			},
		],
		text: "'s subscription expires in a week",
		time: "Jan 13",
		type: "subscription",
		mailto: "DM Kim",
	},
	{
		id: 11,
		users: [
			{
				name: "Kim Lissa",
				avatar: "https://i.pravatar.cc/150?img=12",
			},
		],
		text: "'s subscription has expired",
		time: "Jan 13",
		type: "discount",
	},
	{
		id: 6,
		users: [
			{
				name: "Richard Makes Music",
				avatar: "https://i.pravatar.cc/150?img=5",
			},
		],
		text: "ordered a custom video for $200",
		rejected: true,
		type: "order",
	},
];

export const usersList = [
	{
		name: "Jane Love",
		username: "janelove",
		avatar: "https://i.pravatar.cc/150?img=15",
	},
	{
		name: "Kate Lee",
		username: "katelee1",
		avatar: "https://i.pravatar.cc/150?img=16",
	},
	{
		name: "Jane Love",
		username: "janelove",
		avatar: "https://i.pravatar.cc/150?img=15",
	},
	{
		name: "Kate Lee",
		username: "katelee1",
		avatar: "https://i.pravatar.cc/150?img=16",
	},
	{
		name: "Jane Love",
		username: "janelove",
		avatar: "https://i.pravatar.cc/150?img=15",
	},
	{
		name: "Kate Lee",
		username: "katelee1",
		avatar: "https://i.pravatar.cc/150?img=16",
	},
];
