//import * as bcrypt from 'bcrypt';
import { Request, Response } from "express";
import PG_ERROR from "../../helpers/postgresCodes";
import * as dbPool from "../../config/db";
import getOrganizations from "./organization.utils";
import organization from "./organization.route";

export default class OrganizationController {
  public registerOrganization = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    var organization: any = {};
    const {
      fullName,
      admins,
      isAdminVerified,
      organizationSlug,
      address,
      organizationSize,
      industry,
    } = req.body;
    try {
      const db = await dbPool.connect();
      try {
        await db.query("BEGIN");
        organization = await db.query(
          `INSERT INTO organizations( "fullName", "admins", "isAdminVerified", "organizationSlug", "address","organizationSize","industry","createdAt") VALUES('${fullName}', '[${admins
            .map((adminId: string) => `"${adminId}"`)
            .join(
              ","
            )}]', '${isAdminVerified}', '${organizationSlug}', '${address}','${organizationSize}','${industry}', NOW()) RETURNING *`
        );

        // Do Further Queries here if needed below this comment
        await db.query("COMMIT");
        organization = await getOrganizations([organizationSlug]);
      } catch (e) {
        if (e.code === PG_ERROR.PG_UNIQUE_VIOLATION) {
          organization = await getOrganizations([organizationSlug]);

          return res.status(400).send({
            success: false,
            message: "Organization already exists",
            data: organization,
          });
        }

        await db.query("ROLLBACK");
        throw e;
      } finally {
        db.release();
      }
      res.status(200).send({
        success: true,
        message: "Organization Successfully created",
        data: organization,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        success: false,
        message: err,
        givenParameters: req.body,
      });
    }
  };

  public getOrganizations = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    try {
      var organization: any = {};
      organization = await getOrganizations([req.params.organizationSlug]);

      if (organization.length !== 0) {
        return res.status(200).send({
          success: true,
          data: organization,
        });
      } else {
        return res.status(404).send({
          success: false,
          message: "Organization not found",
        });
      }
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null,
      });
    }
  };

  public update = async (req: Request, res: Response): Promise<any> => {
    const { fullName, admins, isAdminVerified, organizationSlug, createdAt } =
      req.body;
    try {
      const organizationUpdated = true;
      if (!organizationUpdated) {
        return res.status(404).send({
          success: false,
          message: "Organization not found",
          data: null,
        });
      }
      res.status(200).send({
        success: true,
        data: organizationUpdated,
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null,
      });
    }
  };

  public removeOrganization = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    try {
      var organization = {};
      organization = await getOrganizations([req.params.organizationSlug]);

      if (!organization) {
        return res.status(404).send({
          success: false,
          message: "Organization not found",
        });
      }

      await dbPool
        .query(
          `DELETE FROM "organizations" WHERE "organizationSlug"='${req.params.organizationSlug}'`
        ) // TODO: Also delete from the projects table
        .catch((err: Error) => {
          throw err;
        });

      res.status(200).send({
        success: true,
        message: "Organization Successfully deleted",
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
      });
    }
  };
}
