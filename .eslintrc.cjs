module.exports = {
	env: {
		es6: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/eslint-recommended",
		"plugin:prettier/recommended",
		"prettier",
	],
	globals: {
		Atomics: "readonly",
		SharedArrayBuffer: "readonly",
	},
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: "module",
	},
	plugins: ["@typescript-eslint", "prettier"],
	rules: {
		"prettier/prettier": "error",
		"linebreak-style": ["error", "unix"],
		"no-unused-vars": "off",
		semi: ["error", "always"],
		"@typescript-eslint/no-explicit-any": "error",
	},
};
