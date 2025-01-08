import { pool } from "../config/database.js";

const getApplicationsByUser = async (req, res) => {
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

export default {
  getApplicationsByUser,
};
