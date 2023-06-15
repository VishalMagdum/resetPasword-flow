const nodeMailer = require('nodemailer')
const Sendmail = async (option) => {
    const transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        service: "gmail",
        auth: {
            user: "vmagdum18@gmail.com",
            pass: 'nirunpeyqclbgcsl'
        }

    })
    const mailOption = {
        from: 'vmagdum18@gmail.com',
        to: option.email,
        subject: 'Reset password',
        text: option.message
    }
    await transporter.sendMail(mailOption)
}
module.exports = Sendmail