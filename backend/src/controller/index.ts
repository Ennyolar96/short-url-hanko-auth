const { validURL, genRand } = require("../helper/url");
const asyncHandle = require("express-async-handler");
const DBURL = require("../model");
const { aliasData, createShort } = require("../helper/validate");

// @ "/" post create new short url
// @ /:short get long url from the database
// @ '/' get all the urls database

module.exports = {
  createShortURL: async (req: any, res: any) => {
    if (!req.auth)
      return res.status(401).json({
        success: false,
        message: "Unauthorize",
      });
    const { sub } = req.auth;
    const { url, alias } = req.body;
    const { error } = await createShort(url, alias);
    if (error) {
      const { details } = error;

      res.status(400).json({
        success: false,
        message: details[0].message,
      });
      return;
    }

    const long = validURL(url);
    if (!long) {
      res.status(422).json({
        success: false,
        message: "Invalid url entered",
      });
      return;
    }
    // use alias to check the if same alias is not available in the database
    const check = await DBURL.findOne({ alias });
    if (check !== null) {
      res.status(403).json({
        message: "Alias already taken",
      });
      return;
    }

    const theAlias = alias !== "itsme" ? alias : genRand(10);
    // save the data to the database and return the short url to the user

    const output = {
      userID: sub,
      longURL: url,
      shortURL: `https://bly.vercel.app/${theAlias}`,
      alias: theAlias,
    };

    const save = await DBURL.create(output);
    if (save) {
      res.status(201).json({
        success: true,
        message: "URL save successfully",
        data: save,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Unable to save URL",
      });
    }
  },

  shortURL: async (req: any, res: any) => {
    try {
      // get the short name from the url
      const { alias } = req.params;
      // validate the short name
      if (alias === undefined) {
        res.status(400).json({
          message: "Not found!",
        });
        return;
      }

      // find the short url in the database
      const check = await DBURL.findOne({ alias });
      if (check === null) {
        res.status(400).json({
          success: false,
          message: "Router not found!",
        });
        return;
      }
      // increase count
      const { longURL, count } = check;
      const addCount = parseInt(count) + 1;
      console.log(addCount);
      const updateCount = await DBURL.updateOne({ alias }, { count: addCount });
      if (updateCount) return res.redirect(longURL);
      res.redirect(longURL);
    } catch (error) {
      console.log(error);
    }

    // increase the count of the url
    // redirect user to the long url
  },

  allShortURL: async (req: any, res: any) => {
    // find user from the database,
    // return all user data

    try {
      if (!req.auth)
        return res.status(401).json({
          success: false,
          message: "Unauthorize",
        });

      const { sub } = req.auth;

      const userData = await DBURL.find({ userID: sub }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        message: "all data",
        data: userData,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
