const nodemailer = require("nodemailer");


async function sendEmail(dest, message) {
    let transporter = nodemailer.createTransport({
        port: 587,
        secure: false,
        service: 'gmail', // true for 465, false for other ports
        auth: {
            user: process.env.senderEmail, // generated ethereal user
            pass: process.env.senerPassword, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: `"Fred Foo 👻" <${process.env.senderEmail}>`, // sender address
        to: dest, // list of receivers
        subject: "Confirmation Email ✔", // Subject line
        text: "Hello Confirmation Email", // plain text body
        html: message, // html body
    });


}


module.exports = sendEmail