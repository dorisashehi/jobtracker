export const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res
    .status(401)
    .json({ error: "You must be authenticated to access this resource" });
};
