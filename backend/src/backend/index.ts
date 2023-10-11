const mong = require("mongoose");

module.exports = {
  connectDB: async () => {
    try {
      const conn = await mong.connect(process.env.DB_CONNECT_URL);
      console.log(`mongoose ${conn.connection.host}`);
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  },
};
