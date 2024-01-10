const createExpoWebpackConfigAsync = require("@expo/webpack-config");
const { sentryWebpackPlugin } = require("@sentry/webpack-plugin");
const webpack = require("webpack");

module.exports = async function (env, argv) {
	const config = await createExpoWebpackConfigAsync(env, argv);
	config.plugins.push(
		sentryWebpackPlugin({
			org: "fyp-llc",
			project: "discords-com",
			authToken: process.env.SENTRY_AUTH_TOKEN,
		}),
	);
	config.plugins.push(
		new webpack.NormalModuleReplacementPlugin(/node:/, (resource) => {
			const mod = resource.request.replace(/^node:/, "");
			switch (mod) {
				case "buffer":
					resource.request = "buffer";
					break;
				case "stream":
					resource.request = "readable-stream";
					break;
				default:
					throw new Error(`Not found ${mod}`);
			}
		}),
	);
	config.ignoreWarnings = config.ignoreWarnings || [];
	config.ignoreWarnings.push(/Failed to parse source map/);
	// Customize the config before returning it.
	return config;
};
