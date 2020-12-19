const { LinValidator, Rule } = require('../../core/lin-validator-v2')

class PositiveIntegerValidator extends LinValidator {
    constructor() {
        super()
        this.id = [
            new Rule('isInt', '需要正整数', { min: 1 })
        ]
    }
}

class RegisterValidator extends LinValidator {
    constructor() {
        super()
        this.passwd = [
            // 限定长度 包含特殊字符
            new Rule('isLength', '密码长度需为6~32位', { min: 6, max: 32 }),
            new Rule('matches', '密码必需包含大小写字母和数字', /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,32}$/)
        ]
        this.name = [
            new Rule('isLength', '名称长度需为1~10位', { min: 1, max: 10 })
        ]
    }
}

class TokenValidator extends LinValidator {
    constructor() {
        super()
        this.name = [
            new Rule('isLength', '账号长度不符规则', { min: 1, max: 10 })
        ]
        this.passwd = [
            new Rule('isLength', '密码至少6位', { min: 6, max: 32 })
        ]
    }
}

class NotEmptyValidator extends LinValidator {
    constructor() {
        super()
        this.token = [
            new Rule('isLength', '不允许为空', { min: 1 })
        ]
    }
}

class AddRecordValidator extends LinValidator {
    constructor() {
        super()
        this.name = [
            new Rule('isLength', '不允许为空', { min: 1, max: 20 })
        ]
        this.code = [
            new Rule('isLength', '不允许为空', { min: 1, max: 20 })
        ]
    }
}

class updatePasswdValidator extends LinValidator {
    constructor() {
        super()
        this.oldPasswd = [
            new Rule('isLength', '原密码长度不符合格式要求', { min: 6, max: 32 })
        ]
        this.newPasswd = [
            new Rule('isLength', '新密码长度需为6~32位', { min: 6, max: 32 }),
            new Rule('matches', '新密码必需包含大小写字母和数字', /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,32}$/)
        ]
    }
}

class updateHistoryDayValidator extends LinValidator {
    constructor() {
        super()
        this.day = [
            new Rule('isInt', '天数大小需为1~7', { min: 1, max: 7 })
        ]
    }
}

class updateCityValidator extends LinValidator {
    constructor() {
        super()
        this.cityName = [
            new Rule('isLength', '城市名称不允许为空', { min: 1, max: 20 })
        ]
        this.cityCode = [
            new Rule('isLength', '城市代码不允许为空', { min: 1, max: 20 }),
            new Rule('matches', '城市代码为全数字', /^[0-9]*$/)
        ]
    }
}

class updateAutoLoginValidator extends LinValidator {
    constructor() {
        super()
        this.autoLogin = [
            new Rule('isInt', '自动登录值不符格式', { min: 0, max: 1 })
        ]
    }
}

module.exports = {
    PositiveIntegerValidator,
    RegisterValidator,
    TokenValidator,
    NotEmptyValidator,
    AddRecordValidator,
    updatePasswdValidator,
    updateCityValidator,
    updateHistoryDayValidator,
    updateAutoLoginValidator
}