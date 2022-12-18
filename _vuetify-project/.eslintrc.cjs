/* eslint-env node */
module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    'plugin:vue-pug/vue3-recommended',
    'eslint:recommended',
    '@vue/standard'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    // 停用屬性規則'vue/max-attributes-per-line': 0
    'vue/max-attributes-per-line': 'off'
  }
}
