const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  password: "pM4*fJoS",
  host: "localhost",
  port: 5432,
  database: "postgres_cloud",
});

module.exports = pool;
