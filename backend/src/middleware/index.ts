const jwt = require("jsonwebtoken");
const async_handler = require("express-async-handler");
const User = require("../model/user");
const { expressjwt: JWT } = require("express-jwt");
const jwkRsa = require("jwks-rsa");

const Host = process.env.HANKO_API_URL;
const whitelist = ["https://long2short.vercel.app", "http://localhost:5173"];
module.exports = {
  // error track
  errorHandler: (err: any, req: any, res: any, next: any) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
  },

  // protect route with jwt token
  protect: async_handler(async (req: any, res: any, next: any) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        // et token from headers
        token = req.headers.authorization.split(" ")[1];

        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // et user from the token
        req.user = await User.findById(decoded.id);
        next();
      } catch (error) {
        console.log(error);
        res.status(401);
        throw new Error("Not authorized");
      }
    }
    if (!token) {
      res.status(401);
      throw new Error("Token not found");
    }
  }),

  // cors co allow only specific url
  corsOptionsDelegate: (req: any, callback: any) => {
    let corsOptions;

    let isDomainAllowed = whitelist.indexOf(req.header("Origin")) !== -1;

    if (isDomainAllowed) {
      // Enable CORS for this request
      corsOptions = { origin: true };
    } else {
      // Disable CORS for this request
      corsOptions = { origin: false };
    }
    callback(null, corsOptions);
  },

  // secure page with hanko services
  Secure: JWT({
    secret: jwkRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 2,
      jwksUri: `${Host}/.well-known/jwks.json`,
    }),
    algorithms: ["RS256"],
    getToken: function fromCookieOrHeader(req: any) {
      if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
      ) {
        return req.headers.authorization.split(" ")[1];
      } else if (req.cookies && req.cookies.hanko) {
        return req.cookies.hanko;
      }
      return null;
    },
  }),
};
