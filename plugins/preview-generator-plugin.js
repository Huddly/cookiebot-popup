const { readFileSync, writeFileSync } = require('fs');
const path = require('path');
const prettier = require('prettier');

class PreviewGeneratorPlugin {
	constructor({ template, filename, title, styles, scripts, settings }) {
		this.template = template;
		this.filename = filename;
		this.title = title || 'Preview';
		this.styles = styles;
		this.scripts = scripts;
		this.settings = settings || 'settings.json';
	}

	apply(compiler) {
		compiler.hooks.emit.tapAsync('PreviewGeneratorPlugin', (compilation, callback) => {
			let entryFile = readFileSync(this.template, 'utf8');
			if (!entryFile) {
				throw new Error('Entry file not found');
			}

			const rootDir = compiler.options.context;
			const settings = readFileSync(path.join(rootDir, 'settings.json'), 'utf8');
			if (!settings) {
				throw new Error('settings.json not found');
			}
			const settingsJson = JSON.parse(settings);
			const { content, domain_group_id } = settingsJson || {};

			Object.keys(content).forEach((key) => {
				const cb_key = `[#${key.toUpperCase()}#]`;
				const cb_value = content[key];
				while (entryFile.indexOf(cb_key) !== -1) {
					entryFile = entryFile.replace(cb_key, cb_value);
				}
			});

			const html = `
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${this.title}</title>
    <script id="Cookiebot" src="https://consent.cookiebot.com/uc.js" data-cbid="${domain_group_id}" data-blockingmode="auto" type="text/javascript"></script>
	${this.styles.map((style) => `<link rel="stylesheet" href="${style}">`).join('\n')}
</head>
<body>
	<h1>${this.title}</h1>
	${entryFile}
	${this.scripts
		.map((script) => `<script src="${script}" type="text/javascript" data-cookieconsent="ignore"></script>`)
		.join('\n')}
</body>
</html>`;

			let output = '';
			try {
				output = prettier.format(html, {
					parser: 'html',
				});
			} catch (error) {
				const notice = '<!-- This document includes a syntax error. Please check your terminal for details -->';
				output = notice + html;
				console.log(error);
			}

			compilation.emitAsset(this.filename, new compiler.webpack.sources.RawSource(output));
			callback();
		});
	}
}

module.exports = PreviewGeneratorPlugin;