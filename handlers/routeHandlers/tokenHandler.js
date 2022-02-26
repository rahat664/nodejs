/*
 * Title: User Handler
 * Description: Handler to handle token related routes
 * Author: Rahat Kabir
 * Date: 26/02/2022
 *
 */
// dependencies
const data = require("../../lib/data");
const {hash} = require("../../helpers/utilities");
const { parseJSON } = require("../../helpers/utilities");
const { createRandomString } = require("../../helpers/utilities");

// module scaffolding
const handler = {};

handler.tokenHandler = (requestProperties, callback) => {
    const acceptedMethods = ["get", "post", "put", "delete"];
    if (acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler._token[requestProperties.method](requestProperties, callback);
    } else {
        callback(405);
    }
};

handler._token = {};

handler._token.post = (requestProperties, callback) => {
  const phone =
    typeof requestProperties.body.phone === "string" &&
    requestProperties.body.phone.trim().length === 11
      ? requestProperties.body.phone
      : false;

  const password =
    typeof requestProperties.body.password === "string" &&
    requestProperties.body.password.trim().length > 0
      ? requestProperties.body.password
      : false;

  if (phone && password) {
    data.read("users", phone, (err, userData) => {
      let hashedPassword = hash(password);
      if (hashedPassword === parseJSON(userData).password) {
        let tokenId = createRandomString(20);
        let expires = Date.now() + 1000 * 60 * 60;
        let tokenObject = {
          phone,
          id: tokenId,
          expires,
        };

        data.create("tokens", tokenId, tokenObject, (err) => {
          if (!err) {
            callback(200, tokenObject);
          } else {
            callback(500, { Error: "Could not create the new token" });
          }
        });
      } else {
        callback(400, { Error: "Password is incorrect" });
      }
    });
  } else {
    callback(400, {
      error: "Invalid phone number. Please try again!",
    });
  }
};

handler._token.get = (requestProperties, callback) => {
  // check the phone number if valid
  const id =
    typeof requestProperties.queryStringObject.id === "string" &&
    requestProperties.queryStringObject.id.trim().length === 20
      ? requestProperties.queryStringObject.id
      : false;
  if (id) {
    // lookup the user
    data.read("tokens", id, (err, tokenData) => {
      const token = { ...parseJSON(tokenData) };
      if (!err && token) {
        callback(200, token);
      } else {
        callback(404, {
          error: "Requested token was not found!",
        });
      }
    });
  } else {
    callback(404, {
      error: "Requested user was not found!",
    });
  }
};

handler._token.put = (requestProperties, callback) => {
  const id =
    typeof requestProperties.body.id === "string" &&
    requestProperties.body.id.trim().length === 20
      ? requestProperties.body.id
      : false;
  const extend =
    typeof requestProperties.body.extend === "boolean" &&
    requestProperties.body.extend === true;
  if (id && extend) {
    data.read("tokens", id, (err, tokenData) => {
      if (parseJSON(tokenData).expires > Date.now()) {
        const token = { ...parseJSON(tokenData) };
        token.expires = Date.now() + 1000 * 60 * 60;
        data.update("tokens", id, token, (err) => {
          if (!err) {
            callback(200, token);
          } else {
            callback(500, {
              error: "Could not update the token",
            });
          }
        });
      } else {
        callback(400, {
          error: "Token has already expired",
        });
      }
    });
  } else {
    console.log(id, extend);
    callback(400, {
      error: "Missing required fields",
    });
  }
};

// @TODO: Authentication
handler._token.delete = (requestProperties, callback) => {

};

module.exports = handler;
