const expoPWA = require("expo-pwa");
const expoPWAHTML = require("expo-pwa/build/HTML");
const fs = require("fs");
const Module = require("module");
const path = require("path");
const { transform } = require("sucrase");

const configPath = "./app.config.js";

const appConfigSrc = fs.readFileSync(configPath, "utf-8");
const { code } = transform(appConfigSrc, {
	filePath: configPath,
	transforms: ["imports"],
});

// https://github.com/floatdrop/require-from-string/blob/master/index.js
const paths = Module._nodeModulePaths(path.dirname(configPath));
const parent = module.parent;

const m = new Module(configPath, parent);
m.filename = configPath;
m.paths = paths;
m._compile(code, configPath);

const appConfig = m.exports.default;
parent &&
	parent.children &&
	parent.children.splice(parent.children.indexOf(m), 1);

const projectRoot = process.cwd();
const outputDir = path.join(projectRoot, "dist");

function isResizeMode(input) {
	return (
		input &&
		["contain", "cover", "fill", "inside", "outside"].includes(input)
	);
}

async function generateAssets(
	type,
	{ src, color: backgroundColor, resizeMode = "contain" },
) {
	if (!isResizeMode(resizeMode)) {
		console.error(
			`The provided resizeMode "${resizeMode}" is invalid. Please use one of [cover, contain]`,
		);
		process.exit(-1);
	}
	const items = await expoPWA.generateAsync(
		type,
		{
			projectRoot,
			publicPath: outputDir,
		},
		{ src, backgroundColor, resizeMode },
	);

	save(items);
}

let manifest = {};

function save(items) {
	for (const item of items) {
		const assetPath = path.resolve(outputDir, item.asset.path);
		fs.mkdirSync(path.dirname(assetPath), { recursive: true });
		fs.writeFileSync(assetPath, item.asset.source);

		if (item.tag) {
			if (item.tag?.attributes?.href) {
				item.tag.attributes.href =
					"/" + path.relative(outputDir, item.tag?.attributes?.href);
			}
			// console.log(expoPWAHTML.htmlTagObjectToString(item.tag));
		}

		if (item.manifest) {
			if (!Array.isArray(manifest.icons)) manifest.icons = [];
			if (item.manifest?.src) {
				item.manifest.src =
					"/" + path.relative(outputDir, item.manifest.src);
			}
			manifest.icons.push(item.manifest);
		}
	}
}

manifest = {
	...manifest,
	...expoPWA.generateManifestJson({
		projectRoot,
	}),
};

generateAssets("chrome-icon", {
	src: appConfig.expo.icon,
	color: "transparent",
});

generateAssets("safari-icon", {
	src: appConfig.expo.icon,
	color: "transparent",
});

fs.writeFileSync(
	path.resolve(outputDir, "manifest.json"),
	JSON.stringify(manifest, undefined, 2),
);
