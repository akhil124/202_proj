import mongoose from "mongoose";
//connect monogodb
const dbURL =
  "mongodb+srv://admin:admin@cluster0.s6rjw.mongodb.net/Fitzo?retryWrites=true&w=majority";
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

function connectDatabase() {
  mongoose
    .connect(dbURL, connectionParams)
    .then(() => {
      console.info("connected to db");
    })
    .catch((e) => {
      console.error(e);
    });
}

export { connectDatabase };
