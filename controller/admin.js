const User = require("../models/user");

exports.getUsers = (req, res) => {
  var searchStr = req.body.search.value;
  if (req.body.search.value) {
    var regex = new RegExp(req.body.search.value, "i");
    searchStr = { $or: [{ _id: regex }] };
  } else {
    searchStr = {};
  }

  var recordsTotal = 0;
  var recordsFiltered = 0;

  User.count({}, function(err, c) {
    recordsTotal = c;
    console.log(c);
    User.count(searchStr, function(err, c) {
      recordsFiltered = c;
      console.log(c);
      console.log(req.body.start);
      console.log(req.body.length);
      User.find(
        searchStr,
        "_id",
        { skip: Number(req.body.start), limit: Number(req.body.length) },
        function(err, results) {
          if (err) {
            console.log("error while getting results" + err);
            return;
          }

          var data = JSON.stringify({
            draw: req.body.draw,
            recordsFiltered: recordsFiltered,
            recordsTotal: recordsTotal,
            data: results
          });
          res.send(data);
        }
      );
    });
  });
};
