const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp.beget.com",
  port: 2525,
  secure: false,
  auth: {
    user: "ditras@druzhinindmitry.ru",
    pass: process.env.EMAILPASSWORD,
  },
});

const mailer = async (to: string, hash: string) => {
  let link = `http://87.236.22.121:3001/regconfirm?hash=${hash}`;

  await transporter.sendMail({
    from: '"MERNDisk" <ditras@druzhinindmitry.ru>',
    to: to,
    subject: "Подтверждение регистрации",
    text: "Спасибо за регистрацию на MERNDisk!",
    html: `<a href=${link}>Подтвердить</a>`,
  });
};

module.exports = mailer;
