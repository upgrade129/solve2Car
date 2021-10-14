const { sign, verify } = require('jsonwebtoken');
const config = require('../config');
const { ResponseHandler } = require('./ResponseHandler');
const { Messages } = require('../helper/messages');
const { User } = require('../models');

const message = new Messages();

class TokenJWT {
  tokenCreation = async (req, res) => {
    try {
      const userData = req.body;
      const userTok = {
        id: userData.id,
        account_id: userData.account_id,
        is_vendor: userData.is_vendor,
      };
      const jsontoken = sign(userTok, config.secretKey);
      userData.userToken = jsontoken;
      const d = await userData.save();
      if (d) {
        return {
          statusCode: 200,
          auth: true,
          token: jsontoken,
          user_id: userData.id,
          is_vendor: userData.is_vendor,
        };
      }
      // TODO: Need to refactor this
      return undefined;
    } catch (error) {
      return res.status(500).send(ResponseHandler.sendMessage(500, error.message));
    }
  };

  tokenValidation = async (req, res, next) => {
    try {
      const bearerHeader = req.headers.authorization;
      if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;

        let decoded;
        try {
          decoded = verify(bearerToken, config.secretKey);
        } catch (err) {
          return res
            .status(401)
            .send(ResponseHandler.sendMessage(401, message.invalidToken));
        }

        if (!decoded) {
          return res
            .status(401)
            .send(ResponseHandler.sendMessage(401, message.invalidToken));
        }
        const user_id = decoded.id;
        req.body.user_id = user_id;
        req.body.account_id = decoded.account_id;
        req.body.is_vendor = decoded.is_vendor;
        const userData = await User.findOne({ where: { id: user_id } });
        if (!userData) {
          return res
            .status(401)
            .send(ResponseHandler.sendMessage(401, message.invalidToken));
        }
        if (userData.userToken !== bearerToken) {
          return res
            .status(401)
            .send(ResponseHandler.sendMessage(401, message.invalidToken));
        }
      } else {
        return res
          .status(401)
          .send(ResponseHandler.sendMessage(401, message.invalidToken));
      }
      return next();
    } catch (err) {
      return res.status(500).send(ResponseHandler.sendMessage(500, err.message));
    }
  };
}
module.exports = { TokenJWT };
