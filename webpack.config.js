module.exports  =  {
    entry:  "./src/index.jsx",
};
const  path  =  require("path");

module.exports  =  {
 module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
    entry:  "./dist/main.js",
    output:  {
        path:  path.resolve(__dirname,  "dist"),
        filename:  "my-first-webpack.bundle.js",
    },
};