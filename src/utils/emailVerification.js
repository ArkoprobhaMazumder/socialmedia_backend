
import nodemailer from "nodemailer";
import ApplicationError from "./errorHandler.js";

export const verifyEmail = (email) => {

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'arkoprobha30@gmail.com',
            pass: 'ydwz vbij xvxg bkyf'
        }
    })

    const result = () => {
        let num = Math.random() * 10000;
        num = String(num).substring(0, 4);
        return num;
    }

    let value = result();

    const mailOptions = {
        from: 'arkoprobha30@gmail.com',
        to: `${email}`,
        subject: "Register Verification Social Media",
        text: `OTP: ${value}`
    }


    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            throw new ApplicationError("Failed to send email", 500);
        } else {
            console.log(info.response);
        }
    })


    return value;
}