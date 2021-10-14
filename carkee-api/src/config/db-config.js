module.exports = {
  development: {
    username: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DB,
    host: process.env.DBHOST,
    dialect: process.env.DIALECT,
    logging: false,
  },
  test: {
    username: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DB,
    host: process.env.DBHOST,
    dialect: process.env.DIALECT,
  },
  production: {
    username: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DB,
    host: process.env.DBHOST,
    dialect: process.env.DIALECT,
  },
};
