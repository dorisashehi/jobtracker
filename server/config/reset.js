import { pool } from "./database.js";
import users from "../data/Users.js";
import { user } from "pg/lib/defaults";

const createUsersTable = async () => {
  //create users table
  const createTableQuery = `
    DROP TABLE IF EXISTS users;
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username varchar(128) NOT NULL,
      email varchar(128) NOT NULL,
      password varchar(128) NOT NULL,
      token varchar(128) NULL,
      created_on TIMESTAMP
    `;

  try {
    //catch errors while creation
    const res = await pool.query(createTableQuery);
    console.log("🎉 users table created successfully");
  } catch (error) {
    console.error("⚠️ error creating wheels table", error);
  }
};

const seedTableUsers = async () => {
  //seed database table
  await createUsersTable();
  users.forEach((user) => {
    const insertUserQuery = `
        INSERT INTO users (username, email, password) values ($1, $2, $3)
    `;

    const values = [user.username, user.email, user.password];

    try {
      pool.query(insertUserQuery, values);
      console.log(`✅ ${user.username} added successfully`);
    } catch (error) {
      console.error("⚠️ error inserting user into users table", err);
    }
  });
};

const createApplicationsTable = async () => {
  //create users table
  const createTableQuery = `
      DROP TABLE IF EXISTS applications;
      CREATE TABLE applications (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        company_name varchar(128) NOT NULL,
        company_website varchar(128) NULL,
        favorite boolean NULL,
        apply_date TIMESTAMP NOT NULL,
        apply_method varchar(128) NOT NULL,
        apply_url varchar(128) NOT NULL,
        position varchar(128) NOT NULL,
        fit_rating INT NULL,
        location varchar(128) NOT NULL,
        interview_date TIMESTAMP NULL,
        offer_amount FLOAT NULL,
        rejected varchar(128) NULL,
        contact_name varchar(128) NULL,
        conatact_email varchar(128) NULL,
        contact_phone varchra(128) NULL,
        notes TEXT NULL,
        created_on TIMESTAMP,
        updated_on TIMESTAMP
      `;

  try {
    //catch errors while creation
    const res = await pool.query(createTableQuery);
    console.log("🎉 applications table created successfully");
  } catch (error) {
    console.error("⚠️ error creating applications table", error);
  }
};

const seedApplicationsTable = async () => {
  await createApplicationsTable();
  applications.forEach((application) => {
    const insertApplicationsQuery = `
            INSERT INTO applications ( user_id, company_name, company_website, favorite, apply_date, apply_method, apply_url, position, fit_rating, location, interview_date, offer_amount, rejected, contact_name, contact_email, contact_phone, notes) values ($1, $2, $3, $4, $5, $6, $7, $7, $8, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19))
        `;

    const values = [
      application.user_id,
      application.company_name,
      application.company_website,
      application.favorite,
      application.apply_date,
      application.apply_method,
      application.apply_url,
      application.position,
      application.fit_rating,
      application.location,
      application.interview_date,
      application.offer_amount,
      application.rejected,
      application.contact_name,
      application.contact_email,
      application.contact_phone,
      application.notes,
    ];

    try {
      pool.query(insertApplicationsQuery, values);
      console.log(`✅ ${user.company_name} added successfully`);
    } catch (error) {
      console.error(
        "⚠️ error inserting application into applications table",
        err
      );
    }
  });
};

const seedDatabase = async () => {
  await seedTableUsers();
  await seedApplicationsTable();
};

seedDatabase().catch((err) => {
  console.error("⚠️ Error seeding database", err);
});
