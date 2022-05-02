module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				targets: {
					browsers: ['defaults', 'not ie 11', 'not ie_mob 11'],
				},
			},
		],
	],
};
