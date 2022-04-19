module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/prettier'
    ],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        // "vue/script-indent": ["error",4,{"baseIndent": 1}],
        // 'vue/valid-v-slot': ['error', {
        //     allowModifiers: true,
        // }],
        'prettier/prettier': [
            'warn',
            {
                singleQuote: true,
                semi: false,
                trailingComma: 'none',
                tabWidth: 4,
                bracketSameLine: true
            }
        ]
    }
}
