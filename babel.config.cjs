// use babel.config.json or babel.config.cjs avoid `type:module`
module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
  ],
  // transform import.meta
  // @see: https://github.com/facebook/jest/issues/12183#issuecomment-1004320665
  plugins: ["babel-plugin-transform-import-meta"],
};
