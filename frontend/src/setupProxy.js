const proxy = require('http-proxy-middleware')
module.exports = function (app) {
    app.use('/api1',
        proxy({
            target: 'https://echarts.apache.org',
            changeOrigin: true,
            pathRewrite: {'^/api1': ''}
        })
    )
    app.use('/api2',
        proxy({
            target: 'http://localhost:5000',
            changeOrigin: true,
            pathRewrite: {'^/api2': ''}
        })
    )
}
