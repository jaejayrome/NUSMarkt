/* eslint-disable import/no-commonjs, import/unambiguous, node/no-unsupported-features/es-syntax */

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'google',
  ],
  parserOptions: {
    ecmaVersion: 2023,
    sourceType: 'module',
  },
  ignorePatterns: ['node_modules/', 'lib/', 'dist/'],
  rules: {
    "no-restricted-globals": ["error", "name", "length"],
    "prefer-arrow-callback": "error",
    "quotes": ["error", "double", {"allowTemplateLiterals": true}],
  },
};



// module.exports = {
//   env: {
//     es6: true,
//     node: true,
//   },
//   parserOptions: {
//     "ecmaVersion": 2018,
//   },
//   extends: [
//     "eslint:recommended",
//     "google",
//   ],
//   rules: {
//     "no-restricted-globals": ["error", "name", "length"],
//     "prefer-arrow-callback": "error",
//     "quotes": ["error", "double", {"allowTemplateLiterals": true}],
//   },
//   overrides: [
//     {
//       files: ["**/*.spec.*"],
//       env: {
//         mocha: true,
//       },
//       rules: {},
//     },
//   ],
//   globals: {},
// };