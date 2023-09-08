const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "index.html"),
        filename: "index.html",
        chunks: ["main"],
      }),
      // new HtmlWebpackPlugin({
      //   template: path.resolve(__dirname, 'client/src/install.html'), // Specify your install HTML template
      //   filename: 'install.html',
      //   chunks: ['install'],
      // }),
      new WebpackPwaManifest({
        name: "Your App Name",
        short_name: "App",
        description: "Description of your app",
        background_color: "#ffffff",
        theme_color: "#31a9e1",
        icons: [
          {
            src: path.resolve("src/images/logo.png"), // Path to your app's icon
            sizes: [96, 128, 192, 256, 384, 512], // Specify icon sizes
          },
        ],
      }),
      new InjectManifest({
        swSrc: path.resolve(__dirname, "src-sw.js"), // Path to your service worker file
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"], // Add CSS loaders
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader", // Add Babel loader
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
  };
};
