module.exports = {
  extends: ['universe/native'],
  plugins: ['import', 'unused-imports'],
  rules: {
    'no-unused-expressions': ['error', { allowTernary: true, allowShortCircuit: true }],
    'import/order': [
      'error',
      {
        groups: [
          'builtin', // 組み込みモジュール
          'external', // npmでインストールした外部ライブラリ
          'internal', // 自作モジュール
          ['sibling', 'parent'],
          'object',
          'type',
          'index',
        ],
        pathGroupsExcludedImportTypes: ['index'],
        alphabetize: {
          caseInsensitive: true, // 小文字大文字を区別する
        },
        'newlines-between': 'always', // グループ毎にで改行を入れる
        pathGroups: [
          // 指定した順番にソートされる
          {
            pattern: 'screens/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '{api/**,hooks/**}',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: 'components/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '{provider/**,navigation/**}',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '{types/**,utils/**,rootTypes}',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '{icons/**,constants/**}',
            group: 'object',
            position: 'before',
          },
        ],
      },
    ],
    'unused-imports/no-unused-imports': 'error',
  },
};
