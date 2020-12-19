// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function (app) {
//     app.use(
//         '/apiWeather',
//         createProxyMiddleware({
//             target: 'https://devapi.qweather.com/v7',
//             changeOrigin: true,
//             pathRewrite: {
//                 '^/apiWeather': '/'
//             }
//         })
//     );
//     app.use(
//         '/apiCityCode',
//         createProxyMiddleware({
//             target: 'https://geoapi.qweather.com/v2',
//             changeOrigin: true,
//             pathRewrite: {
//                 '^/apiCityCode': '/'
//             }
//         })
//     );
//     app.use(
//         '/apiPic',
//         createProxyMiddleware({
//             target: 'https://www.bing.com',
//             changeOrigin: true,
//             pathRewrite: {
//                 '^/apiPic': '/'
//             }
//         })
//     );
// };