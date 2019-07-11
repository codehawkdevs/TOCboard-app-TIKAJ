const router = require("express").Router();
const User = require("../models/user");

router.get("/", (req, res) => {
  if (req.user.is_admin) {
    User.find({}).exec((err, users) => {
      if (err) {
        console.log(err);
      } else {
        return res.render("admin", { users: users, user: req.user });
      }
    });
  } else {
    res.send("you are not authorised to access this");
  }
});

router.post("/", (req, res) => {
  const email = req.body.email;

  User.findOne({ _id: email }).then(currentUser => {
    if (currentUser) {
      if (currentUser.is_admin) {
        return res.send(`${currentUser.first_name} is already an admin`);
      }
      currentUser.is_admin = true;
      currentUser.save();
      return res.send(`${currentUser.first_name} is now an admin`);
    } else {
      return res.send("No user found!");
    }
  });
});

module.exports = router;
