// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function (app) {
//     app.use(
//         createProxyMiddleware(
//             '/apiPic', {
//                 target: 'https://www.bing.com',
//                 changeOrigin: true,
//                 pathRewrite: {
//                     '^/apiPic': '/'
//                 }
//             })
//     );
// };