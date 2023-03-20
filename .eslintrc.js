module.exports = {
    // 解析配置
    parserOptions: {
        ecmaVersion: 11,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true, // 开启jsx的校验，因为是react开发，必写
        },
    },
    // 集成airbnb对React代码校验
    extends: [
        'airbnb',
        'airbnb/hooks',
        'plugin:react/jsx-runtime',
        'plugin:import/recommended',
        'plugin:import/typescript',
    ],
    plugins: ['eslint-plugin-import'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    settings: {
        'import/resolver': {
            // typescript: {
            //   directory: './tsconfig.json',
            // },
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
    ignorePatterns: ['.eslintrc.js'],
    // 自定义的校验规则
    rules: {
        semi: 'error', // 如果语句没有分号，就报错
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            },
        ],
        'object-curly-newline': 'off',
        'comma-dangle': 'off',
        'no-undef': 'off',
        'import/no-unresolved': 'off',
        'react/jsx-indent': 'off',
        indent: 'off',
    },
};
