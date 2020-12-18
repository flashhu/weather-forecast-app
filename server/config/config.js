module.exports = {
    env: 'dev',
    // env: 'prod',
    database: {
        database: 'weather_db',
        host: 'rm-bp1booh30eg441m31fo.mysql.rds.aliyuncs.com',
        port: 3306,
        user: 'weather_user',
        password: '1qaz3EDC'
    },
    security: {
        secretKey: "Android2BigWork", // 最好用随机字符串
        expiresIn: 60*60*24*30 // 令牌过期时间
    }
}