import * as dbPool from "../../config/db";

export default async function getUser(uid: string) {
  var user = {};
  await dbPool
    .query(`SELECT * FROM users WHERE "uid"='${uid}'`)
    .then((result) => {
      user = result.rows[0]; // get the first row
    });
  return user;
}
