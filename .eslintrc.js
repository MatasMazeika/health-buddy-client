module.exports = {
	root: true,
	
	env: {
		node: true,
	},
	
	extends: [
		'plugin:vue/vue3-essential',
		'@vue/airbnb',
	],
	
	parserOptions: {
		parser: '@typescript-eslint/parser',
	},
	
	rules: {
		"import/extensions": [
			"error",
			"ignorePackages",
			{
				"js": "never",
				"ts": "never",
			}
		],
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		indent: ['error', 'tab'],
		'no-tabs': ['error', {allowIndentationTabs: true}],
		'max-len': ['error', {code: 120, tabWidth: 4}],
		'vue/max-attributes-per-line': ['error', {
			singleline: 1,
			multiline: {
				max: 1,
				allowFirstLine: false,
			},
		}],
		'import/prefer-default-export': 'off',
		'no-unused-vars': 'off',
		'import/no-cycle': 'off',
	},
	
	extends: [
		'plugin:vue/vue3-essential',
		'@vue/airbnb',
		'@vue/typescript',
	],
};
