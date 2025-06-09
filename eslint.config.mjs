import comments from '@eslint-community/eslint-plugin-eslint-comments/configs';
import reactPlugin from '@eslint-react/eslint-plugin';
import eslint from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import stylistic from '@stylistic/eslint-plugin';
import reactQuery from '@tanstack/eslint-plugin-query';
import jest from 'eslint-plugin-jest';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import perfectionist from 'eslint-plugin-perfectionist';
import prettier from 'eslint-plugin-prettier/recommended';
import promise from 'eslint-plugin-promise';
import react from 'eslint-plugin-react';
import reactCompiler from 'eslint-plugin-react-compiler';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import regex from 'eslint-plugin-regexp';
import sonarjs from 'eslint-plugin-sonarjs';
import testingLibrary from 'eslint-plugin-testing-library';
import unicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import typescript from 'typescript-eslint';

// TODO: eslint-plugin-import, import/no-cycle
// TODO: eslint-plugin-react-perf
// TODO: eslint-plugin-react-native, @react-native/eslint-config

const __dirname = dirname(fileURLToPath(import.meta.url));

export default typescript.config({
  extends: [
    eslint.configs.all,
    // testing
    jest.configs['flat/all'], // https://github.com/jest-community/eslint-plugin-jest
    testingLibrary.configs['flat/react'], // https://github.com/testing-library/eslint-plugin-testing-library
    // react
    react.configs.flat.all,
    react.configs.flat['jsx-runtime'], // https://github.com/jsx-eslint/eslint-plugin-react
    reactPlugin.configs['recommended-type-checked'], // https://github.com/Rel1cx/eslint-react
    reactRefresh.configs.recommended, // https://github.com/ArnaudBarre/eslint-plugin-react-refresh
    // expoConfig,
    // plugins
    reactQuery.configs['flat/recommended'], // https://tanstack.com/query/latest/docs/eslint/eslint-plugin-query
    sonarjs.configs.recommended, // https://github.com/SonarSource/SonarJS
    unicorn.configs['flat/recommended'], // https://github.com/sindresorhus/eslint-plugin-unicorn
    promise.configs['flat/recommended'], // https://github.com/eslint-community/eslint-plugin-promise
    regex.configs['flat/recommended'], // https://github.com/gmullerb/eslint-plugin-regex
    jsxA11y.flatConfigs.recommended, // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
    comments.recommended, // https://mysticatea.github.io/eslint-plugin-eslint-comments/
    // typescript
    typescript.configs.strictTypeChecked, // https://typescript-eslint.io/getting-started
    typescript.configs.stylisticTypeChecked,
    // styling
    stylistic.configs.customize({
      arrowParens: true,
      braceStyle: '1tbs',
      jsx: true,
      // https://eslint.style/packages/default
      semi: true,
    }),
    perfectionist.configs['recommended-natural'], // https://perfectionist.dev/
    prettier,
  ],
  ignores: ['dist', 'node_modules'],
  languageOptions: {
    globals: {
      ...globals.node,
    },
    parser: typescript.parser,
    parserOptions: {
      ecmaVersion: 'latest',
      projectService: true,
      sourceType: 'module',
      tsconfigRootDir: __dirname,
    },
  },
  plugins: {
    '@next/next': nextPlugin, // https://nextjs.org/docs/app/api-reference/config/eslint
    'react-compiler': reactCompiler, // https://www.npmjs.com/package/eslint-plugin-react-compiler
    'react-hooks': reactHooks, // https://www.npmjs.com/package/eslint-plugin-react-hooks
  },
  rules: {
    // legacy plugins
    ...reactHooks.configs.recommended.rules,
    // plugin default overrides
    '@next/next/no-html-link-for-pages': 'off',
    '@stylistic/indent': 'off', // prettier
    '@stylistic/indent-binary-ops': 'off', // prettier
    '@stylistic/jsx-wrap-multilines': 'off', // prettier
    '@stylistic/multiline-ternary': 'off', // prettier
    '@stylistic/operator-linebreak': [
      'error',
      'after',
      { overrides: { ':': 'before', '?': 'before' } },
    ], // prettier
    '@stylistic/operator-linebreak': 'off', // prettier
    '@stylistic/quote-props': ['error', 'as-needed'], // prettier
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        disallowTypeAnnotations: false,
        fixStyle: 'inline-type-imports',
        prefer: 'type-imports',
      },
    ],
    '@typescript-eslint/no-misused-promises': 'off', // need to handle jsx function
    '@typescript-eslint/no-require-imports': 'off', // needed react native images
    '@typescript-eslint/restrict-template-expressions': 'off', // annoying conversion
    camelcase: 'off',
    'capitalized-comments': 'off',
    complexity: 'off',
    'consistent-return': 'off',
    'id-length': 'off',
    'jest/no-hooks': 'off',
    'jest/prefer-expect-assertions': 'off', // annoying
    'jest/require-hook': 'off',
    'max-lines-per-function': 'off',
    'max-statements': 'off',
    'no-magic-numbers': 'off',
    // custom
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            importNames: [
              'View',
              'Text',
              'Button',
              'ActivityIndicator',
              'Pressable',
              'TouchableOpacity',
              'TextInput',
            ],
            message: 'Please from @mobile/components instead.',
            name: 'react-native',
          },
          {
            importNames: ['FastImage'],
            message: 'Please from @mobile/components instead.',
            name: 'react-native-fast-image',
          },
          {
            message: 'Please use @mobile/packages/Firebase instead.',
            name: '@react-native-firebase/analytics',
          },
          {
            message: 'Please use @mobile/packages/Firebase instead.',
            name: '@react-native-firebase/crashlytics',
          },
          {
            message: 'Please use @mobile/packages/Firebase instead.',
            name: '@react-native-firebase/messaging',
          },
        ],
      },
    ],
    'no-ternary': 'off',
    'no-undefined': 'off',
    'no-use-before-define': 'off',
    'no-void': 'off',
    'no-warning-comments': 'off',
    'one-var': 'off',
    'perfectionist/sort-imports': ['error', { newlinesBetween: 'never' }],
    // ...nextPlugin.configs['recommended'].rules,
    // ...nextPlugin.configs['core-web-vitals'].rules,
    'react-compiler/react-compiler': 'error',
    // re-enable in the future
    'react/forbid-component-props': 'off',
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-filename-extension': 'off', // typescript
    'react/jsx-fragments': ['error', 'element'], // counter react/react-in-jsx-scope
    'react/jsx-max-depth': 'off', // not needed
    'react/jsx-sort-props': 'off', // not needed
    'react/react-in-jsx-scope': 'off', // not needed with react 17+
    'react/require-default-props': 'off', // undefined === false for props
    'sonarjs/deprecation': 'off',
    // slow (TIMING=all npx eslint src --fix --stats -f json)
    'sonarjs/no-commented-code': 'off',
    'sonarjs/todo-tag': 'off', // should make todos into tickets
    'sort-imports': 'off',
    'sort-keys': 'off',
    'unicorn/filename-case': 'off', // flip between camelCase and PascalCase
    'unicorn/no-null': 'off', // needed for react jsx
    'unicorn/prefer-module': 'off', // needed for react native images
  },
  settings: {
    'import/resolver': {
      typescript: true,
    },
    react: { version: 'detect' },
  },
});
