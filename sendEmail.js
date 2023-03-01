const nodemailer = require('nodemailer');

require('dotenv').config();

exports.sendMail = async (email, name, uname, passw) => {

    try {
        const username = process.env.EMAIL_NAME;
        const pass = process.env.PASSWORD;
        const Transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: username,
                pass: pass
            }
        });
        const mailOptions = {
            from: 'projectfinal087@gmail.com',
            to: email,
            subject: 'Email Verification',
            html: `<p>Dear ${name},<br>Username: ${uname}<br>Password: ${passw}</p>`
        }
        Transporter.sendMail(mailOptions, function (error, info) {
            if (error)
                console.log(error);
            else {
                console.log(`Email has been sent to `, info.response);
            }
        })
    } catch (error) {
        console.log(error);
    }

}
