const proxy = require('http-proxy-middleware')
module.exports = function (app) {
    app.use('/api1',
        proxy({
            target: 'https://echarts.apache.org',
            changeOrigin: true,
            pathRewrite: {'^/api1': ''}
        })
    )
}
