module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'airbnb',
		'airbnb/hooks',
		'airbnb-typescript',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
		'plugin:prettier/recommended',
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.json',
		ecmaFeatures: { jsx: true },
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint', 'prettier', 'simple-import-sort'],
	// INFO : Your ` rules ` here
	rules: {},
	// INFO : Your overrides here with simple-import-sort
	overrides: [
		{
			files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
			rules: {
				'simple-import-sort/imports': [
					'error',
					{
						groups: [
							// Packages `react` related packages come first.
							['^react', '^\\w', '^@hookform', '^@radix-ui'],
							// npm packages
							// Anything that starts with a letter (or digit or underscore), or `@` followed by a letter.
							// ['^\\w'],
							// Internal packages.
							['^@store(/.*|$)'],
							['^@components(/.*|$)'],
							['^@ui(/.*|$)'],
							['^@lib(/.*|$)'],
							['^@pages(/.*|$)'],
							['^@utils(/.*|$)'],
							['^@hooks(/.*|$)'],
							['^@services(/.*|$)'],
							// Side effect imports.
							['^\\u0000'],
							// Parent imports. Put `..` last.
							['^\\.\\.(?!/?$)', '^\\.\\./?$'],
							// Other relative imports. Put same-folder imports and `.` last.
							['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
							// Style imports.
							['^.+\\.?(css)$'],
						],
					},
				],
			},
		},
	],
};
