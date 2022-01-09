import * as dbPool from "../../config/db";

export default async function getOrganization(organizationSlugs: string[]) {
  var organizations: any = {};
  await dbPool
    .query(
      `SELECT * FROM organizations WHERE "organizationSlug" IN (${organizationSlugs
        .map((organizationSlug) => `'${organizationSlug}'`)
        .join(",")})`
    )
    .then((result) => {
      organizations = result.rows;
    });
  return organizations;
}
