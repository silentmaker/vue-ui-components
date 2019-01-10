module.exports = {
  devServer: {
    proxy: 'http://localhost:9000',
  },
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/vue-ui-components/'
    : '/',
};
