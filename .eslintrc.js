module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node":true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        'prettier'
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 13,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        'prettier',
    ],
    "rules": {
        'prettier/prettier':2,
        // quotes:['error','never'],
        'no-console': 0,
        'no-var':'error',
        'prefer-const':'error',
    },
};
