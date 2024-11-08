export function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ isAuth: false, message: "Not Authorized!" });
  }
}

export function isAdmin(req, res, next) {}

//FORMAT OF TOKEN
//Authorization: Bearer <access_token>

export function verifyToken(req, res, next) {
  //get auth header value
  const bearerHeader = req.headers["authorization"];

  //check if bearer is undef
  if (typeof bearerHeader !== "undefined") {
    //Split at the space
    const bearer = bearerHeader.split(" ");
    //Get token from array
    const bearerToken = bearer[1];
    //Set token
    req.token = bearerToken;
    //next middleware
    next();
  } else {
    //Forbidden
    res.sendStatus(403);
  }
}
