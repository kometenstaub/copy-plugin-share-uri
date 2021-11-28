// Thank you: https://github.com/aidenlx/media-extended/blob/main/esbuild.js
const { build } = require('esbuild');

const banner = `/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
If you want to view the source, visit the plugins’ github repository.
*/
`;

const fs = require('fs');

const copyManifest = {
	name: 'copy-manifest',
	setup: (build) => {
		build.onEnd(() => {
			fs.copyFileSync('manifest.json', 'build/manifest.json');
			fs.copyFileSync('src/styles.css', 'build/styles.css')
		});
	},
};

const isProd = process.env.BUILD === 'production';

(async () => {
	try {
		await build({
			entryPoints: ['src/main.ts'],
			bundle: true,
			watch: !isProd,
			platform: 'browser',
			external: ['obsidian'],
			format: 'cjs',
			banner: { js: banner },
			sourcemap: isProd ? false : 'inline',
			minify: isProd,
			logLevel: 'info',
			treeShaking: true,
			define: {
				'process.env.NODE_ENV': JSON.stringify(process.env.BUILD),
			},
			outfile: 'build/main.js',
			plugins: [copyManifest],
		});
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
})();
