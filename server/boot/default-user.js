'use strict';

module.exports = function(app, cb) {
  var Customuser = app.models.CustomUser;
  Customuser.create(
    [{username: 'admin', email: 'admin@nimda.com', password: 'nimda'}], 
    function(err, users) {
      if (err) console.log(err);
    }
  );
  process.nextTick(cb); 
};