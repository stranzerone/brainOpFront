const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://brainop.onrender.com',  // Change this to your backend server address
      changeOrigin: true,
    })
  );
};
