import mongoose from "mongoose";
import colors from "colors";

const mongoConnect = (mongoConnectUri, port, server) => {
  mongoose
    .connect(mongoConnectUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => {
      server.listen(port, () => {
        console.log(colors.green("Connected to mongodb"));
        console.log(colors.bold.yellow(`> App is running on port ${port}`));
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export default mongoConnect;
