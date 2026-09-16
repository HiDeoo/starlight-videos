import hideoo from '@hideoo/eslint-config'

export default hideoo(
  {
    ignores: ['eslint.config.mjs'],
    languageOptions: {
      parserOptions: {
        project: ['../../tsconfig.json'],
      },
    },
  },
  {
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
  {
    files: ['overrides/DraftContentNotice.astro', 'overrides/FallbackContentNotice.astro'],
    rules: {
      'unicorn/no-empty-file': 'off',
    },
  },
)
