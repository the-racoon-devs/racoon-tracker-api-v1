import * as dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

import server from "./api";

server.listen(process.env.API_PORT || "5000", () => {
  console.log(
    `The Dali API server has successfully started. \nListening at ${
      process.env.APP_BASE_URL || "http://localhost:5000"
    }`
  );
});
