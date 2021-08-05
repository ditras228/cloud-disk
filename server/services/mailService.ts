const nodemailer = require("nodemailer");
export async function main(to: string, hash: string) {
    let transporter = nodemailer.createTransport({
        host: "smtp.beget.com",
        port: 2525,
        secure: false,
        auth: {
            user: 'druzhinindmitry@druzhinindmitry.ru',
            pass: process.env.EMAILPASSWORD
        },
    });

    let link=`http://localhost:3000/regconfirm?hash=${hash}`

    await transporter.sendMail({
        from: '"MERNDisk" <druzhinindmitry@druzhinindmitry.ru>',
        to: to,
        subject: "Подтверждение регистрации",
        text: "Спасибо за регистрацию на MERNDisk!",
        html: `<a href=${link}>Подтвердить</a>`,
    });
}
