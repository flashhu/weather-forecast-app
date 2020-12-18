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

module.exports = {
    PositiveIntegerValidator,
    RegisterValidator,
    TokenValidator,
    NotEmptyValidator,
    AddRecordValidator
}