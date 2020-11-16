const jwt = require("jsonwebtoken");

const authToken = (req, res, next) => {
  // req.params, req.body , req.query , req.header
  // req.header - ניתן לשלוח בכל סוג מיטוד גם גיט ,פוסט,פוט,דיליט
  // והוא מאובטח
  let token = req.header("x-auth-token");
  if (!token) { return res.status(401).json({ message: "Access denied" }) }
  try {
    
    let checkToken = jwt.verify(token, "mytoken");
    //אם הכל תקין
    // כדי להעביר מידע לפונקציה הבאה אנחנו נשתמש
    // בפרמטמ ריק ונוסיף לו מאפיינים שמועברים 
    // לפונקציה הבאה שהנקסט קורא לה
     req._id = checkToken._id;
    next();
  }
  catch (err) {
    // אם מוצא שהטוקן לא תקני מחזיר טעות ועוצר את הפונקציה
    return res.status(401).json(err)
  }
}

module.exports = authToken;