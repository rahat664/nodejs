/*
 * Title: user Handler
 * Description: User Handler
 * Author: Rahat Kabir
 * Date: 20/02/2022
 *
 */
// dependencies
const _data = require('../../lib/data');
const {hash} = require("../../helpers/utilities");

// module scaffolding
const handler = {};

handler.userHandler = (requestProperties, callback) => {
  console.log(requestProperties);
  const acceptedMethods = ["post", "get", "put", "delete"];
  if (acceptedMethods.indexOf(requestProperties.method) > -1) {
    handler._user[requestProperties.method](requestProperties, callback);
  } else {
    callback(405);
  }
};

handler._user = {};

handler._user.post = (requestProperties, callback) => {
  const firstName =
    typeof requestProperties.body.firstName === "string" &&
    requestProperties.body.firstName.trim().length > 0
      ? requestProperties.body.firstName
      : false;

  const lastName =
    typeof requestProperties.body.lastName === "string" &&
    requestProperties.body.firstName.trim().length > 0
      ? requestProperties.body.lastName
      : false;

  const phone =
    typeof requestProperties.body.phone === "string" &&
    requestProperties.body.phone.trim().length === 11
      ? requestProperties.body.firstName
      : false;

  const password =
    typeof requestProperties.body.password === "string" &&
    requestProperties.body.password.trim().length > 0
      ? requestProperties.body.password
      : false;

  const tosAgreement =
    typeof requestProperties.body.tosAgreement === "boolean" &&
    requestProperties.body.tosAgreement
      ? requestProperties.body.tosAgreement
      : false;

  if (firstName && lastName && phone && password && tosAgreement) {
    // make sure the user does not already exist
    _data.read("users", phone, (err) => {
      if (err) {
        // hash the password
        const hashedPassword = hash(password);

        // create the user object
        const userObject = {
          firstName,
          lastName,
          phone,
          password: hashedPassword,
          tosAgreement,
        };

        // store the user

        _data.create("users", phone, userObject, (err) => {
          if (!err) {
            callback(200, {
              Success: "User created successfully",
            });
          } else {
            callback(500, { Error: "Could not create the new user" });
          }
        });
      }
    });
  } else {
    callback(400, { Error: "Missing required fields" });
  }
};

handler._user.get = (requestProperties, callback) => {
  callback(200);
};

handler._user.put = (requestProperties, callback) => {};

handler._user.delete = (requestProperties, callback) => {};

module.exports = handler;
