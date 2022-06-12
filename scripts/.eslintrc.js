module.exports = {
  env: {
    browser: false,
    node: true,
  },
  rules: {
    "no-console": ["error", { allow: ["log"] }],
    "import/no-extraneous-dependencies": ["error", { "devDependencies": true }],
  },
};
