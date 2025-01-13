import { pool } from "../config/database.js";

const getApplicationsByUser = async (req, res) => {
  //func to get application by user id passed as parameter
  const userId = req.params.userId;
  try {
    const results = await pool.query(
      "SELECT * FROM applications WHERE user_id = $1",
      [userId]
    );

    return res.status(200).json(results.rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createApplication = async (req, res) => {
  //func to create an application
  try {
    const {
      //extract body data
      user_id,
      company_name,
      company_website,
      favorite,
      apply_date,
      apply_method,
      apply_url,
      position,
      location,
      interview_date,
      offer_amount,
      rejected,
      contact_name,
      contact_email,
      contact_phone,
      notes,
    } = req.body;

    if (
      //check for requied fields values
      !user_id ||
      !company_name ||
      !company_website ||
      !apply_date ||
      !apply_method ||
      !apply_url ||
      !position ||
      !location
    ) {
      return res.status(400).json({ error: "Required fields are missing." });
    }

    const apply_date_formated = apply_date
      ? new Date(apply_date).toISOString()
      : null;
    const interview_date_formated = interview_date
      ? new Date(interview_date).toISOString()
      : null;

    const results = await pool.query(
      //insert to database values passed to API
      "INSERT INTO applications (user_id, company_name, company_website, favorite, apply_date,apply_method, apply_url, position, location, interview_date,offer_amount, rejected, contact_name, contact_email, contact_phone, notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11, $12, $13, $14, $15, $16) RETURNING *",
      [
        user_id,
        company_name,
        company_website || null,
        favorite,
        apply_date_formated,
        apply_method || null,
        apply_url || null,
        position,
        location || null,
        interview_date_formated,
        offer_amount || null,
        rejected,
        contact_name || null,
        contact_email || null,
        contact_phone || null,
        notes || null,
      ]
    );

    return res.status(200).json({ success: results.rows });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getApplicationById = async (req, res) => {
  //func to get application by id passed as parameter
  const appId = req.params.appId;
  try {
    const results = await pool.query(
      "SELECT * FROM applications WHERE id = $1",
      [appId]
    );

    return res.status(200).json(results.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateApplicationById = async (req, res) => {
  //func to create an application
  try {
    const {
      //extract body data
      user_id,
      company_name,
      company_website,
      favorite,
      apply_date,
      apply_method,
      apply_url,
      position,
      location,
      interview_date,
      offer_amount,
      rejected,
      contact_name,
      contact_email,
      contact_phone,
      notes,
      id,
    } = req.body;

    if (
      //check for requied fields values
      !user_id ||
      !company_name ||
      !company_website ||
      !apply_date ||
      !apply_method ||
      !apply_url ||
      !position ||
      !location
    ) {
      return res.status(400).json({ error: "Required fields are missing." });
    }

    const apply_date_formated = apply_date
      ? new Date(apply_date).toISOString()
      : null;
    const interview_date_formated = interview_date
      ? new Date(interview_date).toISOString()
      : null;

    const results = await pool.query(
      //insert to database values passed to API
      "UPDATE applications SET user_id = $1, company_name = $2, company_website = $3, favorite = $4, apply_date = $5,apply_method = $6, apply_url = $7, position = $8, location = $9, interview_date = $10,offer_amount = $11, rejected = $12, contact_name = $13, contact_email = $14, contact_phone = $15, notes = $16 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11, $12, $13, $14, $15, $16) WHERE id = $17 RETURNING *",
      [
        user_id,
        company_name,
        company_website || null,
        favorite,
        apply_date_formated,
        apply_method || null,
        apply_url || null,
        position,
        location || null,
        interview_date_formated,
        offer_amount || null,
        rejected,
        contact_name || null,
        contact_email || null,
        contact_phone || null,
        notes || null,
        id,
      ]
    );

    return res.status(200).json({ success: results.rows[0] });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default {
  getApplicationsByUser,
  createApplication,
  getApplicationById,
  updateApplicationById,
};
