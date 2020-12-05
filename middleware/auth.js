const jwt = require("jsonwebtoken");

const authToken = (req, res, next) => {
  console.log(req.header("Authorization"))
  let token = req.header("Authorization");

  if (!token) {
    return res.status(401).send({
      message: "Please login"
      
    })
  }
  try {

    let checkToken = jwt.verify(token, "mytoken");
    req._id = checkToken._id;
    next();
  } catch (err) {
    return res.status(401).json(err)
  }
}

module.exports = authToken;