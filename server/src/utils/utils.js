const crypto = require("crypto-js");
const bcrypt = require("bcrypt");
const Tokens = require("../model/Token");

/**
 * set token to database and generate a hashed url
 * @param {mix} id Generate url based on user id
 * @returns {String} return hashed url
 */
module.exports.verificationLinkGenerator = async (id) => {
    const genToken = crypto.SHA256(id);

    const oldToken = await Tokens.findOne({ userId: id });
    if (oldToken !== null) {
        const updateToken = await Tokens.updateOne({ token: genToken});
        return `${process.env.BASE_URL}/verify/?token=${updateToken.token}&uid=${id}`;
    }
    const token = await Tokens.create({ userId: id, token: genToken });
    if (token === null) {
        return false;
    }
    return `${process.env.BASE_URL}/verify/?token=${token.token}&uid=${id}`;
};

/**
 *
 * @param {Number} statusCode Status Code for the response
 * @param {Boolean} success Success Type
 * @param {String} message Success Message
 * @returns {Object} response json
 */
module.exports.jsonResponse = (
    res,
    statusCode = 200,
    success = true,
    message = "",
    info = null
) => {
    return res.status(statusCode).json({
        success: success,
        message: message,
        info,
    });
};


module.exports.comparePassword = async (hash, password) =>{
    bcrypt.compare(password, hash, (err, result) =>{
        if(err) return false;
        return true;
    });
}
