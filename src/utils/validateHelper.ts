import { ISignUpForm } from "@usertypes/commonTypes";
export const validateEmail = (strEmail: string): string => {
	if (!strEmail) return "Please input email.";
	const validRegex =
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

	if (strEmail.match(validRegex)) return "";
	else return "Please input valid email.";
};

export const validatePassword = (strPassword: string): string => {
	if (!strPassword) return "Please input password.";
	// min 8 letter, at least a symbol, upper and lower case letters and number
	// let re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
	if (strPassword.length < 8)
		return "Password must be at least 8 characters long.";
	else return "";
};

const usernameRegex = /^[a-zA-Z0-9_.-]{3,32}$/;
export function validateUsername(username: string): string {
	return usernameRegex.test(username.trim())
		? ""
		: "Username can be 3~32 characters includes upper and lower case letters, number, hyphen, single dot and underscore symbole ";
}

export const validateResetPassword = (formData: {
	password: string;
	confirmPassword: string;
}): { password: string; confirmPassword: string } => {
	const formValidate = { password: "", confirmPassword: "" };

	if (!formData.password) formValidate.password = "Password is required.";
	else if (formData.password.length < 8)
		formValidate.password = "Password must be at least 8 characters long.";

	if (formData.password !== formData.confirmPassword)
		formValidate.confirmPassword = "Password didn't match";
	return formValidate;
};

export const validateSignUpForm = (formData: ISignUpForm): ISignUpForm => {
	return {
		username: validateUsername(formData.username),
		email: validateEmail(formData.email),
		password:
			formData.password.length > 0
				? validatePassword(formData.password)
				: "Please input password.",
	};
};
