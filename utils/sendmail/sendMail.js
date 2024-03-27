import transporter from "./mailTranspoter";

export default ({ to, subject, text, html }) => {
  return transporter.sendMail({
    from: `${process.env.APP_NAME} <${process.env.APP_EMAIL}>`,
    to,
    subject,
    text,
    html,
  });
};
