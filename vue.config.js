module.exports = {
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/trade-dashboard/'
    : '/',
  devServer: {
    disableHostCheck: true,
    host: 'localhost',
    port: 8080,
    public: 'localhost:8080',
  },
};
