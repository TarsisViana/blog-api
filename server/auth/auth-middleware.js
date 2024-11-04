export function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ isAuth: false, message: "Not Authorized!" });
  }
}

export function isAdmin(req, res, next) {}
