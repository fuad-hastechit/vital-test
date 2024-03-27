import Queue from "bull";

const sendMailQueue = new Queue(
  process.env.EMAIL_QUEUE_NAME,
  process.env.REDIS_URI
);

import sendMail from "@utils/sendmail/sendMail";

sendMailQueue.process(async (job, done) => {
  try {
    await sendMail(job.data, done);
    done();
  } catch (err) {
    console.log(err);
    done(err);
  }
});
