module.exports = function babelConfig(api = null) {
  if (api) {
    api.cache(true);
  }
  return {
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            node: "12",
          },
        },
      ],
      "@babel/typescript",
    ],
    plugins: [
      ["babel-plugin-inline-import"],
      [
        "module-resolver",
        {
          root: ["."],
          cwd: "babelrc",
          alias: {
            "@generation": "./src/lib/@generation",
          },
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      ],
    ],
  };
};
