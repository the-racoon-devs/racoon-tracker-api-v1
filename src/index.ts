import * as dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
import mongo from "./config/db";

import server from "./api";

server.listen(process.env.API_PORT || "5000", () => {
  console.log(
    `The Dali API server has successfully started. \nListening at ${
      process.env.APP_BASE_URL || "http://localhost:5000"
    }`
  );
});

process.on("SIGINT", function () {
  mongo.close(function () {
    console.log("Mongo Disconnected");
    process.exit(0);
  });
});
