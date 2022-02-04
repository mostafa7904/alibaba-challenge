module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": "off", // We use terser to remove all the console logs
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
};
