import { BaseDatabase } from "../BaseDatabase";
import { TablesNames } from "../../models/TableNames";

export class Migrations extends BaseDatabase {
  public migrationExec = async ():Promise<void> => {
    await Migrations.connection.raw(`
      DROP TABLE IF EXISTS ${TablesNames.Table_Show};
      DROP TABLE IF EXISTS ${TablesNames.Table_Band};
      DROP TABLE IF EXISTS ${TablesNames.Table_User};

      CREATE TABLE IF NOT EXISTS ${TablesNames.Table_User} (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(255) NOT NULL DEFAULT "NORMAL"
      );
      
      CREATE TABLE IF NOT EXISTS ${TablesNames.Table_Band} (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        music_gender VARCHAR(255) NOT NULL,
        responsible VARCHAR(255) UNIQUE NOT NULL 
      );

      CREATE TABLE IF NOT EXISTS ${TablesNames.Table_Show} (
        id VARCHAR(255) PRIMARY KEY,
        week_day VARCHAR(255) NOT NULL,
        start_time INT NOT NULL,
        end_time INT NOT NULL,
        band_id VARCHAR(255) NOT NULL,
        FOREIGN KEY(band_id) REFERENCES ${TablesNames.Table_Band}(id)
      );

    `)
    .then(() => {
      console.log(` !--!  Tables created sucefull :) !--! `)
    })
    .catch((error: any) => console.log(error.sqlMessage || error.message))
    .finally( async () => await Migrations.connection.destroy())
  }
};
const migration = new Migrations();
migration.migrationExec()