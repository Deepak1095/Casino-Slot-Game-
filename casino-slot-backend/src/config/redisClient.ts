import Redis from 'ioredis';

// console.log(process.env.REDIS_URL!,process.env.REDIS_TOKEN)
const redis = new Redis(process.env.REDIS_URL!, {
  password: process.env.REDIS_TOKEN,
});

export default redis;
