const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  password: "pM4*fJoS",
  host: "localhost",
  port: 5431,
  database: "postgres_cloud",
});

module.exports = pool;
