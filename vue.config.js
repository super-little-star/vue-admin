const path = require("path");
module.exports = {
  lintOnSave: true,
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "./src/styles/main.scss";'
      }
    }
  },
  chainWebpack: config => {
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
        include: ["./src/Icon"]
      });
  },
  configureWebpack: config => {
    config.resolve = {
      extensions: [".js", ".json", ".vue"],
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@c": path.resolve(__dirname, "./src/components"),
        "@v": path.resolve(__dirname, "./src/views"),
        "@s": path.resolve(__dirname, "./src/styles"),
        // eslint-disable-next-line prettier/prettier
        "vue": "vue/dist/vue.js"
      }
    };
  }
};
