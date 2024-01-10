const { plugin } = require("twrnc");

module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/**/**/*.{js,jsx,ts,tsx}"],
	theme: {
		fontFamily: {
			"inter-black": "Inter-Black",
			"inter-light": "Inter-Light",
			"inter-regular": "Inter-Regular",
			"inter-medium": "Inter-Medium",
			"inter-semibold": "Inter-SemiBold",
			"inter-bold": "Inter-Bold",
		},
		extend: {
			colors: {
				"fans-black": "#000",
				"fans-black-2e": "#2e2e2e",
				"fans-blue": {
					DEFAULT: "#5865F2",
					light: "#00ACEE",
					"1D": "#1D21E5",
				},
				"fans-blue-6d": "#6D83F7",
				"fans-brown-3b": "#3b2121",
				"fans-red": {
					DEFAULT: "#EB2121",
					FF: "#FF505D",
				},
				"fans-red-eb": "#EB2121",
				"fans-red-fd": "#FDE8E8",
				"dark-cyan": "#0EAAC9",
				"fans-purple": {
					DEFAULT: "#A854F5",
					light: "#F6EDFF",
					D8: "#D885FF",
				},
				"fans-purple-5f": "#5F17D3",
				"fans-purple-a8": "#A854F5",
				"fans-purple-f6": "#F6EDFF",
				"fans-purple-6a": "#6a1de5",
				"fans-green": "#4DCC36",
				"fans-green-4d": "#4DCC36",
				"fans-green-65": "#65D072",
				"fans-green-second": "#23C9B1",
				"fans-grey": {
					DEFAULT: "#F0F0F0",
					dark: "#707070",
				},
				"fans-grey-66": "#666666",
				"fans-grey-70": "#707070",
				"fans-grey-b1": "#B1B1B1",
				"fans-grey-de": "#DEDEDE",
				"fans-grey-f0": "#F0F0F0",
				"fans-dark-grey": "#707070",
				"fans-pink": "#E53EC6",
				"fans-yellow": "#F98C28",
				"fans-white": "#FFF",
			},
			boxShadow: {
				sm: "1px 1px 5px rgba(0, 0, 0, 0.5)",
			},
			dropShadow: {
				sm: "10px 10px 50px rgb(0, 0, 0)",
			},
			borderRadius: {
				large: "20px",
			},
			height: {
				"fans-checkbuttons": "42px",
				"fans-button": "42px",
				"fans-button-desktop": "66px",
				"fans-chips": "34px",
				"fans-dropdown": "42px",
				"fans-iconbutton": "34px",
				"fans-selectgroup": "34px",
				"fans-selectgroup-badge": "16px",
				"fans-switch": "25px",
				"fans-tabs": "52px",
				"fans-textinput": "42px",
			},
			width: {
				"fans-iconbutton": "34px",
				"fans-switch": "40px",
			},
			maxHeight: {
				"fans-selectgroup": "34px",
				"fans-textinput": "42px",
			},
		},
		screens: {
			sm: "640px",
			md: "992px",
			lg: "1280px",
			"2lg": "1400px",
			xl: "1700px",
			// "2xl": "1536px",
		},
	},
	// plugins: [
	// 	plugin(({addUtilities}) => {
	// 		addUtilities({
	// 			truncate: {
	// 				overflow: 'hidden',
	// 				textOverflow: 'ellipsis',
	// 				whiteSpace: 'nowrap'
	// 			}
	// 		});
	// 	})
	// ]
};
