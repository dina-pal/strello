const jwt = require('jsonwebtoken');
const { userErrorHandler } = require("../error/userError");
const Tokens = require("../model/Token");
const Users = require("../model/Users");
const { verifyEmailSend } = require("../services/email/authEmail");
const { jsonResponse, verificationLinkGenerator } = require("../utils/utils");


const maxAge = 1000 * 60 * 24 * 30;


module.exports.signupPost = async (req, res) =>{
    const {name, email, password, avatar, role} = req.body;
    const payload = {
                name:name, 
                email:email, 
                password:password, 
                avatar:avatar,
                role: role || 'user',
            };
    try {
        const oldUser = await Users.findOne({ email: payload.email });
        if (oldUser !== null) {
             return jsonResponse(res, 400, false, "User already exist!");
        }
        const user = await Users.create(payload);
        if(user){
            // Create Verification process.
            const verificationLink = await verificationLinkGenerator(user.id);
            // Send the verification email to the user email.
            if(verificationLink !== ''){
                const sendEmail = await verifyEmailSend(user.name, user.email, verificationLink);
                if(sendEmail){
                    return jsonResponse(res, 200, true, "Thank you for Signing your account, a verification email has been sent to your email  address!");
                }
            }
        }
    } catch (err) {
        const error = userErrorHandler(err);
        res.status(500).json({errors: error});
    }

}

module.exports.verifyEmailAddress = async (req, res) =>{
    const {token, uid} = req.query;
    try {
       const foundToken = await Tokens.findOneAndRemove({ userId: uid, token: token });
        if(foundToken ==  null){
            const isUser = await Users.findOne({ id: uid});
            if(isUser.activated === false){
                return jsonResponse(res, 403, false, `Your Account is not verified yet`);
            }else{
                return jsonResponse(res, 200, false, `Your Account is already verified`);
            }
            // return jsonResponse(res, 403, false, 'No Valid Token Found!');
        }else{
            // Check if user exist & Validate user id
            const foundUser = await Users.findByIdAndUpdate(foundToken.userId, {activated: true});
            if(foundUser.activated === true){
            return jsonResponse(res, 200, true, `Hi ${foundUser.name} congratulations,  your Account is verified!`, '' );
            } 
        }
    } catch (error) {
       return jsonResponse(res, 500, false, 'Something went wrong!');
    }
}

module.exports.loginPost =  async (req, res) =>{
    const {email, password} = req.body;
    try {
        const isUser = await Users.findOne({email: email});
        if(isUser === null) {
            return jsonResponse(res, 403, false, 'No User found !');
        }
        const user = isUser.comparePassword(password, (err, result) => {
            if(err)  return err;
            if(result === true){
                const token = jwt.sign({userId: isUser.id, email: isUser.email}, process.env.JWT_SECRET);
                res.cookie('jwt_sign_token', token, {maxAge:maxAge, httpOnly: true, path: '/'})
                jsonResponse(res, 200,true, 'Login successful');
            }else{
               jsonResponse(res, 400,false, 'Something went wrong, please try again');
            }
        });
    } catch (error) {
         return jsonResponse(res, 500, false, 'Email or password is not match!', error);
    }


}
// module.exports.forgetPasswordPost = (req, res) =>{}

