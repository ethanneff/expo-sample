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
    react.configs.flat['all'],
    react.configs.flat['jsx-runtime'], // https://github.com/jsx-eslint/eslint-plugin-react
    reactPlugin.configs['recommended-type-checked'], // https://github.com/Rel1cx/eslint-react
    reactRefresh.configs['recommended'], // https://github.com/ArnaudBarre/eslint-plugin-react-refresh
    // plugins
    reactQuery.configs['flat/recommended'], // https://tanstack.com/query/latest/docs/eslint/eslint-plugin-query
    sonarjs.configs['recommended'], // https://github.com/SonarSource/SonarJS
    unicorn.configs['flat/recommended'], // https://github.com/sindresorhus/eslint-plugin-unicorn
    promise.configs['flat/recommended'], // https://github.com/eslint-community/eslint-plugin-promise
    regex.configs['flat/recommended'], // https://github.com/gmullerb/eslint-plugin-regex
    jsxA11y.flatConfigs['recommended'], // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
    comments['recommended'], // https://mysticatea.github.io/eslint-plugin-eslint-comments/
    // typescript
    typescript.configs['strictTypeChecked'], // https://typescript-eslint.io/getting-started
    typescript.configs['stylisticTypeChecked'],
    // styling
    stylistic.configs.customize({
      // https://eslint.style/packages/default
      semi: true,
      braceStyle: '1tbs',
      arrowParens: true,
      jsx: true,
    }),
    perfectionist.configs['recommended-natural'], // https://perfectionist.dev/
    prettier,
  ],
  ignores: ['dist', 'node_modules'],
  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      typescript: true,
    },
  },
  languageOptions: {
    parser: typescript.parser,
    parserOptions: {
      projectService: true,
      tsconfigRootDir: __dirname,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    globals: {
      ...globals.node,
    },
  },
  plugins: {
    'react-hooks': reactHooks, // https://www.npmjs.com/package/eslint-plugin-react-hooks
    'react-compiler': reactCompiler, // https://www.npmjs.com/package/eslint-plugin-react-compiler
    '@next/next': nextPlugin, // https://nextjs.org/docs/app/api-reference/config/eslint
  },
  rules: {
    // legacy plugins
    ...reactHooks.configs.recommended.rules,
    // ...nextPlugin.configs['recommended'].rules,
    // ...nextPlugin.configs['core-web-vitals'].rules,
    'react-compiler/react-compiler': 'error',
    // plugin default overrides
    '@next/next/no-html-link-for-pages': 'off',
    'react/react-in-jsx-scope': 'off', // not needed with react 17+
    '@typescript-eslint/no-require-imports': 'off', // needed react native images
    '@stylistic/operator-linebreak': [
      'error',
      'after',
      { overrides: { '?': 'before', ':': 'before' } },
    ], // prettier
    '@stylistic/quote-props': ['error', 'as-needed'], // prettier
    '@stylistic/indent': 'off', // prettier
    '@stylistic/indent-binary-ops': 'off', // prettier
    '@stylistic/operator-linebreak': 'off', // prettier
    '@stylistic/jsx-wrap-multilines': 'off', // prettier
    '@stylistic/multiline-ternary': 'off', // prettier
    'unicorn/no-null': 'off', // needed for react jsx
    'react/jsx-filename-extension': 'off', // typescript
    'react/jsx-max-depth': 'off', // not needed
    'react/jsx-sort-props': 'off', // not needed
    'react/require-default-props': 'off', // undefined === false for props
    'unicorn/filename-case': 'off', // flip between camelCase and PascalCase
    'unicorn/prefer-module': 'off', // needed for react native images
    'no-magic-numbers': 'off',
    'one-var': 'off',
    'no-ternary': 'off',
    'sort-imports': 'off',
    'no-void': 'off',
    'no-undefined': 'off',
    'id-length': 'off',
    camelcase: 'off',
    'capitalized-comments': 'off',
    'sort-keys': 'off',
    'max-statements': 'off',
    'max-lines-per-function': 'off',
    'react/jsx-fragments': ['error', 'element'], // counter react/react-in-jsx-scope
    'jest/prefer-expect-assertions': 'off', // annoying
    'jest/require-hook': 'off',
    'jest/no-hooks': 'off',
    // custom
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'react-native',
            importNames: [
              'View',
              'Text',
              'Button',
              'ActivityIndicator',
              'TouchableOpacity',
              'TextInput',
            ],
            message: 'Please from @mobile/components instead.',
          },
          {
            name: 'react-native-fast-image',
            importNames: ['FastImage'],
            message: 'Please from @mobile/components instead.',
          },
          {
            name: '@react-native-firebase/analytics',
            message: 'Please use @mobile/packages/Firebase instead.',
          },
          {
            name: '@react-native-firebase/crashlytics',
            message: 'Please use @mobile/packages/Firebase instead.',
          },
          {
            name: '@react-native-firebase/messaging',
            message: 'Please use @mobile/packages/Firebase instead.',
          },
        ],
      },
    ],
    'perfectionist/sort-imports': ['error', { newlinesBetween: 'never' }],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
        disallowTypeAnnotations: false,
      },
    ],
    // re-enable in the future
    'react/forbid-component-props': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off', // annoying conversion
    '@typescript-eslint/no-misused-promises': 'off', // need to handle jsx function
    'sonarjs/todo-tag': 'off', // should make todos into tickets
    'no-use-before-define': 'off',
    'consistent-return': 'off',
    'no-warning-comments': 'off',
    complexity: 'off',
    // slow (TIMING=all npx eslint src --fix --stats -f json)
    'sonarjs/no-commented-code': 'off',
    'sonarjs/deprecation': 'off',
  },
});
