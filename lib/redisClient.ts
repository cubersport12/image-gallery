import Redis from 'ioredis';

const redisClient = new Redis();

export const getFromRedis = async (key: string) => {
  const fromRedis = await redisClient.get(key);
  if (fromRedis != null) {
    try {
      return JSON.parse(fromRedis);
    } catch (e) {
      console.error(e);
    }
  }
  return null;
};

export const setToRedis = async <T>(key: string, value: T) => {
  if (value == null) {
    redisClient.del(key);
  } else {
    redisClient.set(key, JSON.stringify(value));
  }
};

export default redisClient;
