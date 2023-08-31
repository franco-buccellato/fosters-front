const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware(
            {
                target: 'http://localhost:5000/',
                //target: 'http://fosters-app.azurewebsites.net/',
                changeOrigin: true,
                ws: true,
                onProxyReq: function(request) {
                    //request.setHeader("origin", "http://fosters-app.azurewebsites.net/");
                    request.setHeader("origin", "http://localhost:5000/");
                },
            }
        )
    );
};