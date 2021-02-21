module.exports = {
  devServer: {
    open: true,
    // port: 8080,
    proxy: {
      // "/api": {
      //   target: "http://yunxiaodian.xyz",
      //   ws: true,
      //   changeOrigin: true,
      //   pathRewrite: { "^/api": "" },
      // },
      "/api": {
        target: "https://ty.php800.cn/api",
        ws: true,
        changeOrigin: true,
        pathRewrite: { "^/api": "/" },
      },
    },
  },
  publicPath: "./",
  assetsDir: "./static", // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  pages: {
    index: {
      // page 的入口
      entry: "src/pages/index/main.js",
      // 模板来源
      template: "src/pages/index/index.html",
      // 在 dist/index.html 的输出
      filename: "index.html",
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: "博客主页",
    },
  },
};
