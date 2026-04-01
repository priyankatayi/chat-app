const { createClient } = require("redis");

const redisClient = process.env.REDIS_URL
  ? createClient({
      url: process.env.REDIS_URL,
    })
  : createClient({
      socket: {
        host: "127.0.0.1",
        port: 6379,
      },
    });

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

async function connectRedis() {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
      console.log("Redis connected");
    }
  } catch (err) {
    console.error("Redis connection failed:", err);
  }
}

connectRedis();

module.exports = redisClient;
