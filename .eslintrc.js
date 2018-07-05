// https://eslint.org/docs/user-guide/configuring

module.exports = {
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'standard',
    'plugin:vue/recommended'
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  // required to lint *.vue files
  // add your custom rules here
  rules: {
    "padded-blocks": "off",
    "prefer-promise-reject-errors": "off",
    "max-len": ["error", {
      "code": 250
    }],
    "no-console": ["error", {
      "allow": ["warn", "error", "info", "time", "timeEnd"]
    }],
    // allow async-await
    'generator-star-spacing': 'off',
    'space-before-function-paren': 'off',
    'max-statements-per-line': 10,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "comma-dangle": ["error", "always-multiline"]
  }
}
