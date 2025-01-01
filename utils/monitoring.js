const nodemailer = require('nodemailer');

const alertAdmin = async (error) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: 'MongoDB Connection Alert',
        text: `MongoDB Error: ${error.message}\nTimestamp: ${new Date()}`
    });
};

module.exports = { alertAdmin }; 