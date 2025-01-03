import { pool } from "./database.js";
import users from "../data/Users.js";
import applications from "../data/Applications.js";

const createUsersTable = async () => {
  //create users table
  const createTableQuery = `
    DROP TABLE IF EXISTS users CASCADE;
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username varchar(128) NOT NULL,
      email varchar(128) NOT NULL,
      password varchar(128) NOT NULL,
      token varchar(128) NULL,
      created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP)
    `;

  try {
    //catch errors while creation
    const res = await pool.query(createTableQuery);
    console.log("🎉 users table created successfully");
  } catch (error) {
    console.error("⚠️ error creating users table", error);
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

    pool.query(insertUserQuery, values, (err, res) => {
      if (err) {
        console.error("⚠️ error inserting user into users table", err);
        return;
      }
      console.log(`✅ ${user.username} added successfully`);
    });
  });
};

const createApplicationsTable = async () => {
  //create users table
  const createTableQuery = `
      DROP TABLE IF EXISTS applications CASCADE;
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
        contact_email varchar(128) NULL,
        contact_phone varchar(128) NULL,
        notes TEXT NULL,
        created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE )
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
            INSERT INTO applications ( user_id, company_name, company_website, favorite, apply_date, apply_method, apply_url, position, fit_rating, location, interview_date, offer_amount, rejected, contact_name, contact_email, contact_phone, notes) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)

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

    pool.query(insertApplicationsQuery, values, (err, res) => {
      if (err) {
        console.error(
          "⚠️ error inserting application into applications table",
          err
        );
        return;
      }
      console.log(
        `✅ Application with ID: ${application.id} added successfully`
      );
    });
  });
};

const seedDatabase = async () => {
  await seedTableUsers(); //seed users table first
  await seedApplicationsTable(); //seed applications table
};

seedDatabase().catch((err) => {
  console.error("⚠️ Error seeding database", err);
});
