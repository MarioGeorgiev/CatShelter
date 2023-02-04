const util = require('util')
const jswonwebtoken = require('jsonwebtoken')
const jwt = {
    sign : util.promisify(jswonwebtoken.sign),
    verify : util.promisify(jswonwebtoken.verify)
}

module.exports = jwt