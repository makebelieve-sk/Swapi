import nodemailer, {Transporter} from 'nodemailer'
import SMTPTransport from "nodemailer/lib/smtp-transport";
import Mail from "nodemailer/lib/mailer";

class MailService {
    private transporter: Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        } as unknown as SMTPTransport.Options)
    }

    async sendActivationEmail(to: string, link: string) {
        const mailOptions: Mail.Options = {
            from: process.env.SMTP_USER,
            to,
            subject: 'Активация аккаунта на ' + process.env.API_URL,
            text: '',
            html:
                `
                    <div>
                        <h1>Для активации перейдите по ссылке</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
        }

        function callback(error: Error | null, info: any){
            if (error) {
                console.log(error);
                throw new Error(`Произошла ошибка при отправке email уведомления на электронный адрес: ${to}: ${error})}`)
            } else {
                console.log("Письмо отправлено: " + info.response);
            }
        }

        await this.transporter.sendMail(mailOptions, callback)
    }
}

export default new MailService()