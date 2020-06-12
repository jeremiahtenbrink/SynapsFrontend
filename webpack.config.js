module.exports = {
  test: /\.style.js$/, use: [
    "style-loader", { loader: "css-loader", options: { importLoaders: 2 } }, {
      loader: "postcss-loader",
      options: {
        parser: "postcss-js",
        indent: "postcss",
        plugins: [ require( "postcss-import" )(), require( "stylelint" )() ]
      }
    }, "babel-loader"
  ]
};
