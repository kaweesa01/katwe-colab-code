module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },

      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: "file-loader",
      },
      {
        test: /\.(woff|ttf|otf|eot|woff2|svg)$/i,
        loader: "file-loader",
      },

      // {
      //   test: /\.(png|svg|jpg|gif)$/,
      //   use: [
      //     "file-loader",
      //     {
      //       loader: "image-webpack-loader",
      //       options: {
      //         mozjpeg: {
      //           progressive: true,
      //           quality: 65,
      //         },
      //         // optipng.enabled: false will disable optipng
      //         optipng: {
      //           enabled: false,
      //         },
      //         pngquant: {
      //           quality: [0.65, 0.9],
      //           speed: 4,
      //         },
      //         gifsicle: {
      //           interlaced: false,
      //         },
      //         // the webp option will enable WEBP
      //         webp: {
      //           quality: 75,
      //         },
      //       },
      //     },
      //   ],
      // },
    ],
  },
};
