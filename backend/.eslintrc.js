module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["google", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["prettier"],
  rules: {
    "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }],
    "prettier/prettier": "error",
  },
};
