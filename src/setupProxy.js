const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    // proxy第一个参数为要代理的路由
    // 第二参数中target为代理后的请求网址，changeOrigin是否改变请求头，其他参数请看官网
    app.use(createProxyMiddleware('/whp', {
        target: 'http://121.40.243.225:8091',
        changeOrigin: true
    }));

    app.use(createProxyMiddleware('/ws/geocoder/v1', {
        target: 'https://apis.map.qq.com',
        changeOrigin: true
    }));
};
