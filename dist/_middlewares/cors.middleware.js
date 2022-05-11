"use strict";
var access = true;
const cors = {
    allows: function (req, res, next) {
        if (access) {
            console.log("Called Cors Miidele Ware Given Access");
            next();
        }
        else {
            console.log("No Access To Server");
            res.status(401).send("Access Denied");
        }
    }
};
module.exports = cors;
