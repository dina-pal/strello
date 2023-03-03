const { transporter } = require("./sendTransport");

module.exports.verifyEmailSend = async (user, email, url) => {
    return new Promise((resolve, reject) => {
    const registerConfig = {
        from: `Shopper Support <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Confirm your email address!",
        html: `<b>Hi ${user} </b> <br >Please verify your email address to continue! <br> <a href="${url}" target="_blank">${url}</a>`,
    };

    transporter.sendMail(registerConfig, (err, info) => {
        if (err) resolve(err)
        resolve(info.messageId);
    });

    });
    
};
