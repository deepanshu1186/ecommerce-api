// redisClient.js
const redis = require('redis');
const dotenv = require('dotenv');
dotenv.config();

var redisClient;

const initializeRedisClient = () => {
    if (!redisClient) {
        redisClient = redis.createClient();
        redisClient.on('error', (err) => console.log('Redis Client Error:', err));
        redisClient.on('connect', () => console.log('Connected to Redis'));
        redisClient.on('end', () => console.log('Redis client disconnected'));
        redisClient.on('reconnecting', () => console.log('Redis client reconnecting'));
    }
    return redisClient;
};

module.exports = initializeRedisClient;
