import nodemailer from "nodemailer";
import sesTransport from "nodemailer-ses-transport";

export default nodemailer.createTransport(
  sesTransport({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    rateLimit: 5,
  })
);
