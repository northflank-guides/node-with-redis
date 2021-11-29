require("dotenv").config();

// if using node-redis package
const { createClient } = require("redis");

const redis = createClient({
  url: process.env.REDIS_URL,
  socket: {
    tls: true,
    servername: process.env.REDIS_HOST,
  },
});

// if using ioredis package
// const Redis = require("ioredis");

// const redis = new Redis(process.env.REDIS_URL, {
//   tls: {
//     servername: process.env.REDIS_HOST,
//   },
// });

(async () => {
  await redis.connect(); // if using node-redis client.

  const pingCommandResult = await redis.ping();
  console.log("Ping command result: ", pingCommandResult);

  const getCountResult = await redis.get("count");
  console.log("Get count result: ", getCountResult);

  const incrCountResult = await redis.incr("count");
  console.log("Increase count result: ", incrCountResult);

  const newGetCountResult = await redis.get("count");
  console.log("New get count result: ", newGetCountResult);

  await redis.set(
    "object",
    JSON.stringify({
      name: "Redis",
      lastname: "Client",
    })
  );

  const getStringResult = await redis.get("object");
  console.log("Get string result: ", JSON.parse(getStringResult));
})();
